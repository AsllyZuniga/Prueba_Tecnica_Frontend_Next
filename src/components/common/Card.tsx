import React from 'react'

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, className = '', onClick }) => {
  const interactiveClasses = onClick
    ? 'cursor-pointer hover:shadow-lg hover:shadow-black/20 transition-shadow duration-200'
    : ''

  return (
    <div
      className={`
        bg-dark-800 rounded-xl p-5 shadow-md shadow-black/10
        ${interactiveClasses}
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
