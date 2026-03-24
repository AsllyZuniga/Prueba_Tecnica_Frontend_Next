import { useState, useCallback } from 'react'

export interface FormState<T> {
  data: T;
  errors: Record<string, string>;
  isDirty: boolean;
}

export function useForm<T extends Record<string, unknown>>(initialData: T) {
  const [formState, setFormState] = useState<FormState<T>>({
    data: initialData,
    errors: {},
    isDirty: false,
  })

  const setFieldValue = useCallback(
    <FieldKey extends keyof T>(field: FieldKey, value: T[FieldKey]) => {
      setFormState((prev) => ({
        ...prev,
        data: { ...prev.data, [field]: value },
        isDirty: true,
      }))
    },
    []
  )

  const setFieldError = useCallback((field: string, error: string) => {
    setFormState((prev) => ({
      ...prev,
      errors: { ...prev.errors, [field]: error },
    }))
  }, [])

  const clearFieldError = useCallback((field: string) => {
    setFormState((prev) => {
      const newErrors = { ...prev.errors }
      delete newErrors[field]
      return { ...prev, errors: newErrors }
    })
  }, [])

  const resetForm = useCallback(() => {
    setFormState({
      data: initialData,
      errors: {},
      isDirty: false,
    })
  }, [initialData])

  const validateField = useCallback(
    <FieldKey extends keyof T>(field: FieldKey, validator: (value: T[FieldKey]) => string | undefined) => {
      const error = validator(formState.data[field])
      if (error) {
        setFieldError(field as string, error)
      } else {
        clearFieldError(field as string)
      }
      return !error
    },
    [formState.data, setFieldError, clearFieldError]
  )

  return {
    ...formState,
    setFieldValue,
    setFieldError,
    clearFieldError,
    resetForm,
    validateField,
  }
}
