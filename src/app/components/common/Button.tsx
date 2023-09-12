import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  ...props
}) => {
  const baseClasses =
    "flex justify-items-center items-center px-4 py-2 rounded-md focus:outline-none";

  const variantClasses = {
    primary: "bg-orange-500 hover:bg-orange-600 text-white",
    secondary: "bg-gray-800 hover:bg-gray-900 text-white",
  };

  const classes = `${baseClasses} ${variantClasses[variant]}`;

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button;
