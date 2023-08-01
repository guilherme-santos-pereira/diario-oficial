// import React, { useEffect, useState } from "react";
// import styles from "./Home.module.css";
// import Search from "../../Components/Search/Search";
// import News from "../../Components/News/News";
// import { useDispatch, useSelector } from "react-redux";
// import Table from "../../Components/Table/Table";
// import Loading from "../../Components/Loading/Loading";
// import Error from "../../Components/Error/Error";
// import { handleExtract, handleExtractUrl } from "../../Components/Helper";
// import { fetchAllPosts } from "../../Services/Slices/allPostsSlice";

// const Home = () => {
//   const dispatch = useDispatch();
//   const { data, loading, error } = useSelector(
//     (state: any) => state.publicSlice
//   );
//   const response  = useSelector(
//     (state: any) => state.allPostsSlice
//   );
//   const [page, setPage] = useState<number>(1);
//   const [extracted, setExtracted] = useState<any>([]);
//   const columns = [
//     { title: "Name", property: "fileName" },
//     { title: "Publicado", property: "date" },
//     { title: "Arquivo", property: "presigned_url" },
//   ];

//   const regulation =
//     "O Diário Oficial Eletrônico da Defensoria Pública do Estado de Santa Catarina é o instrumento oficial de publicação, divulgação e comunicação dos seus atos processuais e administrativos. Foi instituído pela Lei Complementar nº 805/202 de 1º de julho de 2022, e regulamentado pelos Atos DPG nº 059/2022, de 04 de outubro de 2022 e nº 072/2022, de 21 de novembro de 2022.";

//   useEffect(() => {
//     setPage(1);
//     handleExtractUrl(data.results, setExtracted);
//   }, [data.results]);

//   useEffect(() => {
//     dispatch<any>(fetchAllPosts(page.toString()));
//   }, [page]);

//   useEffect(() => {
//     if (data) {
//       setExtracted([]);
//       handleExtract(data.results, setExtracted);
//     }
//   }, [data]);

//   if (loading) return <Loading size="5rem" type="spin" label="Carregando" />;
//   if (error) return <Error size="5rem" label={`Erro ${error}`} />;

//   return (
//     <div className={styles.container}>
//       <p className={styles.regulation}>{regulation}</p>
//       <Search />
//       {data.count ? (
//         <div className={styles.table}>
//           <Table
//             title="Posts encontrados"
//             data={extracted}
//             columns={columns}
//             setPage={setPage}
//             page={page}
//             total={data.count}
//           />
//         </div>
//       ) : (
//         <div className={styles.table}>
//           <Table
//             title="Últimos diários"
//             columns={columns}
//             data={extracted}
//             setPage={setPage}
//             page={page}
//             total={data.count}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default Home;

import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import Search from "../../Components/Search/Search";
import News from "../../Components/News/News";
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
    { title: "Name", property: "fileName" },
    { title: "Publicado", property: "date" },
    { title: "Arquivo", property: "presigned_url" },
  ];

  const regulation =
    "O Diário Oficial Eletrônico da Defensoria Pública do Estado de Santa Catarina é o instrumento oficial de publicação, divulgação e comunicação dos seus atos processuais e administrativos. Foi instituído pela Lei Complementar nº 805/202 de 1º de julho de 2022, e regulamentado pelos Atos DPG nº 059/2022, de 04 de outubro de 2022 e nº 072/2022, de 21 de novembro de 2022.";

  useEffect(() => {
    setPage(1);
    handleExtractUrl(response.data?.results, setExtracted);
  }, [response.data?.results]);

  useEffect(() => {
    dispatch<any>(fetchAllPosts(page.toString()));
  }, [page]);

  useEffect(() => {
    if (allPostsResponse.data) {
      setExtracted([]);
      handleExtract(allPostsResponse.data.results, setExtracted);
    }
  }, [allPostsResponse.data]);
  console.log("extracted: ", extracted);

  if (response.loading || allPostsResponse.loading)
    return <Loading size="5rem" type="spin" label="Carregando" />;
  if (response.error || allPostsResponse.error)
    return (
      <Error
        size="5rem"
        label={`Erro ${response.error || allPostsResponse.error}`}
      />
    );

  return (
    <div className={styles.container}>
      <p className={styles.regulation}>{regulation}</p>
      <Search />
      {response.data.count ? (
        <div className={styles.table}>
          <Table
            title="Posts encontrados"
            data={extracted}
            columns={columns}
            setPage={setPage}
            page={page}
            total={response.data.count}
          />
        </div>
      ) : (
        <div className={styles.table}>
          <Table
            title="Últimos diários"
            data={extracted}
            columns={columns}
            setPage={setPage}
            page={page}
            total={allPostsResponse.data.count}
          />
        </div>
      )}
    </div>
  );
};

export default Home;
