'use client'

import React from 'react'
import { Loader2 } from 'lucide-react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  children,
  className = '',
  disabled = false,
  ...props
}) => {
  const baseClasses = 'font-medium rounded transition-colors duration-200 flex items-center justify-center gap-2'
  
  const variantClasses = {
    primary: 'bg-pink-500 hover:bg-pink-600 text-white disabled:bg-dark-600',
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
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader2 size={16} className="animate-spin" aria-hidden="true" />}
      {children}
    </button>
  )
}
