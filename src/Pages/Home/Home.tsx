import React from "react";
import styles from "./Home.module.css";
import Search from "../../Components/Search/Search";
import News from "../../Components/News/News";
import { useSelector } from "react-redux";
import Table from "../../Components/Table/Table";

const Home = () => {
  // const { data } = useSelector((state: any) => state.diarysSlice);

  const data = [
    {
      date: "11/07/2023",
      id: "27042002",
      subject: "Diario de hoje",
      file: "Arquivo",
    },
  ];
  const columns = [
    { title: "Publicado", property: "date" },
    { title: "ID", property: "id" },
    { title: "Assuntos", property: "subject" },
    { title: "Arquivo", property: "file" },
  ];

  return (
    <div className={styles.container}>
      <Search />
      {data ? (
        <div className={styles.table}>
          <Table title="Posts encontrados" data={data} columns={columns} />
        </div>
      ) : (
        <News className={styles.news} />
      )}
    </div>
  );
};

export default Home;
