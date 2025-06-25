// components/ui/Button.jsx
import React from "react";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  type = "button",
  onClick,
  disabled = false,
  className = "",
}) => {
  const baseStyles =
    "rounded font-semibold transition duration-200 focus:outline-none text-white";

  const variantStyles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-[#0C205A] hover:bg-gray-300 text-black",
    outline: "border border-gray-400 text-gray-800 hover:bg-gray-100",
    yellowGradient:
      "bg-gradient-to-r from-[#3CAAFA] to-[#1198fa] hover:from-[#1a8adb] hover:to-[#0278d9] shadow transition-transform hover:scale-95 ",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  const sizeStyles = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-5 py-3 text-lg",
  };

  const combinedClasses = [
    baseStyles,
    variantStyles[variant] || variantStyles.primary,
    sizeStyles[size] || sizeStyles.md,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      className={combinedClasses}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
