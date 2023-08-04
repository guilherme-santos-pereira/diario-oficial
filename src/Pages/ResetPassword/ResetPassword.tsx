import { useState } from "react";
import Input from "../../Components/Forms/Input";
import styles from "./ResetPassword.module.css";
import { useDispatch } from "react-redux";
import Button from "../../Components/Forms/Button";
import { fetchResetPassword } from "../../Services/Slices/resetPassword";
import { handleKeyPress } from "../../Components/Helper";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState<any>({
    email: "",
  });

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

  return (
    <div className={styles.container}>
      <div
        className={styles.form}
        onKeyUp={(e) => handleKeyPress(e, handleSubmit, "Enter")}
      >
        <label className={styles.title}>Resetar senha:</label>
        <Input
          className={styles.input}
          placeholder="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
        <Button className={styles.button} onClick={handleSubmit}>
          Enviar email
        </Button>
      </div>
    </div>
  );
};

export default ResetPassword;
