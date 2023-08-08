import React, { useState } from "react";
import styles from "./Search.module.css";
import Input from "../Forms/Input";
import Button from "../Forms/Button";
import SelectedList from "../SelectedList/SelectedList";
import { handleKeyPress, optionsType } from "../Helper";
import { fetchPublic } from "../../Services/Slices/publicSlice";
import { useDispatch } from "react-redux";

interface iSearch {
  setBackup?: any;
  setSearch?: any;
}

const Search: React.FC<iSearch> = ({ setBackup, setSearch }) => {
  const [selectedRange, setSelectedRange] = useState<any>({
    start_date: "",
    end_date: "",
    post_type: [],
    post_code: "",
    words: [],
    exact_words: false,
  });

  const [startDate, setStartDate] = useState<string | undefined>(
      selectedRange.start_date
  );
  const [endDate, setEndDate] = useState<string | undefined>(
      selectedRange.end_date
  );
  const [postCode, setPostCode] = useState<string | undefined>(
      selectedRange.end_date
  );
  const [exactWordsChecked, setExactWordsChecked] = useState<boolean>(false);

  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | any) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setSelectedRange((prev: any) => ({
        ...prev,
        [name]: checked,
      }));
      if (name === "exact_words") {
        setExactWordsChecked(checked);
      }
    } else {
      setSelectedRange((prev: any) => ({
        ...prev,
        [name]: value,
      }));

      if (name === "start_date") {
        setStartDate(value);
      } else if (name === "end_date") {
        setEndDate(value);
      } else if (name === "post_code") {
        setPostCode(value);
      }
    }
  };

  const handleSubmit = () => {
    dispatch<any>(fetchPublic(selectedRange));
    setBackup(selectedRange);
    setSearch(true);
    setSelectedRange({
      start_date: "",
      end_date: "",
      post_type: [],
      post_code: "",
      words: [],
      exact_words: false,
    });
    setStartDate("");
    setEndDate("");
    setPostCode("");
    setExactWordsChecked(false);
  };

  return (
      <div className={styles.container} onKeyUp={(e) => handleKeyPress(e, handleSubmit, "Enter", ["words", "post_type"])}>
        <div className={styles.calend_datear}>
          <div>
            <label>De: </label>
            <Input className={styles.date} type="date" name="start_date" value={startDate} onChange={handleChange} />
          </div>
          <div>
            <label>Até:</label>
            <Input className={styles.date} type="date" name="end_date" value={endDate} onChange={handleChange} />
          </div>
        </div>
        <SelectedList placeholder="Palavra-chave" field="words" list={selectedRange} setList={setSelectedRange} />
        <div className={styles.type}>
          <SelectedList placeholder="Tipo" field="post_type" list={selectedRange} setList={setSelectedRange} options={optionsType} isType readOnly />
        </div>
        <div style={{ marginLeft: "15px" }} className={styles.calend_datear}>
          <Input className={styles.code} name="post_code" value={postCode} onChange={handleChange} placeholder="Código da edição" />
          <div className={styles.info}>
            <label>Palavras exatas?</label>
            <div style={{ display: "flex" }}>
              <div className={styles.checkbox}>
                <Input name="exact_words" checked={exactWordsChecked} onChange={handleChange} type="checkbox" />
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