import React from "react";
import styles from "./Header.module.css";
import image from "../../Assets/logo_diario_oficial_branco.png";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <img src={image} className={styles.image} />
        </div>
      </div>
    </header>
  );
};

export default Header;
