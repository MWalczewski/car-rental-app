import axios from "axios";
import authHeader from "./auth-header";
import { JWT_LOGIN_URL } from "../../mock/URLs";

// const API_URL = "http://localhost:8080/api/test/";

export const getPublicContent = () => {
  return axios.get(JWT_LOGIN_URL + "/all");
};

export const getUserBoard = () => {
  return axios.get(JWT_LOGIN_URL + "/user", { headers: authHeader() });
};

export const getModeratorBoard = () => {
  return axios.get(JWT_LOGIN_URL + "/mod", { headers: authHeader() });
};

// export const getAdminBoard = () => {
//   return axios.get(API_URL + "admin", { headers: authHeader() });
// };

export const getAdminBoard = () => {
  return axios.get(JWT_LOGIN_URL + "/admin", { headers: authHeader() });
};
