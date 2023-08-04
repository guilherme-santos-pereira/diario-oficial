import React from "react";
import { useLocation } from "react-router-dom";
import styles from "./Footer.module.css";

const Footer = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  if (!isHomePage) {
    return null;
  }

  return (
      <footer className={styles.footer}>
          <div className={styles.topics}>
            <div className={styles.content}>
              <p className={styles.description}>
                Objetivo: Atualizar a comunidade de forma pratica sobre as noticias que acontecem na defensoria publica de SC<br />
                Publicações: Dias úteis: 00:00<br />
              </p>
            </div>
            <p className={styles.description}>
              &copy; {new Date().getFullYear()} diário oficial. Todos os direitos reservados.
            </p>
            <div className={styles.content}>
              <h4>Contato</h4>
              <p className={styles.description}>
                <strong>Endereço:</strong> Av. Rio Branco, nº 919, Ed. Centro Executivo Rio Branco, Centro, Florianópolis/SC, 88015-205<br />
                <strong>Telefone:</strong> (48) 3665-6370 / (48) 3665-6589 / (48) 3665-6654
              </p>
            </div>
          </div>
      </footer>
  );
};

export default Footer;
