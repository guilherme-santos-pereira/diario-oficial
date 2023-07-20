import React, { useState } from "react";
import styles from "./Status.module.css";
import Input from "../../Components/Forms/Input";
import Button from "../../Components/Forms/Button";
import ChoiceList from "../../Components/SelectedList/SelectedList";
import Table from "../../Components/Table/Table";
import { v4 as uuidv4 } from "uuid";

const Status = () => {
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [selectedRange, setSelectedRange] = useState<any>({
    file: File,
    type: [],
    date: new Date(),
  });

  const data = [
    {
      id: "27042002",
      status: "Diario de hoje",
      date: "11/07/2023",
      file: "Arquivo",
    },
    {
      id: "27042002",
      status: "Diario de hoje",
      date: "11/07/2023",
      file: "Arquivo",
    },
    {
      id: "27042002",
      status: "Diario de hoje",
      date: "11/07/2023",
      file: "Arquivo",
    },
  ];

  const columns = [
    { title: "ID", property: "id" },
    { title: "Status", property: "status" },
    { title: "Data", property: "date" },
    { title: "Arquivo", property: "file" },
  ];

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

  const handleInputChange = () => {
    setShowOptions(true);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setShowOptions(false);
    }, 75);
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

  return (
    <div className={styles.container}>
      <div className={styles.postContainer}>
        <label className={styles.fakeInput} htmlFor="fileInput">
          Selecionar arquivo
        </label>
        <Input className={styles.file} type="file" id="fileInput" />
        <ChoiceList
          placeholder="Tipo"
          field="type"
          list={selectedRange.type}
          setList={setSelectedRange}
          onFocus={handleInputChange}
          onBlur={handleBlur}
          readOnly
          isType
        />
        {showOptions && (
          <div className={styles.list}>
            {options.map((option: any) => (
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
        <Input className={styles.date} type="date" placeholder="Select Date" />
        <Button className={styles.button}>Agendar</Button>
      </div>

      <div className={styles.table}>
        <Table title="Status dos diários" columns={columns} data={data} />
      </div>
    </div>
  );
};

export default Status;
