import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  onClick,
}) => {
  const interactiveClasses = onClick
    ? "cursor-pointer hover:shadow-md transition-shadow duration-200"
    : "";

  return (
    <div
      className={`
        bg-brand rounded-xl p-5 border border-brand-border shadow-sm
        ${interactiveClasses}
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  );
};