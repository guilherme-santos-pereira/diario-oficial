import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import Search from "../../Components/Search/Search";
import News from "../../Components/News/News";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../Components/Table/Table";
import Loading from "../../Components/Loading/Loading";
import Error from "../../Components/Error/Error";
import { handleExtractUrl } from "../../Components/Helper";

const Home = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(
    (state: any) => state.publicSlice
  );
  const [page, setPage] = useState<number | string>();
  const [extracted, setExtracted] = useState<any>([]);
  const columns = [
    { title: "Name", property: "fileName" },
    { title: "Publicado", property: "date" },
    { title: "Arquivo", property: "presigned_url" },
  ];
  const regulation =
    "O Diário Oficial Eletrônico da Defensoria Pública do Estado de Santa Catarina é o instrumento oficial de publicação, divulgação e comunicação dos seus atos processuais e administrativos. Foi instituído pela Lei Complementar nº 805/202 de 1º de julho de 2022, e regulamentado pelos Atos DPG nº 059/2022, de 04 de outubro de 2022 e nº 072/2022, de 21 de novembro de 2022.";

  useEffect(() => {
    // dispatch<any>(fetchNews()); // noticia do dia
    handleExtractUrl(data.results, setExtracted);
  }, [data.results]);
  console.log("extracted: ", extracted);

  if (loading) return <Loading size="5rem" type="spin" label="Carregando" />;

  if (error) return <Error size="5rem" label={`Erro ${error}`} />;

  return (
    <div className={styles.container}>
      <p className={styles.regulation}>{regulation}</p>
      <Search />
      {data.count ? (
        <div className={styles.table}>
          <Table
            title="Posts encontrados"
            data={extracted}
            columns={columns}
            setPage={setPage}
            page={page}
            total={data.count}
          />
        </div>
      ) : (
        <News className={styles.news} />
      )}
    </div>
  );
};

export default Home;
