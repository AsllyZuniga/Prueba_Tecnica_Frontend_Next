'use client'

import React, { useId } from 'react'

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  error,
  helperText,
  className = '',
  id,
  ...props
}) => {
  const generatedId = useId()
  const textareaId = id ?? generatedId

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={textareaId} className="block text-sm font-medium text-gray-200 mb-2">
          {label}
          {props.required && <span className="text-primary-500 ml-1">*</span>}
        </label>
      )}
      <textarea
        id={textareaId}
        className={`
          w-full px-3 py-2 bg-dark-800 border border-dark-600 rounded
          text-gray-100 placeholder-gray-500 resize-vertical
          focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500
          disabled:bg-dark-700 disabled:text-gray-500 disabled:cursor-not-allowed
          ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}
          ${className}
        `}
        {...props}
      />
      {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
      {helperText && !error && <p className="text-xs text-gray-500 mt-1">{helperText}</p>}
    </div>
  )
}
