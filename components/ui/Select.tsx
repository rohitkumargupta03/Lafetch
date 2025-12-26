import React, { SelectHTMLAttributes, forwardRef } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, className = "", ...props }, ref) => {
    const selectStyles = `
      w-full px-4 py-3 rounded-xl border-2 appearance-none cursor-pointer
      ${
        error
          ? "border-red-400/50 focus:ring-red-500 focus:border-red-500"
          : "border-gray-200 dark:border-[#3b3561] focus:ring-primary/50 focus:border-primary"
      }
      bg-gray-50 dark:bg-[#241f42]
      text-gray-900 dark:text-gray-100
      focus:outline-none focus:ring-2 focus:bg-white dark:focus:bg-[#241f42]
      disabled:opacity-50 disabled:cursor-not-allowed
      transition-all duration-300
      hover:border-gray-300 dark:hover:border-[#4a4275]
      bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2024%2024%22%20stroke%3D%22%236366f1%22%3E%3Cpath%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%222%22%20d%3D%22M19%209l-7%207-7-7%22%2F%3E%3C%2Fsvg%3E')]
      bg-[length:1.5em] bg-[right_0.5rem_center] bg-no-repeat
    `;

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {label}
          </label>
        )}
        <select ref={ref} className={`${selectStyles} ${className}`} {...props}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";
