import axios from "axios";
// const orderUrl="https://store-1-dmhc.onrender.com/api/order";
const orderUrl="http://localhost:5500/api/order";

export const addOrder = (order, token) => {
    return axios.post(`${orderUrl}`, order, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}