import axios from "axios";
import { PATH } from "../../PATH";

const username = sessionStorage.getItem("username");
const password = sessionStorage.getItem("password");

export const options = {
  headers: {
    Authorization: "Basic " + btoa(`${username}:${password}`),
  },
};

const services = {
  getExample: async () => {
    return axios
      .get(PATH.base, options)
      .then((data: any) => {
        return data;
      })
      .catch((err: any) => console.log(err));
  },
};

export default services;
