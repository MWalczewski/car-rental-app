import { useContext } from "react";
import { LoginContext } from "../../contexts/LoginContext";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Formik, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import { USERS_URL } from "../../mock/URLs";
import "./styles.css";
import { useAxiosGet } from "../../hooks/useAxiosGet";
import { LoginData, UsersData } from "../../types/types";

const LogIn = () => {
  const { loggedUser, setLoggedUser } = useContext(LoginContext);

  const [usersData] = useAxiosGet<UsersData[] | null>(`${USERS_URL}`, []);

  const navigate = useNavigate();

  const userLoginValidationSchema = yup.object().shape({
    login: yup.string().lowercase().required("Login is required!"),
    password: yup.string().required("Password is required!"),
  });

  const handleCorrectLogin = () => {
    alert("user logged in");
    setLoggedUser(true);
    navigate("/");
  };

  return (
    <>
      <div className="login-container">
        <h1>Log-In</h1>
        <Formik<LoginData>
          initialValues={{
            login: "",
            password: "",
          }}
          validationSchema={userLoginValidationSchema}
          onSubmit={(values) => {
            const loggingUser = usersData?.find((user) => {
              return user.login === values.login;
            });
            console.log(loggingUser);
            // eslint-disable-next-line no-lone-blocks
            {
              loggingUser?.login === values.login &&
              loggingUser?.password === values.password
                ? handleCorrectLogin()
                : alert("incorrect login or password!");
            }
          }}
        >
          {({ handleSubmit, values, handleChange }) => (
            <Form onSubmit={handleSubmit} className="form">
              <TextField
                className="text-field"
                label="Login"
                type="text"
                name="login"
                placeholder="login"
                value={values.login}
                onChange={handleChange}
              />
              <ErrorMessage name="login" />
              <TextField
                className="text-field"
                label="Password"
                type="password"
                name="password"
                placeholder="password"
                value={values.password}
                onChange={handleChange}
              />
              <ErrorMessage name="password" />
              <Button className="button" type="submit" variant="contained">
                SUBMIT
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default LogIn;
