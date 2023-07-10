import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.copyright}>Copyright</div>
      <div className={styles.about}>About</div>
      <div className={styles.faq}>FAQ</div>
    </div>
  );
};

export default Footer;
