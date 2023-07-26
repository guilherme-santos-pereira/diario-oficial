import React, { useEffect, useState } from "react";
import styles from "./Login.module.css";
import Input from "../../Components/Forms/Input";
import Button from "../../Components/Forms/Button";
import Error from "../../Components/Error/Error";
import Loading from "../../Components/Loading/Loading";
import { useDispatch, useSelector } from "react-redux";
import { fetchMe } from "../../Services/Slices/meSlice";
import { Navigate, redirect, useNavigate } from "react-router-dom";
import { isLoggedIn } from "../../Auth/auth";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const { data } = useSelector((state: any) => state.meSlice);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | any) => {
    const { name, value } = e.target;
    setForm((prev: any) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = () => {
    setForm({
      username: "",
      password: "",
    });
    dispatch<any>(fetchMe(form));
  };

  useEffect(() => {
    if (data.files) {
      isLoggedIn(true);
      navigate("/status");
    }
  }, [data.files]);

  const loading = false;
  const error = false;
  if (loading) return <Loading size="5rem" type="spin" label="Carregando" />;

  if (error) return <Error size="3rem" label={`Erro ${error}`} />;

  return (
    <div className={styles.container}>
      <div className={styles.loginForm}>
        <h2 className={styles.title}>Login</h2>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="username">
            Username:
          </label>
          <Input
            className={styles.input}
            id="username"
            name="username"
            onChange={handleChange}
            value={form.username}
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
            onChange={handleChange}
            value={form.password}
          />
        </div>
        <a href="/forgot-password" className={styles.forgotPassword}>
          Forgot password?
        </a>
        <div className={styles.formButton}>
          <Button className={styles.button} onClick={handleSubmit}>
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
