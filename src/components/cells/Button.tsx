import React from "react";

interface ButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "tertiary" | "success" | "danger";
  type?: "button" | "submit" | "reset"; // Add type prop
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = "primary",
  type = "button",
  disabled = false,
}) => {
  const getButtonClasses = (variant: string, disabled: boolean) => {
    const baseClasses = disabled ? "cursor-not-allowed opacity-50" : "";
    switch (variant) {
      case "primary":
        return `${baseClasses} bg-pink600 text-white ${
          disabled ? "" : "hover:bg-pink700"
        }`;
      case "secondary":
        return `${baseClasses} bg-pink50 text-pink950 ${
          disabled ? "" : "hover:bg-pink100"
        } border-2 border-pink950`;
      default:
        return "";
    }
  };

  return (
    <button
      type={type} // Set button type
      className={`rounded-full flex justify-center gap-2 font-bold px-5 py-3 leading-[1.5] ${getButtonClasses(
        variant,
        disabled
      )}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
