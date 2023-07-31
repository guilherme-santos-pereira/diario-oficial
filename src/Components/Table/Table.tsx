import React, { useState } from "react";
import styles from "./Table.module.css";
import Pagination from "rc-pagination";
import Button from "../Forms/Button";
import { MdDownload } from "react-icons/md";
import { exhibitionDateFormat } from "../Helper";

interface TableProps {
  title?: string;
  columns: any;
  data: any;
  setPage: any;
  page: any;
  downloadButton?: boolean;
  total?: number;
}

const Table: React.FC<TableProps> = ({
  title,
  columns,
  data,
  setPage,
  page,
  downloadButton,
  total,
}) => {
  const [currentPage] = useState<number>(1);

  const handleDownloadFile = (file: string) => {
    // Assuming 'file' is the URL you want to download
    const a = document.createElement("a");
    a.href = file;
    a.download = "downloadedFile.pdf"; // Change the filename as needed
    a.click();
  };

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const customItemRender = (current: number, type: string) => {
    if (type === "page") {
      return current === currentPage ? <span>{page}</span> : null;
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
      <div className={styles.header}>
        {title && <div className={styles.headerTable}>{title}</div>}
        {downloadButton && (
          <Button
            className={styles.downloadButton}
            onClick={handleDownloadFile}
            alt="Baixar template"
          >
            <MdDownload size={24} />
          </Button>
        )}
      </div>
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
                <div key={columnIndex} className={styles.row}>
                  {column.property === "presigned_url" ? (
                    <Button
                      onClick={() => handleDownloadFile(row[column.property])}
                      className={`${styles.button} ${styles.download}`}
                    >
                      <MdDownload size={24} />
                    </Button>
                  ) : (
                    <div className={styles.tableCell}>
                      {row[column.property]}
                    </div>
                  )}
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
          total={total}
          pageSize={3} // i think its to allow or not the next button
          className={styles.customPagination}
          itemRender={customItemRender}
        />
      </div>
    </div>
  );
};

export default Table;
