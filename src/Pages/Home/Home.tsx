import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import Search from "../../Components/Search/Search";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../Components/Table/Table";
import Error from "../../Components/Error/Error";
import {
  handleExtract,
  handleExtractUrl,
  handleResetResponse,
  regulation,
} from "../../Components/Helper";
import { fetchAllPosts } from "../../Services/Slices/allPostsSlice";
import { fetchPublic } from "../../Services/Slices/publicSlice";

const Home = () => {
  const dispatch = useDispatch();
  const response = useSelector((state: any) => state.publicSlice);
  const allPostsResponse = useSelector((state: any) => state.allPostsSlice);
  const [page, setPage] = useState<number>(1);
  const [backup, setBackup] = useState<any>({});
  const [isSearched, setIsSearched] = useState<boolean>(false);
  const [extracted, setExtracted] = useState<any>([]);
  const columns = [
    { title: "Edição", property: "edition" },
    { title: "Publicado", property: "date" },
    { title: "Arquivo", property: "presigned_url" },
  ];

  useEffect(() => {
    setExtracted([]);
    handleExtractUrl(response.data?.results, setExtracted);
  }, [response.data?.results]);

  useEffect(() => {
    if (!isSearched) {
      dispatch<any>(fetchAllPosts(page.toString(), false));
    }
  }, [dispatch, page, isSearched]);

  useEffect(() => {
    if (isSearched) dispatch<any>(fetchPublic(backup, page.toString()));
  }, [dispatch, page, isSearched, backup]);

  useEffect(() => {
    if (allPostsResponse.data) {
      setExtracted([]);
      handleExtract(allPostsResponse.data.results, setExtracted);
    }
  }, [dispatch, allPostsResponse.data]);

  if (response.error || allPostsResponse.error) {
    handleResetResponse();
    return (
      <Error size="5rem" label="Erro ao carregar a página. Tente novamente" />
    );
  }

  return (
    <div className={styles.container}>
      <p className={styles.regulation}>{regulation}</p>
      <Search setBackup={setBackup} setSearch={setIsSearched} />
      <div className={styles.table}>
        <Table
          title={isSearched ? "Diários encontrados" : "Últimos diários"}
          data={extracted}
          columns={columns}
          setPage={setPage}
          page={page}
          backup={backup}
          total={isSearched ? allPostsResponse.data.count : response.data.count}
        />
      </div>
    </div>
  );
};

export default Home;
