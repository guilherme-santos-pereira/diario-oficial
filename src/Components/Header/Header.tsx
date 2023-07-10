import React from "react";
import { AiOutlineUser } from "react-icons/ai";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>Logo</div>
        <div className={styles.main}>Content</div>
        <div className={styles.account}>
          <AiOutlineUser size={32} />
        </div>
      </div>
    </header>
  );
};

export default Header;
