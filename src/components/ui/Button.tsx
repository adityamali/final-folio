import React from "react";

const ButtonStyle = {
  boxShadow: "var(--bubble-shadow)",
};

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  bg?: string;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, bg }) => {
  const backgroundColor = bg || "bg-primary text-white";

  return (
    <button
      onClick={() => (onClick ? onClick() : null)}
      className={`px-6 py-3 rounded-full font-medium hover:bg-primary-dark transition-colors duration-300 ${backgroundColor}`}
      style={{ boxShadow: ButtonStyle.boxShadow }}
      data-cursor="block"
    >
      {children}
    </button>
  );
};

export default Button;
