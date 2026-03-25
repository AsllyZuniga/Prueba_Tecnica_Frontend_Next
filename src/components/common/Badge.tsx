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
    success: "bg-[#32CD3233] text-[#32CD32]",
    warning: "bg-[#EA580C33] text-[#EA580C]",
    danger: "bg-[#FF000033] text-[#FF0000]",
    info: "bg-brand-activeSoft text-brand-active",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-1 text-[12px] leading-4 font-normal ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
};