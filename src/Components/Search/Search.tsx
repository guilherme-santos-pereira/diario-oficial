import React, { useState } from "react";
import styles from "./Search.module.css";
import Input from "../Forms/Input";
import Button from "../Forms/Button";
import SelectedList from "../SelectedList/SelectedList";
import { handleKeyPress, optionsType } from "../Helper";
import { fetchPublic } from "../../Services/Slices/publicSlice";
import { useDispatch } from "react-redux";

const Search = () => {
  const [selectedRange, setSelectedRange] = useState<any>({
    start_date: "",
    end_date: "",
    post_type: [],
    post_code: "",
    words: [],
    exact_words: false,
  });
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | any) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setSelectedRange((prev: any) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setSelectedRange((prev: any) => {
        if (Array.isArray(prev[name])) {
          return {
            ...prev,
            [name]: [...prev[name], value],
          };
        }

        return {
          ...prev,
          [name]: value,
        };
      });
    }
  };

  const handleSubmit = () => {
    dispatch<any>(fetchPublic(selectedRange));
    setSelectedRange({
      start_date: "",
      end_date: "",
      post_type: [],
      post_code: "",
      words: [],
      exact_words: false,
    });
  };

  return (
    <div
      className={styles.container}
      onKeyUp={(e) =>
        handleKeyPress(e, handleSubmit, "Enter", ["words", "post_type"])
      }
    >
      <div className={styles.calend_datear}>
        <div>
          <label>De: </label>
          <Input
            className={styles.date}
            type="date"
            name="start_date"
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Até:</label>
          <Input
            className={styles.date}
            type="date"
            name="end_date"
            onChange={handleChange}
          />
        </div>
      </div>
      <SelectedList
        placeholder="Palavra-chave"
        field="words"
        list={selectedRange}
        setList={setSelectedRange}
      />

      <div className={styles.type}>
        <SelectedList
          placeholder="Tipo"
          field="post_type"
          list={selectedRange}
          setList={setSelectedRange}
          options={optionsType}
          isType
          readOnly
        />
      </div>
      <div style={{
        marginLeft: "15px",
      }} className={styles.calend_datear}>
        <Input
          className={styles.code}
          name="post_code"
          onChange={handleChange}
          placeholder="Código do diário"
        />
        <div className={styles.info}>
          <label>Palavras exatas?</label>
          <div
            style={{
              display: "flex",
            }}
          >
            <div className={styles.checkbox}>
              <Input
                name="exact_words"
                onChange={handleChange}
                type="checkbox"
              />
              <label>Sim</label>
            </div>
          </div>
        </div>
        <Button className={styles.button} onClick={handleSubmit}>
          Pesquisar
        </Button>
      </div>
    </div>
  );
};

export default Search;
