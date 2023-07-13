import React from "react";
import styles from "./Login.module.css";
import Input from "../../Components/Forms/Input";

const Login = () => {
  return (
    <div className={styles.container}>
      <form className={styles.loginForm}>
        <h2 className={styles.title}>Login</h2>
        <div className={styles.formGroup}>
          <label htmlFor="username">Username:</label>
          <Input
            className={styles.input}
            type="text"
            id="username"
            name="username"
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password:</label>
          <Input
            className={styles.input}
            type="password"
            id="password"
            name="password"
          />
        </div>
        {/* <div className={styles.forgotPassword}> */}
        <a href="/forgot-password" className={styles.forgotPassword}>
          Forgot password?
        </a>
        {/* </div> */}
        <div className={styles.formGroup}>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
