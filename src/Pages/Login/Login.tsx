import React from "react";
import styles from "./Login.module.css";
import Input from "../../Components/Forms/Input";
import Button from "../../Components/Forms/Button";
import Error from "../../Components/Error/Error";
import Loading from "../../Components/Loading/Loading";

const Login = () => {
  const loading = false;
  const error = true;
  if (loading) return <Loading size="5rem" type="spin" label="Carregando" />;

  if (error) return <Error size="3rem" label={`Erro ${error}`} />;

  return (
    <div className={styles.container}>
      <form className={styles.loginForm}>
        <h2 className={styles.title}>Login</h2>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="username">
            Username:
          </label>
          <Input
            className={styles.input}
            type="text"
            id="username"
            name="username"
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="password">
            Password:
          </label>
          <Input
            className={styles.input}
            type="password"
            id="password"
            name="password"
          />
        </div>
        <a href="/forgot-password" className={styles.forgotPassword}>
          Forgot password?
        </a>
        <div className={styles.formGroup}>
          <Button className={styles.button} type="submit">
            Login
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
