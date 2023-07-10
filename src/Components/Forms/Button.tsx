import React from "react";
import styles from "./Button.module.css";

interface Button {
  className?: any;
  content?: any;
  onClick?: any;
  children?: string;
}

const Button: React.FC<Button> = ({ className, onClick, children }) => {
  return (
    <button className={`${styles.container} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
