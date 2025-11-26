import React from "react";
import clsx from "clsx";

export type ButtonVariant = "default" | "outline" | "ghost" | "destructive";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  className?: string;
}

export function Button({
  children,
  variant = "default",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={clsx(
        "px-4 py-2 rounded-md font-medium transition-all",
        {
          default: "bg-orange-500 text-white hover:bg-orange-600",
          outline: "border border-gray-300 text-gray-700 hover:bg-gray-100",
          ghost: "text-gray-700 hover:bg-gray-200",
          destructive: "bg-red-500 text-white hover:bg-red-600",
        }[variant],
        className
      )}
    >
      {children}
    </button>
  );
}
