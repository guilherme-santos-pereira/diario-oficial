import React from "react";
import styles from "./ChoiceList.module.css";
import Input from "../Forms/Input";

interface iChoiceList {
  setList: any;
  list: any;
  setSelectedRange: any;
  placeholder?: string;
  isType?: boolean;
  field: string;
  onFocus?: any;
  onBlur?: any;
  value?: any;
}

const ChoiceList: React.FC<iChoiceList> = ({
  setList,
  list,
  placeholder,
  setSelectedRange,
  isType,
  field,
  onFocus,
  onBlur,
  value,
}) => {
  const handleInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const inputValue = e.currentTarget.value.trim();
    if (e.key === "Enter" && inputValue !== "") {
      setList((prev: any) => [...prev, inputValue]);
      setSelectedRange((prev: any) => ({
        ...prev,
        keyword: [...prev.keyword, inputValue],
      }));
      e.currentTarget.value = "";
      e.preventDefault();
    }
  };

  const handleOptionClick = (e: any) => {
    const option = e.currentTarget.value;
    if (!Array.isArray(list[field])) {
      setList((prev: any) => ({
        ...prev,
        [field]: [option],
      }));
    } else if (!list[field].includes(option)) {
      setList((prev: any) => ({
        ...prev,
        [field]: [...list[field], option],
      }));
    }
  };

  const removeKeyword = (keyword: string) => {
    setList((prev: any) => {
      const updatedKeywords = [...prev];
      const index = updatedKeywords.indexOf(keyword);
      if (index !== -1) {
        updatedKeywords.splice(index, 1);
      }
      return updatedKeywords;
    });
    setSelectedRange((prev: any) => ({
      ...prev,
      keyword: list,
    }));
  };

  const removeItem = (property: string) => {
    setList((prev: any) => {
      let updated;

      if (Array.isArray(prev[field])) {
        updated = prev[field].filter((item: string) => item !== property);
      } else {
        updated = { ...prev };
        delete updated[field];
      }

      return {
        ...prev,
        [field]: updated,
      };
    });
  };

  return (
    <div>
      <Input
        className={styles.input}
        onKeyPress={isType ? handleOptionClick : handleInputKeyPress}
        name={field}
        placeholder={placeholder}
        onFocus={isType ? onFocus : null}
        onBlur={isType ? onBlur : null}
        value={value}
      />
      <div className={styles.selected}>
        {list?.map((item: string) => (
          <div key={item} className={styles.item}>
            {item}
            <button
              className={styles.remove}
              onClick={() => (isType ? removeItem(item) : removeKeyword(item))}
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChoiceList;
