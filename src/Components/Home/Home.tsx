import React from "react";
import styles from "./Home.module.css";
import Search from "../Search/Search";

const Home = () => {
  return (
    <div className={styles.container}>
      <Search />
      Notícia do dia
    </div>
  );
};

export default Home;
