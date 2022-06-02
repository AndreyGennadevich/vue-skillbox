import axios from "axios";
import { API_BASE_URL } from "@/config";

export const getProductCategories = () => {
    return axios.get(API_BASE_URL + '/api/productCategories')
};