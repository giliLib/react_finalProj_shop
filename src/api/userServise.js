import axios from "axios";
//ייבוא מוצרים מהרנדר
// const userUrl="https://store-1-dmhc.onrender.com/api/user/";
const userUrl = "http://localhost:5500/api/user";

// הוספת משתמש-הרשמה
export const addUser_signUp = (user) => {
    return axios.post(`${userUrl}/signup`, user, {
        // headers: {
        //     Authorization: `Bearer ${token}` // שימוש בפורמט Authorization header
        // }
    });
};
// התחברות
export const login = (userName, password) => {
    return axios.post(`${userUrl}/login`, { userName: userName, password });
};
// שליפת כל המשתמשים
export const getAllUser = (pageNum, token) => {
    return axios.get(`${userUrl}?page=${pageNum}&limit=2`, {
        headers: {
            Authorization: `Bearer ${token}` // שימוש בפורמט Authorization header
        }
    });
};