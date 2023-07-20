import styles from "./Loading.module.css";
import ReactLoading from "react-loading";

interface iLoading {
  size: string;
  type: any;
  label?: string;
}

const Loading: React.FC<iLoading> = ({ size, type, label }) => {
  return (
    <div className={styles.container}>
      <ReactLoading type={type} color="#007dff" height={size} width={size} />
      {label && <p>{label}</p>}
    </div>
  );
};

export default Loading;
