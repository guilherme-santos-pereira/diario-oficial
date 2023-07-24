import React, { useState } from "react";
import styles from "./Search.module.css";
import Input from "../Forms/Input";
import Button from "../Forms/Button";
import ChoiceList from "../SelectedList/SelectedList";
import { v4 as uuidv4 } from "uuid";
import { optionsType } from "../Helper";

const Search = () => {
  const [selectedRange, setSelectedRange] = useState<any>({
    start: new Date(),
    end: new Date(),
    keyword: [],
    code: "",
    type: [],
    searchType: false,
  });

  const [showOptions, setShowOptions] = useState(false);

  const handleInputChange = () => {
    setShowOptions(true);
  };

  const handleOptionClick = (e: any) => {
    const option = e.currentTarget.value;
    if (!selectedRange.type.includes(option)) {
      setSelectedRange((prevRange: any) => ({
        ...prevRange,
        type: [].concat(...selectedRange.type, option),
      }));
    }
  };

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

  const handleBlur = () => {
    setTimeout(() => {
      setShowOptions(false);
    }, 75);
  };

  const handleSubmit = () => {
    console.log("selectedRange: ", selectedRange);
  };

  return (
    <div className={styles.container}>
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
      <ChoiceList
        placeholder="Palavra-chave"
        field="keyword"
        list={selectedRange.keyword}
        setList={setSelectedRange}
        onBlur={handleChange}
      />

      <div className={styles.type}>
        <ChoiceList
          placeholder="Tipo"
          field="type"
          list={selectedRange.type}
          setList={setSelectedRange}
          onFocus={handleInputChange}
          onBlur={handleBlur}
          isType
          readOnly
        />
        {showOptions && (
          <div className={styles.list}>
            {optionsType.map((option) => (
              <button
                className={`${styles.option} ${
                  selectedRange.type.includes(option)
                    ? styles.selectedOption
                    : ""
                }`}
                key={uuidv4()}
                value={option}
                onClick={handleOptionClick}
              >
                {option}
              </button>
            ))}
          </div>
        )}
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
