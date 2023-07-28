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
    getPublic: async (page: string) => {
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
            const response = await axios.post(PATH.base + "/do-post/", body, { headers });
            return response.data;
        } catch (err) {
            console.log(err);
            throw err;
        }
    },
};

export default services;
