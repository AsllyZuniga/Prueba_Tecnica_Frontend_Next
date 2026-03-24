'use client'

import React, { useId } from 'react'

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  error,
  className = '',
  id,
  ...props
}) => {
  const generatedId = useId()
  const checkboxId = id ?? generatedId

  return (
    <div className="flex items-start gap-2">
      <input
        id={checkboxId}
        type="checkbox"
        className={`
          mt-1 w-4 h-4 rounded border border-dark-600 bg-dark-800
          cursor-pointer accent-pink-500
          focus:outline-none focus:ring-2 focus:ring-pink-500
          ${className}
        `}
        {...props}
      />
      {label && (
        <label htmlFor={checkboxId} className="text-sm text-gray-200 cursor-pointer flex-1">
          {label}
        </label>
      )}
      {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
    </div>
  )
}
