import React, { useState, KeyboardEvent } from "react";
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

  // const handleInputKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
  //   const inputValue = e.currentTarget.value; // Retrieve the input value
  //   if (e.key === "Enter" && inputValue.trim() !== "") {
  //     setKeywords((prevKeywords) => [...prevKeywords, inputValue.trim()]);
  //     setInputValue("");
  //     e.preventDefault(); // Prevent form submission
  //   }
  // };

  const handleInputKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    const inputValue = e.currentTarget.value.trim();
    if (e.key === "Enter" && inputValue !== "") {
      setKeywords((prevKeywords) => [...prevKeywords, inputValue]);
      setSelectedRange((prevRange: any) => ({
        ...prevRange,
        keyword: [...prevRange.keyword, inputValue],
      }));
      setInputValue("");
      e.preventDefault();
    }
  };

  const handleOptionClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const option = e.currentTarget.value;
    setInputValue(option);
    setShowOptions(false);
    handleChange({ target: { name: "type", value: option } });
  };

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement> | any) => {
  //   const { name, value } = e.target;
  //   setSelectedRange((prev: any) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | any) => {
    const { name, value } = e.target;

    setSelectedRange((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("keywords: ", keywords);
    const handleKeywords = keywords;
    setSelectedRange((prevRange: any) => ({
      ...prevRange,
      keyword: handleKeywords.map((item) => item),
    }));
    console.log("selectedRange: ", selectedRange);
  };

  const removeKeyword = (keyword: string) => {
    setKeywords((prevKeywords) => prevKeywords.filter((k) => k !== keyword));
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
          // onChange={handleChange}
          onKeyPress={handleInputKeyPress}
          placeholder="Palavra chave"
        />
        <textarea
          className={styles.selected}
          name="selected"
          value={keywords.join(", ")}
          onChange={handleChange}
          readOnly
        />
      </div>

      <div className={styles.type}>
        <Input
          className={styles.inputCode}
          name="code"
          onChange={handleChange}
          placeholder="Código do diário"
        />
        <div>
          <Input
            type="text"
            name="type"
            className={styles.inputCode}
            value={inputValue}
            onFocus={handleInputChange}
            onBlur={handleOptionClick}
            placeholder="Tipo"
          />
          {showOptions && (
            <div className={styles.list}>
              {options.map((option) => (
                <button
                  className={styles.options}
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
        <div>
          <p>Busca exata?</p>
          <div>
            <Input type="checkbox" />
            <label>Exato</label>
          </div>
        </div>
        <Button className={styles.button} onClick={handleSubmit}>
          Pesquisar
        </Button>
      </div>
      {/* {keywords.map((keyword) => (
        <div key={keyword} className={styles.keyword}>
          {keyword}
          <button
            className={styles.removeButton}
            onClick={() => removeKeyword(keyword)}
          >
            X
          </button>
        </div>
      ))} */}
    </div>
  );
};

export default Search;
