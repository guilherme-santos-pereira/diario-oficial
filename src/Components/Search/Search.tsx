import React from "react";
import styles from "./Search.module.css";
import Input from "../Forms/Input";
import Button from "../Forms/Button";

const Search = () => {
  return (
    <div className={styles.container}>
      <Input type="text" className={styles.input} />
      <Button className={styles.button}>Pesquisar</Button>
    </div>
  );
};

export default Search;
