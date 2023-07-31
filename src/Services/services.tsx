import axios, { AxiosRequestConfig } from "axios";
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
  getAllPosts: async (page: string) => {
    return axios
      .get(
        `${PATH.base}/all-posts/${page ? `?page=${page}` : ""}`,
        defaultHeaders
      )
      .then((data: any) => {
        return data;
      })
      .catch((err: any) => console.log(err));
  },
  doPost: async (body: FormData, username?: string, password?: string) => {
    const encodedCredentials = btoa(`${username}:${password}`);
    const headers: AxiosRequestConfig["headers"] = {};

    if (username && password) {
      headers.Authorization = "Basic " + encodedCredentials;
    } else {
      headers.Authorization = defaultHeaders.headers.Authorization;
    }

    try {
      const response = await axios.post(PATH.base + "/do-post/", body, {
        headers,
      });
      return response.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  getPublic: async (body: any) => {
    console.log("body: ", body);

    const queryString = [
      body.start_date && `start_date=${body.start_date}`,
      body.end_date && `end_date=${body.end_date}`,
      body.post_type &&
        Array.isArray(body.post_type) &&
        body.post_type.length > 0 &&
        body.post_type.map((type: string) => `post_type=${type}`),
      body.post_code &&
        Array.isArray(body.post_code) &&
        body.post_code.length > 0 &&
        body.post_code.map((code: string) => `post_code=${code}`),
      body.words &&
        Array.isArray(body.words) &&
        body.words.length > 0 &&
        body.words.map((word: string) => `words=${word}`),
      body.exact_words !== undefined && `exact_words=${body.exact_words}`,
    ]
      .filter(Boolean)
      .flat()
      .join("&");
    console.log("queryString: ", queryString);
    const url = `${PATH.base}/search-files/${
      queryString.length > 0 ? "?" + queryString : ""
    }`;
    return axios
      .get(url, defaultHeaders)
      .then((data: any) => {
        return data;
      })
      .catch((err: any) => console.log(err));
  },
};

export default services;
