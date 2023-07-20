// import React from "react";
// import styles from "./ChoiceList.module.css";
// import Input from "../Forms/Input";
// import { v4 as uuidv4 } from "uuid";

// interface iChoiceList {
//   setList: any;
//   list: any;
//   placeholder?: string;
//   isType?: boolean;
//   field: string;
//   onFocus?: any;
//   onBlur?: any;
//   value?: any;
//   readOnly?: boolean;
//   className?: any;
//   classNameDiv?: any;
// }

// const ChoiceList: React.FC<iChoiceList> = ({
//   setList,
//   list = [],
//   placeholder,
//   isType,
//   field,
//   onFocus,
//   onBlur,
//   value,
//   readOnly,
//   className,
//   classNameDiv,
//   ...props
// }) => {
//   const handleAddItem = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     const inputValue = e.currentTarget.value.trim();
//     if (e.key === "Enter" && inputValue !== "") {
//       setList((prev: any) => ({
//         ...prev,
//         [field]: [...(prev[field] || []), inputValue],
//       }));
//       e.currentTarget.value = "";
//       e.preventDefault();
//     }
//   };

//   const removeItem = (keyword: string) => {
//     setList((prev: any) => {
//       const updatedKeywords = Array.isArray(prev[field])
//         ? [...prev[field]]
//         : [];
//       const index = updatedKeywords.indexOf(keyword);
//       if (index !== -1) {
//         updatedKeywords.splice(index, 1);
//       }

//       return {
//         ...prev,
//         [field]: updatedKeywords,
//       };
//     });
//   };

//   return (
//     <div>
//       <Input
//         className={`${styles.input} ${className}`}
//         onKeyPress={handleAddItem}
//         name={field}
//         placeholder={placeholder}
//         onFocus={isType ? onFocus : null}
//         onBlur={isType ? onBlur : null}
//         value={value}
//         readOnly={readOnly}
//         {...props}
//       />

//       <div className={styles.selected}>
//         {list?.map((item: string) => (
//           <div key={uuidv4()} className={`${styles.item} ${classNameDiv}`}>
//             {item}
//             <button className={styles.remove} onClick={() => removeItem(item)}>
//               X
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ChoiceList;

import React from "react";
import styles from "./ChoiceList.module.css";
import Input from "../Forms/Input";
import { v4 as uuidv4 } from "uuid";

interface iChoiceList {
  setList: any;
  list: any;
  placeholder?: string;
  isType?: boolean;
  field: string;
  onFocus?: any;
  onBlur?: any;
  value?: any;
  readOnly?: boolean;
  className?: any;
  classNameDiv?: any;
}

const ChoiceList: React.FC<iChoiceList> = ({
  setList,
  list = [],
  placeholder,
  isType,
  field,
  onFocus,
  onBlur,
  value,
  readOnly,
  className,
  classNameDiv,
  ...props
}) => {
  const handleAddItem = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const inputValue = e.currentTarget.value.trim();
    if (e.key === "Enter" && inputValue !== "") {
      setList((prev: any) => ({
        ...prev,
        [field]: [...(prev[field] || []), inputValue],
      }));
      e.currentTarget.value = "";
      e.preventDefault();
    }
  };

  const removeItem = (keyword: string) => {
    setList((prev: any) => {
      const updatedKeywords = Array.isArray(prev[field])
        ? [...prev[field]]
        : [];
      const index = updatedKeywords.indexOf(keyword);
      if (index !== -1) {
        updatedKeywords.splice(index, 1);
      }

      return {
        ...prev,
        [field]: updatedKeywords,
      };
    });
  };

  // Check if the list is empty, and if so, don't render the div
  if (list.length === 0) {
    return (
      <Input
        className={`${styles.input} ${className}`}
        onKeyPress={handleAddItem}
        name={field}
        placeholder={placeholder}
        onFocus={isType ? onFocus : null}
        onBlur={isType ? onBlur : null}
        value={value}
        readOnly={readOnly}
        {...props}
      />
    );
  }

  return (
    <div>
      <Input
        className={`${styles.input} ${className}`}
        onKeyPress={handleAddItem}
        name={field}
        placeholder={placeholder}
        onFocus={isType ? onFocus : null}
        onBlur={isType ? onBlur : null}
        value={value}
        readOnly={readOnly}
        {...props}
      />

      <div className={styles.selected}>
        {list.map((item: string) => (
          <div key={uuidv4()} className={`${styles.item} ${classNameDiv}`}>
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
