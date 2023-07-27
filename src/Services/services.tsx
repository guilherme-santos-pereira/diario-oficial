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
            headers: {
              Authorization:
                "Basic " + btoa(`${body.username}:${body.password}`),
            },
          }
        : defaultHeaders;
    console.log("headers:", headers);
    return axios
      .get(PATH.base + "/all-files/", headers)
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
  getPublic: async () => {
    return axios
      .get(PATH.base + "/all-posts/", defaultHeaders)
      .then((data: any) => {
        return data;
      })
      .catch((err: any) => console.log(err));
  },
};

export default services;
