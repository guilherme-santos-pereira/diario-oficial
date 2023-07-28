import React, { useEffect, useState } from "react";
import Error from "../../Components/Error/Error";
import Loading from "../../Components/Loading/Loading";
import Table from "../../Components/Table/Table";
import styles from "./Posts.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchPublic } from "../../Services/Slices/publicSlice";
import { handleExtract } from "../../Components/Helper";

interface iContent {
  file_name: string;
  presigned_url: string;
}

interface iExtracted {
  edition: string;
  date: string;
  presigned_url: string;
}

const Posts = () => {
  const dispatch = useDispatch();
  const [extracted, setExtracted] = useState<iExtracted[]>([]);
  const [page, setPage] = useState<number>(1);
  const { data, loading, error } = useSelector(
    (state: any) => state.publicSlice
  );

  const columns = [
    { title: "Edição", property: "edition" },
    { title: "Data", property: "date" },
    { title: "Arquivo", property: "presigned_url" },
  ];

  useEffect(() => {
    dispatch<any>(fetchPublic(page.toString()));
  }, [page]);

  useEffect(() => {
    if (data) {
      setExtracted([]);
      handleExtract(data.results, setExtracted);
    }
  }, [data]);

  if (loading) return <Loading size="5rem" type="spin" label="Carregando" />;

  if (error) return <Error size="5rem" label={`Erro ${error.status}`} />;

  return (
    <div className={styles.content}>
      <div className={styles.table}>
        <Table
          title="Últimos diários"
          columns={columns}
          data={extracted}
          setPage={setPage}
          page={page}
          total={data.count}
        />
      </div>
    </div>
  );
};

export default Posts;
