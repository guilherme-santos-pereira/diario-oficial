import React, { useState, useEffect } from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      console.log("teste");
      if (windowHeight + scrollTop >= documentHeight) {
        setExpanded(true);
      } else {
        setExpanded(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <footer
      className={`${styles.container} ${expanded ? styles.expanded : ""}`}
    >
      <div className={styles.copyright}>
        Copyright
        <div>Copyright content</div>
      </div>
      <div className={styles.about}>
        About
        <div>About content</div>
      </div>
      <div className={styles.contact}>
        Contacts
        <div>Contacts content</div>
      </div>
    </footer>
  );
};

export default Footer;
