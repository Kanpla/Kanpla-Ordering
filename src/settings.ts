import axios from "axios";

/** The name of your app */
export const APP_NAME = "Kanpla";
/**
 * Your app's custom domain, **without** the tracing slash.
 * If you don't have a custom domain, please use `https://app.kanpla.dk`
 */
export const APP_URL = "https://app.kanpla.dk";
/** URL of the API endpoint, should usually stay as is */
export const API_URL = "https://api.kanpla.dk/api/v1/";
/** Kanpla will provide you with your custom partner ID */
export const API_KEY = "";
/** ID of your salesplace */
export const SALESPLACE_ID = "HgP9Pak8GLP3ZqolnLAY";
/** List of available meeting modules, you can find the IDs and names in Kanpla's Admin dashboard under Settings */
export const MODULES = [
  {
    key: "RmnzBtF8loAAhbzfDIzJ",
    text: "ORDER HERE",
  },
];

/** Function to call for information from Kanpla's API endpoints */
export const axiosGet = (endpoint: string) =>
  axios.get(`${API_URL}${endpoint}`, {
    headers: { Authorization: `Bearer ${API_KEY}` },
  });
