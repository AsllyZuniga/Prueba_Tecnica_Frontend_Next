'use client'

import React, { useId } from 'react'
import { ChevronDown } from 'lucide-react'

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: Array<{ label: string; value: string }>;
  placeholder?: string;
}

export const Select: React.FC<SelectProps> = ({
  label,
  error,
  options,
  placeholder = 'Select an option',
  className = '',
  id,
  ...props
}) => {
  const generatedId = useId()
  const selectId = id ?? generatedId

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={selectId}
          className="mb-2 block text-label-14 text-brand-textStrong"
        >
          {label}
          {props.required && <span className="ml-1 text-brand-primary">*</span>}
        </label>
      )}
      <div className="relative">
        <select
          id={selectId}
          className={`
            w-full rounded-lg border border-brand-border bg-brand-white px-3 py-2
            text-[16px] leading-6 font-normal text-brand-text appearance-none cursor-pointer
            focus:outline-none focus:border-brand-active focus:ring-1 focus:ring-brand-active
            disabled:cursor-not-allowed disabled:bg-brand-surface disabled:text-brand-text
            ${error ? 'border-brand-danger focus:border-brand-danger focus:ring-brand-danger' : ''}
            ${className}
          `}
          {...props}
        >
          <option value="">{placeholder}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown
          size={16}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-brand-text"
        />
      </div>
      {error && <p className="mt-1 text-text-12 text-brand-danger">{error}</p>}
    </div>
  )
}
