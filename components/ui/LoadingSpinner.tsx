import React from "react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "md",
  className = "",
}) => {
  const sizeStyles = {
    sm: "h-5 w-5",
    md: "h-10 w-10",
    lg: "h-14 w-14",
  };

  const borderStyles = {
    sm: "border-2",
    md: "border-3",
    lg: "border-4",
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="relative">
        <div
          className={`${sizeStyles[size]} ${borderStyles[size]} border-primary/20 rounded-full`}
        />
        <div
          className={`absolute top-0 left-0 ${sizeStyles[size]} ${borderStyles[size]} border-transparent border-t-primary border-r-secondary rounded-full animate-spin`}
        />
      </div>
    </div>
  );
};
