import React, { useEffect } from "react";
import styles from "./News.module.css";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Loading/Loading";
import Error from "../Error/Error";

interface iNews {
  className?: any;
}

const News: React.FC<iNews> = ({ className }) => {
  const dispatch = useDispatch();
  // const {data, error, loading} = useSelector(state: any => state.newsSlice)

  useEffect(() => {
    // dispatch<any>(fetchNews())
  });

  const title = "TITULO";
  const description =
    "isso aqui é uma descricao de uma noticia do dia que ira atrair THOUSANDS of people how look for interessante Themen rund um den Tag seines Bezirks";

  const loading = false;
  const error = false;
  if (loading) {
    return <Loading size="5rem" type="spin" label="Carregando" />;
  }
  if (error) {
    return <Error size="3rem" label={`Erro ${error}`} />;
  }
  return (
    <div className={`${styles.container} ${className}`}>
      <div>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
};

export default News;
