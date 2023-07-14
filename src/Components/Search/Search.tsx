import React, { useState } from "react";
import styles from "./Search.module.css";
import Input from "../Forms/Input";
import Button from "../Forms/Button";
import ChoiceList from "../ChoiceList/ChoiceList";
import { v4 as uuidv4 } from "uuid";

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

  const removeType = (type: string) => {
    setSelectedRange((prevRange: any) => ({
      ...prevRange,
      type: prevRange.type.filter((t: string) => t !== type),
    }));
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
        list={keywords}
        setList={setKeywords}
        setSelectedRange={setSelectedRange}
      />

      <div className={styles.type}>
        <ChoiceList
          placeholder="Tipo"
          field="type"
          list={selectedRange.type}
          setList={setSelectedRange}
          setSelectedRange={setSelectedRange}
          isType
          onFocus={handleInputChange}
          onBlur={handleBlur}
        />
        <Input
          className={styles.code}
          name="code"
          onChange={handleChange}
          placeholder="Código do diário"
        />
        {showOptions && (
          <div className={styles.list}>
            {options.map((option) => (
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
