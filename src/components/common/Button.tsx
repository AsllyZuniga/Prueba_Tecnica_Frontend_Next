'use client'

import React from 'react'
import { Loader2 } from 'lucide-react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  disabledReason?: string;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabledReason,
  children,
  className = '',
  disabled = false,
  ...props
}) => {
  const disabledReasonId = React.useId()
  const isDisabled = disabled || isLoading
  const reasonMessage = isLoading ? 'Procesando, espera un momento.' : disabledReason

  const baseClasses = 'font-medium rounded transition-colors duration-200 flex items-center justify-center gap-2'
  
  const variantClasses = {
    primary: 'bg-primary-600 hover:bg-primary-700 text-white disabled:bg-dark-600',
    secondary: 'bg-dark-700 hover:bg-dark-600 text-gray-100 border border-dark-600',
    ghost: 'hover:bg-dark-700 text-gray-100',
    danger: 'bg-red-500 hover:bg-red-600 text-white disabled:bg-dark-600',
  }

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  }

  return (
    <div className="relative inline-flex group">
      <button
        type={props.type ?? 'button'}
        className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
        disabled={isDisabled}
        title={isDisabled && reasonMessage ? reasonMessage : props.title}
        aria-describedby={isDisabled && reasonMessage ? disabledReasonId : props['aria-describedby']}
        {...props}
      >
        {isLoading && <Loader2 size={16} className="animate-spin" aria-hidden="true" />}
        {children}
      </button>
      {isDisabled && reasonMessage && (
        <span
          id={disabledReasonId}
          role="status"
          className="pointer-events-none absolute left-1/2 top-full z-20 mt-2 w-max max-w-64 -translate-x-1/2 rounded-md border border-dark-700 bg-dark-800/95 px-2.5 py-1.5 text-[11px] font-medium text-gray-300 opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100"
        >
          {reasonMessage}
        </span>
      )}
    </div>
  )
}
