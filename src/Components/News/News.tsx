import React, { useEffect } from "react";
import styles from "./News.module.css";
import { useDispatch, useSelector } from "react-redux";

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
