import React from "react";
import styles from "./Input.module.css";

interface Input {
  className?: any;
  content?: any;
  onClick?: any;
  type?: any;
}

const Input: React.FC<Input> = ({ className, content, onClick }) => {
  return (
    <input className={`${styles.container} ${className}`} onClick={onClick}>
      {content}
    </input>
  );
};

export default Input;
