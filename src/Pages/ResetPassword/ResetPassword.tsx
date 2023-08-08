import { useState } from "react";
import Input from "../../Components/Forms/Input";
import styles from "./ResetPassword.module.css";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../Components/Forms/Button";
import { fetchResetPassword } from "../../Services/Slices/resetPassword";
import { handleKeyPress } from "../../Components/Helper";
import Snackbar from "../../Components/Snackbar/Snackbar";
import Loading from "../../Components/Loading/Loading";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState<any>({
    email: "",
  });
  const { error, loading } = useSelector((state: any) => state.resetPassword);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | any) => {
    const { name, value } = e.target;
    setForm((prev: any) => {
      if (Array.isArray(prev[name])) {
        return {
          ...prev,
          [name]: [...prev[name], value],
        };
      }
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = () => {
    dispatch<any>(fetchResetPassword(form));
  };

  if (loading)
    return (
      <div
        style={{
          display: "flex",
          height: "50vw",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Loading size="5rem" type="spin" />
      </div>
    );

  return (
    <div className={styles.container}>
      {error && <Snackbar type="resetError" />}
      <div
        className={styles.form}
        onKeyUp={(e) => handleKeyPress(e, handleSubmit, "Enter")}
      >
        <label className={styles.title}>Resetar senha:</label>
        <Input
          type="email"
          className={styles.input}
          placeholder="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
        <Button
          className={styles.button}
          onClick={handleSubmit}
          disabled={
            !(
              form.email.includes("@defensoria.sc.gov.br") ||
              form.email.includes("@defensoria.sc.def.br")
            )
          }
        >
          Enviar email
        </Button>
      </div>
    </div>
  );
};

export default ResetPassword;
