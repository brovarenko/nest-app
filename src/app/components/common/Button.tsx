"use client";
import { Spinner } from "@chakra-ui/react";
import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  isLoading = false,
  ...props
}) => {
  const baseClasses =
    "flex justify-items-center items-center px-4 py-2 rounded-full focus:outline-none w-full justify-center";

  const variantClasses = {
    primary: "bg-orange-500 hover:bg-orange-600 text-white",
    secondary: "bg-gray-800 hover:bg-gray-900 text-white",
  };

  const classes = `${baseClasses} ${variantClasses[variant]}`;

  return (
    <button className={classes} {...props} disabled={isLoading}>
      {isLoading ? <Spinner /> : children}
    </button>
  );
};

export default Button;
