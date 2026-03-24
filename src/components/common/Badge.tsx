import React from 'react'

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'default', className = '' }) => {
  const variantClasses = {
    default: 'bg-dark-700 text-gray-200',
    success: 'bg-green-900 text-green-100',
    warning: 'bg-yellow-900 text-yellow-100',
    danger: 'bg-red-900 text-red-100',
    info: 'bg-blue-900 text-blue-100',
  }

  return (
    <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  )
}
