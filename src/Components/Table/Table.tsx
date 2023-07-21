import React, { useState } from "react";
import styles from "./Table.module.css";
import Pagination from "rc-pagination";
import Button from "../Forms/Button";

interface TableProps {
  title?: string;
  columns: any;
  data: any;
  setPage: any;
  page: any;
}

const Table: React.FC<TableProps> = ({
  title,
  columns,
  data,
  setPage,
  page,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  // This function will be called when the page changes
  const handlePageChange = (page: number) => {
    console.log("a");
    setPage(page);
    // You can also fetch new data from the server or update your component's state based on the new page value.
  };

  const customItemRender = (current: number, type: string) => {
    if (type === "page") {
      // Show the current page number only
      return current === currentPage ? <span>{current}</span> : null;
    }
    if (type === "prev") {
      return <Button className={styles.backButton}>Voltar</Button>;
    }
    if (type === "next") {
      return <Button className={styles.button}>Avançar</Button>;
    }
    return null;
  };

  return (
    <div className={styles.content}>
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
      <div className={styles.pagination}>
        <Pagination
          current={page}
          onChange={handlePageChange}
          total={data.length}
          pageSize={1}
          className={styles.customPagination}
          itemRender={customItemRender}
        />
      </div>
    </div>
  );
};

export default Table;
