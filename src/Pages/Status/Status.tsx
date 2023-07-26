import React, { useEffect, useState } from "react";
import styles from "./Status.module.css";
import Input from "../../Components/Forms/Input";
import Button from "../../Components/Forms/Button";
import ChoiceList from "../../Components/SelectedList/SelectedList";
import Table from "../../Components/Table/Table";
import { v4 as uuidv4 } from "uuid";
import Error from "../../Components/Error/Error";
import Loading from "../../Components/Loading/Loading";
import { MdUpload } from "react-icons/md";
import { handleKeyPress, optionsType } from "../../Components/Helper";

const Status = () => {
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [page, setPage] = useState<number | string>();
  const [selectedRange, setSelectedRange] = useState<any>({
    file: File,
    type: [],
    date: new Date(),
    time: "",
    code: "",
  });

  const data = [
    {
      name: "Diario de hoje",
      date: "11/07/2023",
      file: "Arquivo",
    },
    {
      name: "Diario de hoje",
      date: "11/07/2023",
      file: "Arquivo",
    },
    {
      name: "Diario de hoje",
      date: "11/07/2023",
      file: "Arquivo",
    },
  ];

  const columns = [
    { title: "Name", property: "name" },
    { title: "Data", property: "date" },
    { title: "Arquivo", property: "file" },
  ];

  const handleInputChange = () => {
    setShowOptions(true);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setShowOptions(false);
    }, 75);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | any) => {
    const { name, value } = e.target;
    setSelectedRange((prev: any) => {
      if (Array.isArray(prev[name])) {
        return {
          ...prev,
          [name]: [[].concat(...prev[name], value)],
        };
      }

      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleTime = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const numericValue = value.replace(/\D/g, "").toString();

    if (numericValue === "") {
      setSelectedRange((prev: any) => ({
        ...prev,
        time: "",
      }));
      return;
    }

    let formattedValue = numericValue;
    if (numericValue.length > 2 && !numericValue.includes(":")) {
      formattedValue = numericValue.slice(0, 2) + ":" + numericValue.slice(2);
    }

    if (formattedValue.length > 5) {
      formattedValue = formattedValue.substring(0, 5);
    }

    setSelectedRange((prev: any) => ({
      ...prev,
      time: formattedValue,
    }));
  };

  const handleOption = (e: any) => {
    const option = e.currentTarget.value;
    if (!selectedRange.type.includes(option)) {
      setSelectedRange((prevRange: any) => ({
        ...prevRange,
        type: [].concat(...selectedRange.type, option),
      }));
    }
  };

  useEffect(() => {
    // dispatch(fetchExample(page));
  }, []);

  const handleSubmit = () => {
    console.log("selectedRange:", selectedRange);
    setSelectedRange({
      file: File,
      type: [],
      date: new Date(),
      time: "",
      code: "",
    });
  };

  const loading = false;
  const error = false;

  if (loading) return <Loading size="5rem" type="spin" label="Carregando" />;

  if (error) return <Error size="3rem" label={`Erro ${error}`} />;

  return (
    <div className={styles.container}>
      <div
        className={styles.postContainer}
        onKeyUp={(e) => handleKeyPress(e, handleSubmit, "Enter")}
      >
        <label className={styles.fakeInput} htmlFor="file">
          <MdUpload size={24} />
        </label>
        <Input
          className={styles.file}
          type="file"
          id="file"
          name="file"
          onChange={handleChange}
        />
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
            {optionsType.map((option: any) => (
              <button
                className={`${styles.option} ${
                  selectedRange.type.includes(option)
                    ? styles.selectedOption
                    : ""
                }`}
                key={uuidv4()}
                value={option}
                onClick={handleOption}
              >
                {option}
              </button>
            ))}
          </div>
        )}
        <div>
          <Input
            className={styles.date}
            type="date"
            name="date"
            value={selectedRange.date}
            onChange={handleChange}
          />
          <Input
            className={styles.time}
            name="time"
            value={selectedRange.time}
            onChange={handleTime}
            placeholder="Horario"
          />
        </div>
        <div className={styles.lastColumn}>
          <Input
            className={`${styles.input} ${styles.code}`}
            placeholder="Código"
            value={selectedRange.code}
            onChange={handleChange}
            name="code"
          />
          <Button
            className={`${styles.button} ${styles.schedule}`}
            onClick={handleSubmit}
          >
            Agendar
          </Button>
        </div>
      </div>

      <div className={styles.table}>
        <Table
          title="Status dos agendamentos"
          columns={columns}
          data={data}
          setPage={setPage}
          page={page}
          downloadButton
        />
      </div>
    </div>
  );
};

export default Status;
