import axios from "axios";
import { PATH } from "../PATH";
import {PostRequestBody} from "./Slices/postSlice";

const username = sessionStorage.getItem("username");
const password = sessionStorage.getItem("password");
const encodedCredentials = btoa(`${username}:${password}`);

export const defaultHeaders = {
    Authorization: "Basic " + encodedCredentials,
};

const services = {
    getMe: async (body: { username: string; password: string }) => {
        const headers =
            body.username && body.password
                ? {
                    Authorization: "Basic " + btoa(`${body.username}:${body.password}`),
                }
                : defaultHeaders;

        try {
            const response = await axios.get(PATH.base + "/all-files/", { headers });
            if (body.username && body.password) {
                sessionStorage.setItem("username", body.username);
                sessionStorage.setItem("password", body.password);
                sessionStorage.setItem(
                    "credentials",
                    btoa(`${body.username}:${body.password}`)
                );
            }
            return response.data;
        } catch (err) {
            console.log(err);
            throw err;
        }
    },

    doPost: async (body: FormData) => {
        console.log(body);
        const headers = username && password
            ? {
                Authorization: "Basic " + btoa(`${username}:${password}`),
            }
            : defaultHeaders;

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
