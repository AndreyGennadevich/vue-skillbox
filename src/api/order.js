import store from "@/store";
import axios from "axios";
import { API_BASE_URL } from "@/config";

export const getOrders = ({formData}) => {
  console.log(formData)
    return axios
              .post(API_BASE_URL + `/api/orders?userAccessKey=${store.state.userAccessKey}`, {
                ...formData,
              })
};