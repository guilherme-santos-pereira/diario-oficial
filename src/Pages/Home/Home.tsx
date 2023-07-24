import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import Search from "../../Components/Search/Search";
import News from "../../Components/News/News";
import { useSelector } from "react-redux";
import Table from "../../Components/Table/Table";
import Loading from "../../Components/Loading/Loading";
import Error from "../../Components/Error/Error";
import { fetchExample } from "../../Services/Slices/exampleSlice";

const Home = () => {
  // const { data } = useSelector((state: any) => state.diarysSlice);
  const [page, setPage] = useState<number | string>();
  const data = [
    {
      name: "Diario de hoje",
      date: "11/07/2023",
      file: "Arquivo",
    },
  ];
  const columns = [
    { title: "Name", property: "name" },
    { title: "Publicado", property: "date" },
    { title: "Arquivo", property: "file" },
  ];
  const regulation =
    "O Diário Oficial Eletrônico da Defensoria Pública do Estado de Santa Catarina é o instrumento oficial de publicação, divulgação e comunicação dos seus atos processuais e administrativos. Foi instituído pela Lei Complementar nº 805/202 de 1º de julho de 2022, e regulamentado pelos Atos DPG nº 059/2022, de 04 de outubro de 2022 e nº 072/2022, de 21 de novembro de 2022.";
  const loading = false;
  const error = false;

  useEffect(() => {
    // dispatch(fetchExample(page));
  }, []);

  if (loading) return <Loading size="5rem" type="spin" label="Carregando" />;

  if (error) return <Error size="3rem" label={`Erro ${error}`} />;

  return (
    <div className={styles.container}>
      <p className={styles.regulation}>{regulation}</p>
      <Search />
      {data ? (
        <div className={styles.table}>
          <Table
            title="Posts encontrados"
            data={data}
            columns={columns}
            setPage={setPage}
            page={page}
          />
        </div>
      ) : (
        <News className={styles.news} />
      )}
    </div>
  );
};

export default Home;
