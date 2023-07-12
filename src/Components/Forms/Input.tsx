import React from "react";
import styles from "./Input.module.css";

interface iInput {
  className?: any;
  name?: string;
  content?: any;
  onClick?: any;
  onChange?: any;
  type?: any;
  placeholder?: string;
}

const Input: React.FC<iInput> = ({ className, onClick, ...props }) => {
  return (
    <input
      className={`${styles.container} ${className}`}
      onClick={onClick}
      {...props}
    ></input>
  );
};

export default Input;
