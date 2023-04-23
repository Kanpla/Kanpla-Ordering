import axios from "axios";

export const APP_NAME = "Kanpla";

export const API_URL = "https://api.kanpla.dk/api/v1/";
export const API_KEY = "";

export const axiosGet = (endpoint: string) =>
  axios.get(`${API_URL}${endpoint}`, {
    headers: { Authorization: `Bearer ${API_KEY}` },
  });

export const SALESPLACE_ID = "HgP9Pak8GLP3ZqolnLAY";

export const MODULES = [
  {
    key: "RmnzBtF8loAAhbzfDIzJ",
    text: "ORDER HERE",
  },
];
