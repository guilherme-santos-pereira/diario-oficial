import React, { useState } from "react";
import styles from "./Search.module.css";
import Input from "../Forms/Input";
import Button from "../Forms/Button";

const Search = () => {
  const [selectedRange, setSelectedRange] = useState<any>({
    start: new Date(),
    end: new Date(),
    keyword: [],
    code: "",
    type: "",
    searchType: false,
  });

  const [inputValue, setInputValue] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const options = [
    "Portaria",
    "Ato",
    "Relatório",
    "Edital",
    "Extrato",
    "Provimento",
    "Manifestação",
    "Deliberação",
    "Resolução",
    "Licitação",
    "Contrato",
    "Errata de Publicação",
    "Dispensa de Licitação",
    "Inexigibilidade de Licitação",
    "Avisos",
    "Resultados",
    "Concursos",
    "Súmulas",
    "circular",
  ];
  const [keywords, setKeywords] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowOptions(true);
    handleChange(e);
  };

  const handleInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const inputValue = e.currentTarget.value.trim();
    if (e.key === "Enter" && inputValue !== "") {
      setKeywords((prevKeywords) => [...prevKeywords, inputValue]);
      setSelectedRange((prevRange: any) => ({
        ...prevRange,
        keyword: [...prevRange.keyword, inputValue],
      }));
      e.currentTarget.value = "";
      e.preventDefault();
    }
  };

  const handleOptionClick = (e: any) => {
    const option = e.currentTarget.value;
    console.log("option: ", option);
    setInputValue(option);
    setShowOptions(false);
    handleChange({ target: { name: "type", value: option } });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | any) => {
    const { name, value } = e.target;

    setSelectedRange((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBlur = () => {
    setTimeout(() => {
      setShowOptions(false);
    }, 75);
  };

  const handleSubmit = () => {
    console.log("selectedRange: ", selectedRange);
    setSelectedRange((prevRange: any) => ({
      ...prevRange,
      keyword: [...keywords],
    }));
  };

  const removeKeyword = (keyword: string) => {
    setKeywords((prevKeywords) => {
      const updatedKeywords = [...prevKeywords];
      const index = updatedKeywords.indexOf(keyword);
      if (index !== -1) {
        updatedKeywords.splice(index, 1);
      }
      return updatedKeywords;
    });
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
      <div>
        <Input
          className={styles.input}
          name="keyword"
          onKeyPress={handleInputKeyPress}
          placeholder="Palavra chave"
        />
        <div className={styles.selected}>
          {keywords.map((keyword) => (
            <div key={keyword} className={styles.keyword}>
              {keyword}
              <button
                className={styles.remove}
                onClick={() => removeKeyword(keyword)}
              >
                X
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.type}>
        <Input
          className={styles.code}
          name="code"
          onChange={handleChange}
          placeholder="Código do diário"
        />
        <div>
          <Input
            type="text"
            name="type"
            className={styles.code}
            value={inputValue}
            onFocus={handleInputChange}
            onBlur={handleBlur}
            placeholder="Tipo"
          />
          {showOptions && (
            <div className={styles.list}>
              {options.map((option) => (
                <button
                  className={styles.option}
                  key={option}
                  value={option}
                  onClick={handleOptionClick}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className={styles.calendar}>
        <div className={styles.info}>
          <label>Busca exata?</label>
          <div
            style={{
              display: "flex",
            }}
          >
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
        <Button className={styles.button} onClick={handleSubmit}>
          Pesquisar
        </Button>
      </div>
    </div>
  );
};

export default Search;
