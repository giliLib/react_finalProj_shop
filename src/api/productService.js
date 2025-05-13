import axios from "axios";

//ייבוא מוצרים מהשרת
// const productUrl="https://store-1-dmhc.onrender.com/api/product";
const productUrl = "http://localhost:5500/api/product";

// שליפת כל המוצרים
export const getAllProducts = (category, numPage) => {
    return axios.get(`${productUrl}/${category}/?page=${numPage}&limit=12`);
};

export const getTotalPages = (category) => {
    return axios.get(`${productUrl}/total/${category}?limit=12`);
};
// שליפת מוצר ע"י קוד
export const getProductById = (id, token) => {
    return axios.get(`${productUrl}/getById/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};
// הוספת מוצר
export const addProduct = (product, token) => {
    return axios.post(`${productUrl}`, product, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};
// עדכון מוצר
export const updatProduct = (id, updatProduct, token) => {
    return axios.put(`${productUrl}/${id}`, updatProduct, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};
// מחיקת מוצר לפי קוד
export const deleteProductById = (id, token) => {
    return axios.delete(`${productUrl}/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};