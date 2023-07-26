import axios from "axios";
import { PATH } from "../PATH";

const username = sessionStorage.getItem("username");
const password = sessionStorage.getItem("password");
const encodedCredentials = btoa(`${username}:${password}`);

export const defaultHeaders = {
  headers: {
    Authorization: "Basic " + encodedCredentials,
  },
};

const services = {
  getMe: async (body: { username: string; password: string }) => {
    const headers =
      body.username && body.password
        ? {
            Authorization: "Basic " + btoa(`${body.username}:${body.password}`),
          }
        : defaultHeaders;
    return axios
      .get(PATH.base + "/all-files/", defaultHeaders)
      .then((data: any) => {
        if (body.username && body.password) {
          sessionStorage.setItem("username", body.username);
          sessionStorage.setItem("password", body.password);
          sessionStorage.setItem(
            "credentials",
            btoa(`${body.username}:${body.password}`)
          );
        }
        return data;
      })
      .catch((err: any) => console.log(err));
  },
  postDiary: async (body: {
    file: any;
    post_type: string;
    date: string;
    hour: string;
    number: string;
  }) => {
    body.date = "25-08-2023";
    body.post_type = "Ato,Normativa";
    console.log("body: ", body);
    console.log("defaultHeaders: ", defaultHeaders);
    return axios
      .post(PATH.base + "/do-post/", body, defaultHeaders)
      .then((data: any) => {
        return data;
      })
      .catch((err: any) => console.log(err));
  },
};

export default services;
