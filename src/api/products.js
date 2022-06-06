import { API_BASE_URL } from "@/config";
import axios from "axios";

export const getProducts = ({page, limit, categoryId, minPrice, maxPrice, colorId}) => {
    return axios
        .get( API_BASE_URL + `/api/products`, {
            params: {
                page,
                limit,
                categoryId,
                minPrice,
                maxPrice,
                colorId,
            },
        })
};

