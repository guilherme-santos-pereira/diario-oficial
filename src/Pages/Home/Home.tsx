import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import Search from "../../Components/Search/Search";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../Components/Table/Table";
import Loading from "../../Components/Loading/Loading";
import Error from "../../Components/Error/Error";
import { handleExtract, handleExtractUrl } from "../../Components/Helper";
import { fetchAllPosts } from "../../Services/Slices/allPostsSlice";

const Home = () => {
  const dispatch = useDispatch();
  const response = useSelector((state: any) => state.publicSlice);
  const allPostsResponse = useSelector((state: any) => state.allPostsSlice);
  const [page, setPage] = useState<number>(1);
  const [extracted, setExtracted] = useState<any>([]);
  const columns = [
    { title: "Edição", property: "edition" },
    { title: "Publicado", property: "date" },
    { title: "Arquivo", property: "presigned_url" },
  ];

  const regulation =
    "O Diário Oficial Eletrônico da Defensoria Pública do Estado de Santa Catarina é o instrumento oficial de publicação, divulgação e comunicação dos seus atos processuais e administrativos. Foi instituído pela Lei Complementar nº 805/202 de 1º de julho de 2022, e regulamentado pelos Atos DPG nº 059/2022, de 04 de outubro de 2022 e nº 072/2022, de 21 de novembro de 2022.";

  useEffect(() => {
    setPage(1);
    setExtracted([]);
    handleExtractUrl(response.data?.results, setExtracted);
  }, [response.data?.results]);

  useEffect(() => {
    dispatch<any>(fetchAllPosts(page.toString(), false));
  }, [page, dispatch]);

  useEffect(() => {
    if (allPostsResponse.data) {
      setExtracted([]);
      handleExtract(allPostsResponse.data.results, setExtracted);
    }
  }, [allPostsResponse.data, dispatch]);

  if (response.loading || allPostsResponse.loading)
    return <Loading size="5rem" type="spin" label="Carregando" />;
  if (response.error || allPostsResponse.error)
    return (
      <Error size="5rem" label="Erro ao carregar a página. Tente novamente" />
    );

  return (
    <div className={styles.container}>
      <p className={styles.regulation}>{regulation}</p>
      <Search />
      <div className={styles.table}>
        <Table
          title={response.data.count ? "Posts encontrados" : "Últimos diários"}
          data={extracted}
          columns={columns}
          setPage={setPage}
          page={page}
          total={
            response.data.count
              ? response.data.count
              : allPostsResponse.data.count
          }
        />
      </div>
    </div>
  );
};

export default Home;
