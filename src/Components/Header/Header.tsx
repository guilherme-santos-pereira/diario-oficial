import React, { useState } from "react";
import styles from "./Header.module.css";
import image from "../../Assets/logo_diario_oficial_branco.png";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const isAdmin = true;
  const navigate = useNavigate();
  const paths = [
    { label: "Últimos diários", path: "/posts" },
    { label: "Agendamentos", path: "/status" },
  ];
  const { pathname, origin }: any = window.location;
  const [currentPath, setCurrentPath] = useState<any>(
    pathname === paths[1].path ? paths[0] : paths[1]
  );

  const handlePath = () => {
    navigate(currentPath);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <img
            src={image}
            className={styles.image}
            alt="Logo diário oficial"
            onClick={() => navigate("")}
          />
        </div>
        <div className={styles.navigation}>
          {isAdmin && (
            <div>
              <a
                className={styles.route}
                href={`${origin}${currentPath.path}`}
                onClick={handlePath}
              >
                {currentPath.label}
              </a>
            </div>
          )}
          <div>
            <a
              className={styles.route}
              href="https://defensoria.sc.def.br/home/"
            >
              Defensoria pública
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
