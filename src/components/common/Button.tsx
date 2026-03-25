"use client";

import React from "react";
import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "neutral" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  disabledReason?: string;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  isLoading = false,
  disabledReason,
  children,
  className = "",
  disabled = false,
  ...props
}) => {
  const disabledReasonId = React.useId();
  const isDisabled = disabled || isLoading;
  const reasonMessage = isLoading
    ? "Procesando, espera un momento."
    : disabledReason;

  const baseClasses =
    "inline-flex items-center justify-center gap-2 rounded-xl transition-all duration-200 font-semibold disabled:cursor-not-allowed";

  const variantClasses = {
    primary:
      "bg-brand-primary text-brand-white shadow-soft hover:opacity-95 disabled:opacity-50",
    secondary:
      "bg-brand-white border border-brand-primaryBorder text-brand-primaryEnd hover:bg-brand-primarySoft disabled:opacity-50",
    neutral:
      "bg-brand-white border border-brand-border text-brand-text hover:bg-brand-background disabled:opacity-50",
    danger:
      "bg-brand-danger text-brand-white hover:opacity-90 disabled:opacity-50",
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-label-12",
    md: "px-5 py-2.5 text-label-12",
    lg: "px-6 py-3 text-label-16",
  };

  return (
    <div className="relative inline-flex group">
      <button
        type={props.type ?? "button"}
        className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
        disabled={isDisabled}
        title={isDisabled && reasonMessage ? reasonMessage : props.title}
        aria-describedby={
          isDisabled && reasonMessage
            ? disabledReasonId
            : props["aria-describedby"]
        }
        {...props}
      >
        {isLoading && (
          <Loader2 size={16} className="animate-spin" aria-hidden="true" />
        )}
        {children}
      </button>

      {isDisabled && reasonMessage && (
        <span
          id={disabledReasonId}
          role="status"
          className="pointer-events-none absolute left-1/2 top-full z-20 mt-2 w-max max-w-64 -translate-x-1/2 rounded-md border border-brand-border bg-brand-white px-2.5 py-1.5 text-[11px] text-brand-text shadow-lg opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100"
        >
          {reasonMessage}
        </span>
      )}
    </div>
  );
};