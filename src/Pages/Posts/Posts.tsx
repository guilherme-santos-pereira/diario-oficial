import { useEffect, useState } from "react";
import Error from "../../Components/Error/Error";
import Loading from "../../Components/Loading/Loading";
import Table from "../../Components/Table/Table";
import styles from "./Posts.module.css";

const Posts = () => {
  const data = [
    {
      name: "Diario de hoje",
      date: "06/25/2023",
      file: "Arquivo",
    },
    {
      name: "Diario de hoje",
      date: "07/26/2023",
      file: "Arquivo",
    },
    {
      name: "Diario de hoje",
      date: "08/27/2023",
      file: "Arquivo",
    },
  ];

  const columns = [
    { title: "Name", property: "name" },
    { title: "Data", property: "date" },
    { title: "Arquivo", property: "file" },
  ];

  const [page, setPage] = useState<number | string>();

  useEffect(() => {
    // dispatch(fetchExample(page));
  }, []);

  const loading = false;
  const error = false;

  if (loading) return <Loading size="5rem" type="spin" label="Carregando" />;

  if (error) return <Error size="5rem" label={`Erro ${error}`} />;

  return (
    <div className={styles.content}>
      <div className={styles.table}>
        <Table
          title="Últimos diários"
          columns={columns}
          data={data}
          setPage={setPage}
          page={page}
        />
      </div>
    </div>
  );
};

export default Posts;
