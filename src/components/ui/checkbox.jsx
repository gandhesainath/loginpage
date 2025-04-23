import React from "react";
import { cn } from "../../lib/utils";

export function Checkbox({ className, ...props }) {
  return (
    <input
      type="checkbox"
      className={cn(
        "w-5 h-5 text-blue-600 bg-gray-900 border-gray-700 rounded focus:ring-blue-500 focus:ring-2 transition-colors duration-200",
        className
      )}
      {...props}
    />
  );
}
