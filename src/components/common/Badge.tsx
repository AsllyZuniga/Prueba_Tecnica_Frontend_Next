import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "danger" | "info";
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "default",
  className = "",
}) => {
  const variantClasses = {
    default: "bg-brand-surface text-brand-text border border-brand-border",
    success: "bg-brand-activeSoft text-brand-active",
    warning: "bg-brand-primarySoft text-brand-primary",
    danger: "bg-red-50 text-brand-danger",
    info: "bg-brand-activeSoft text-brand-active",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-1 text-label-12 ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
};