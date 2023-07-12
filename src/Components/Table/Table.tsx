import React from "react";
import styles from "./Table.module.css";

interface TableProps {
  title?: string;
  columns: any;
  data: any;
}

const Table: React.FC<TableProps> = ({ title, columns, data }) => {
  return (
    <>
      {title && <div className={styles.headerTable}>{title}</div>}
      <div className={styles.container}>
        <div className={styles.tableHeader}>
          {columns.map((column: any, index: any) => (
            <div key={index} className={styles.columnHeader}>
              <div className={styles.columnTitle}>{column.title}</div>
            </div>
          ))}
        </div>
        <div className={styles.tableBody}>
          {data.map((row: any, rowIndex: any) => (
            <div key={rowIndex} className={styles.tableRow}>
              {columns.map((column: any, columnIndex: any) => (
                <div key={columnIndex} className={styles.tableCell}>
                  {row[column.property]}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Table;
