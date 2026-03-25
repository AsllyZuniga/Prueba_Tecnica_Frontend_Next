import React from 'react'

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'default', className = '' }) => {
  const variantClasses = {
    default: 'bg-dark-700 text-gray-200',
    success: 'bg-emerald-900 text-emerald-100',
    warning: 'bg-amber-500 text-white',
    danger: 'bg-rose-600 text-white',
    info: 'bg-primary-900 text-primary-100',
  }

  return (
    <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  )
}
