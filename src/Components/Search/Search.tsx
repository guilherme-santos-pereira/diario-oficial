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
    start: new Date(),
    end: new Date(),
    keyword: [],
    code: "",
    type: [],
    searchType: false,
  });
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | any) => {
    const { name, value } = e.target;
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
  };

  const handleSubmit = () => {
    dispatch<any>(fetchPublic(selectedRange));
  };

  return (
    <div
      className={styles.container}
      onKeyUp={(e) =>
        handleKeyPress(e, handleSubmit, "Enter", ["keyword", "type"])
      }
    >
      <div className={styles.calendar}>
        <Input
          className={styles.date}
          type="date"
          name="start"
          onChange={handleChange}
        />
        <Input
          className={styles.date}
          type="date"
          name="end"
          onChange={handleChange}
        />
      </div>
      <SelectedList
        placeholder="Palavra-chave"
        field="keyword"
        list={selectedRange}
        setList={setSelectedRange}
      />

      <div className={styles.type}>
        <SelectedList
          placeholder="Tipo"
          field="type"
          list={selectedRange}
          setList={setSelectedRange}
          options={optionsType}
          isType
          readOnly
        />
      </div>
      <div className={styles.calendar}>
        <Input
          className={styles.code}
          name="code"
          onChange={handleChange}
          placeholder="Código do diário"
        />
        <div className={styles.info}>
          <label>Busca exata?</label>
          <div
            style={{
              display: "flex",
            }}
          >
            <div className={styles.checkbox}>
              <Input
                name="searchType"
                value={selectedRange.searchType}
                onClick={() =>
                  setSelectedRange((prev: any) => ({
                    ...prev,
                    searchType: !selectedRange.searchType,
                  }))
                }
                type="checkbox"
              />
              <label>Exato</label>
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
