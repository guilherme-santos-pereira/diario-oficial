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
    console.log("option: ", option);
    if (!list[field].includes(option)) {
      setList((prev: any) => ({
        ...prev,
        [field]: [].concat(...list[field], option),
      }));
    }
  };

  const removeItem = (property: string) => {
    setList((prev: any) => {
      const updated = [...prev];
      const index = updated?.indexOf(property);
      if (index !== -1) {
        updated.splice(index, 1);
      }
      return updated;
    });
  };

  return (
    <div>
      <Input
        className={styles.input}
        onKeyPress={isType ? handleOptionClick : handleInputKeyPress}
        name="keyword"
        placeholder={placeholder}
        onFocus={isType ? onFocus : null}
        onBlur={isType ? onBlur : null}
      />
      <div className={styles.selected}>
        {list.map((item: string) => (
          <div key={item} className={styles.item}>
            {item}
            <button className={styles.remove} onClick={() => removeItem(item)}>
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChoiceList;
