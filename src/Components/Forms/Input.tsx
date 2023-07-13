import React from "react";
import styles from "./Input.module.css";

interface iInput {
  className?: any;
  name?: string;
  value?: any;
  content?: any;
  onClick?: any;
  onChange?: any;
  onFocus?: any;
  onBlur?: any;
  type?: any;
  placeholder?: string;
  onKeyPress?: any;
  id?: any;
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
