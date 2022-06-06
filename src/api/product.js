import axios from "axios";
import { API_BASE_URL } from "@/config";

export const getProduct = (id) => {
    return axios
        .get(API_BASE_URL + `/api/products/` + id)
};