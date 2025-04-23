import React from "react";
import { cn } from "../../lib/utils";

export function Button({ children, className, variant, ...props }) {
  const baseClasses = "px-5 py-3 rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200";
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500",
    secondary: "bg-gray-300 hover:bg-gray-400 text-black focus:ring-gray-400",
  };
  const variantClasses = variants[variant] || variants.primary;

  return (
    <button className={cn(baseClasses, variantClasses, className)} {...props}>
      {children}
    </button>
  );
}
