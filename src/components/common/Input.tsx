"use client";

import React, { useId } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  className = "",
  id,
  ...props
}) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="mb-2 block text-label-12 text-brand-textStrong"
        >
          {label}
          {props.required && <span className="ml-1 text-brand-primary">*</span>}
        </label>
      )}

      <input
        id={inputId}
        className={`
          w-full rounded-lg border border-brand-border bg-brand-white px-3 py-2
          text-text-12 text-brand-textStrong placeholder:text-brand-text
          focus:outline-none focus:border-brand-active focus:ring-1 focus:ring-brand-active
          disabled:cursor-not-allowed disabled:bg-brand-surface disabled:text-brand-text
          ${error ? "border-brand-danger focus:border-brand-danger focus:ring-brand-danger" : ""}
          ${className}
        `}
        {...props}
      />

      {error && <p className="mt-1 text-text-12 text-brand-danger">{error}</p>}
      {helperText && !error && (
        <p className="mt-1 text-text-12 text-brand-text">{helperText}</p>
      )}
    </div>
  );
};