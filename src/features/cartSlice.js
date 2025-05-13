import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const initialState = {
    arr: [],
    totalQtyProducts: 0,//כמות כוללת של פריטים
    totalPriceProducts: 0,//מחיר כולל של כל הפריטים
    totalSum: 0//כמות מוצרים
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        //פונקציה הוספה לסל קניות מוסיפה בכל פעם פריט אחד בלבד
        //  לאותו מוצר ואם כבר קיים מגדילה את הכמות בפריט
        addToCart: (state, action) => {
            let index = state.arr.findIndex(item => item._id == action.payload._id);
            if (index == -1) {
                let copy = { ...action.payload, qty: 1, totalPrice: action.payload.price };
                state.arr.push(copy);
                state.totalPriceProducts += action.payload.price;
                state.totalQtyProducts++;
                state.totalSum++;

            }
            //במקרה וכבר מוצר קיים מעלה את הכמות ומעדכן המחיר
            else {
                state.arr[index].qty++;
                state.arr[index].totalPrice = state.arr[index].qty * state.arr[index].price;
                state.totalPriceProducts += state.arr[index].price;
                state.totalQtyProducts++;

            }
        },
         //מוסיפה מוצר עם כמות פריטים מוגדרת מראש
         addToCartQty: (state, action) => {
            let index = state.arr.findIndex(item => item._id == action.payload._id);
            if (index == -1) {
                let copy = { ...action.payload,  totalPrice: action.payload.price * action.payload.qty };
                state.arr.push(copy);
                state.totalPriceProducts += copy.totalPrice;
                state.totalQtyProducts+=copy.qty;
                state.totalSum++;

            }
            //במקרה וכבר מוצר קיים מעלה את הכמות ומעדכן המחיר
            else {
                state.arr[index].qty+=action.payload.qty;
                state.arr[index].totalPrice = state.arr[index].qty * state.arr[index].price;
                state.totalPriceProducts += state.arr[index].price*action.payload.qty;
                state.totalQtyProducts+=action.payload.qty;

            }
        },
        //פונקציה להפחתת כמות ממוצר
        reduceQtyFromProduct: (state, action) => {
            let index = state.arr.findIndex(item => item._id == action.payload._id);
            if (index == -1)
                return;
            if (state.arr[index].qty == 1) {
                state.totalPriceProducts -= state.arr[index].price;
                state.totalQtyProducts--;
                state.totalSum--;
                state.arr.splice(index, 1);
               
            }
            else {
                state.arr[index].qty--;
                state.arr[index].totalPrice = state.arr[index].qty * state.arr[index].price;
                state.totalPriceProducts -= state.arr[index].price;
                state.totalQtyProducts--;
            }
        },
        //פונקצית הסרת מוצר מסל הקניות
        removeFromCart: (state, action) => {
            let index = state.arr.findIndex((item) => item._id == action.payload._id);
            if (index == -1) return;
            state.totalPriceProducts -= state.arr[index].totalPrice;
            state.totalQtyProducts -= state.arr[index].qty;
            state.totalSum--;
            state.arr.splice(index, 1);
        },
        //החזרת מחיר סופי וכמות פריטים כוללת וסהכ פריטים
        getFromCartPriceAndQty: (state) => {
            return {
                totalPriceProducts: state.totalPriceProducts,
                totalQtyProducts: state.totalQtyProducts,
                totalSum: state.totalSum
            };

        },
       

    }
})

export const { addToCart, removeFromCart,addToCartQty, reduceQtyFromProduct, getFromCartPriceAndQty } = cartSlice.actions;
export default cartSlice.reducer;
