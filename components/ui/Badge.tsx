import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "pending" | "in-progress" | "completed" | "default";
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "default",
  className = "",
}) => {
  const baseStyles =
    "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border transition-all duration-200";

  const variantStyles = {
    pending:
      "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/40 dark:text-amber-300 dark:border-amber-700",
    "in-progress":
      "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/40 dark:text-blue-300 dark:border-blue-700",
    completed:
      "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-300 dark:border-emerald-700",
    default:
      "bg-gray-100 text-gray-700 border-gray-200 dark:bg-[#241f42] dark:text-gray-300 dark:border-[#3b3561]",
  };

  return (
    <span className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  );
};
