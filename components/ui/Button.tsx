import React, { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      isLoading = false,
      fullWidth = false,
      className = "",
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]";

    const variantStyles = {
      primary:
        "bg-linear-to-r from-primary to-secondary text-white hover:from-primary-dark hover:to-secondary-dark focus:ring-primary shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30",
      secondary:
        "bg-linear-to-r from-secondary to-purple-600 text-white hover:from-secondary-dark hover:to-purple-700 focus:ring-secondary shadow-lg shadow-secondary/25 hover:shadow-xl",
      danger:
        "bg-linear-to-r from-red-500 to-rose-600 text-white hover:from-red-600 hover:to-rose-700 focus:ring-red-500 shadow-lg shadow-red-500/25 hover:shadow-xl",
      outline:
        "border-2 border-primary/30 dark:border-primary-light/30 text-primary dark:text-primary-light hover:bg-primary/10 dark:hover:bg-primary-light/10 hover:border-primary dark:hover:border-primary-light focus:ring-primary backdrop-blur-sm",
      ghost:
        "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/50 focus:ring-gray-500 shadow-none",
    };

    const sizeStyles = {
      sm: "px-4 py-2 text-sm",
      md: "px-5 py-2.5 text-sm",
      lg: "px-6 py-3 text-base",
    };

    const widthStyle = fullWidth ? "w-full" : "";

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${className}`}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Loading...
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
