"use client";

import React, { useId } from "react";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  error,
  className = "",
  id,
  ...props
}) => {
  const generatedId = useId();
  const checkboxId = id ?? generatedId;

  return (
    <div className="flex items-start gap-2">
      <input
        id={checkboxId}
        type="checkbox"
        className={`
          mt-1 h-4 w-4 rounded border border-brand-border bg-brand-white
          cursor-pointer accent-brand-active
          focus:outline-none focus:ring-2 focus:ring-brand-active
          ${className}
        `}
        {...props}
      />
      {label && (
        <label
          htmlFor={checkboxId}
          className="flex-1 cursor-pointer text-text-12 text-brand-textStrong"
        >
          {label}
        </label>
      )}
      {error && <p className="mt-1 text-text-12 text-brand-danger">{error}</p>}
    </div>
  );
};