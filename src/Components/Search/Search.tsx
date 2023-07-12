import React, { useState } from "react";
import styles from "./Search.module.css";
import Input from "../Forms/Input";
import Button from "../Forms/Button";
// import { useDispatch } from "react-redux";

const Search = () => {
  const [selectedRange, setSelectedRange] = useState<any>({
    start: new Date(),
    end: new Date(),
    keyword: "",
  });
  // const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSelectedRange((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("selectedRange: ", selectedRange);
    // dispatch<any>(fetch(selectedRange))
  };

  return (
    <div className={styles.container}>
      <div className={styles.calendar}>
        <input
          className={styles.date}
          type="date"
          name="start"
          onChange={handleChange}
        />
        <input
          className={styles.date}
          type="date"
          name="end"
          onChange={handleChange}
        />
      </div>
      <Input
        className={styles.input}
        name="keyword"
        onChange={handleChange}
        placeholder="Palavra chave"
      />
      <Button className={styles.button} onClick={handleSubmit}>
        Pesquisar
      </Button>
    </div>
  );
};

export default Search;
