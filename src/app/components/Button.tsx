// components/Button.tsx
import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary"; // Варианты стилей кнопки
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  ...props
}) => {
  const baseClasses = "px-4 py-2 rounded-md focus:outline-none";

  const variantClasses = {
    primary: "bg-orange-500 hover:bg-orange-600 text-white",
    secondary: "bg-gray-700 hover:bg-gray-800 text-white",
  };

  const classes = `${baseClasses} ${variantClasses[variant]}`;

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button;
