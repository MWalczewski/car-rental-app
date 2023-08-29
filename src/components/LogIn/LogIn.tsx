import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { useTranslation } from "react-i18next";
import { LoginData } from "../../types/types";
import * as yup from "yup";
import { ErrorMessage, Form, Formik } from "formik";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import { JWT_LOGIN_URL } from "../../mock/URLs";
import "./styles.css";

const Login = () => {
  const { setAuth } = useContext(AuthContext);
  const { t } = useTranslation();

  const navigate = useNavigate();

  const userLoginValidationSchema = yup.object().shape({
    username: yup.string().lowercase().required(t("Login is required!")),
    password: yup.string().required(t("Password is required!")),
  });

  const handleLogin = (values: LoginData) => {
    const username = values.username;
    const password = values.password;

    axios
      .post(JWT_LOGIN_URL, {
        username,
        password,
      })
      .then((response) => {
        console.log("response", response);
        localStorage.setItem(
          "login",
          JSON.stringify({
            userLogin: true,
            token: response.data.access_token,
          })
        );
        setAuth(true);
        navigate("/");
      });
  };

  const initialValues = {
    username: "",
    password: "",
  };

  return (
    <>
      <div className="login-container">
        <h1>{t("Log-In")}</h1>
        <Formik<LoginData>
          initialValues={initialValues}
          validationSchema={userLoginValidationSchema}
          onSubmit={(values) => handleLogin(values)}
        >
          {({ handleSubmit, values, handleChange }) => (
            <Form onSubmit={handleSubmit} className="form">
              <TextField
                className="text-field"
                label={t("Username")}
                type="text"
                name="username"
                placeholder="Username"
                value={values.username}
                onChange={handleChange}
              />
              <ErrorMessage name="username" />

              <TextField
                className="text-field"
                label={t("Password")}
                type="password"
                name="password"
                placeholder={t("Password")}
                value={values.password}
                onChange={handleChange}
              />
              <ErrorMessage name="password" />

              <Button className="button" type="submit" variant="contained">
                {t("Submit")}
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default Login;
