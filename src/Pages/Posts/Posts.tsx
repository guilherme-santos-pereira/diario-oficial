import Table from "../../Components/Table/Table";
import styles from "./Posts.module.css";

const Posts = () => {
  const data = [
    {
      id: "27042002",
      status: "Diario de hoje",
      date: "11/07/2023",
      file: "Arquivo",
    },
    {
      id: "27042002",
      status: "Diario de hoje",
      date: "11/07/2023",
      file: "Arquivo",
    },
    {
      id: "27042002",
      status: "Diario de hoje",
      date: "11/07/2023",
      file: "Arquivo",
    },
  ];

  const columns = [
    { title: "ID", property: "id" },
    { title: "Status", property: "status" },
    { title: "Data", property: "date" },
    { title: "Arquivo", property: "file" },
  ];

  return (
    <div className={styles.content}>
      <div className={styles.table}>
        <Table title="Últimos diários" columns={columns} data={data} />
      </div>
    </div>
  );
};

export default Posts;
