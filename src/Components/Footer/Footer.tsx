import React from "react";
import { useLocation } from "react-router-dom";
import styles from "./Footer.module.css";

const Footer = () => {
  const location = useLocation();
  const isStatusPage = location.pathname === "/status";

  if (isStatusPage) {
    return null;
  }

  return (
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.topics}>
            <div className={styles.content}>
              <h4>Sobre</h4>
              <p className={styles.description}>
                &copy; {new Date().getFullYear()} diário oficial. Todos os
                direitos reservados. <br />
                <br />
                <strong>Objetivo:</strong> Atualizar a comunidade de forma pratica
                sobre as noticias que acontecem na defensoria publica de SC <br />
                <strong>Publicações:</strong> Dias úteis: 00:00 <br />
              </p>
            </div>
            <div className={styles.content}>
              <h4>Redes sociais</h4>
              <p className={styles.description}>
                <strong>Instagram:</strong>
                {"  "}
                <a
                    className={styles.redirect}
                    href="https://www.instagram.com/defensoriasc/"
                    target="_blanck"
                >
                  @defensoriasc
                </a>{" "}
                <br />
                <strong>Facebook:</strong>
                {"  "}
                <a
                    className={styles.redirect}
                    href="https://www.facebook.com/defensoriasc"
                    target="_blanck"
                >
                  defensoriasc
                </a>{" "}
                <br />
                <strong>Youtube:</strong>
                {"  "}
                <a
                    className={styles.redirect}
                    href="https://www.youtube.com/channel/UCsiXdbsU9_EVJlVfq8iNZkQ"
                    target="_blanck"
                >
                  defensoria pública
                </a>{" "}
                <br />
                <strong>Twitter:</strong>
                {"  "}
                <a
                    className={styles.redirect}
                    href="https://www.twitter.com/defensoriaDPESC"
                    target="_blanck"
                >
                  defensoriaDPESC
                </a>{" "}
                <br />
                <strong>LinkedIn:</strong>
                {"  "}
                <a
                    className={styles.redirect}
                    href="https://www.linkedin.com/company/defensoria-pública-do-estado-de-santa-catarina/?viewAsMember=true"
                    target="_blanck"
                >
                  Defensoria pública
                </a>{" "}
                <br />
              </p>
            </div>
            <div className={styles.content}>
              <h4>Contato</h4>
              <p className={styles.description}>
                <strong>Email:</strong> exemplo@defensoria.gov.br <br />
                <strong>Endereço:</strong> Av. Rio Branco, nº 919, Ed. Centro
                Executivo Rio Branco, Centro, Florianópolis/SC, 88015-205 <br />
                <strong>Telefone:</strong>{" "}
                <>(48) 3665-6370 / (48) 3665-6589 / (48) 3665-6654</>
              </p>
            </div>
          </div>
        </div>
      </footer>
  );
};

export default Footer;
