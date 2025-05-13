import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { updatProduct, getProductById, addProduct } from '../api/productService'; // ייבוא addProduct

// Async Thunks
export const fetchProduct = createAsyncThunk(
    'products/fetchProduct',
    async ({ productId, token }, { rejectWithValue }) => {
        try {
            const response = await getProductById(productId, token);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateProductAsync = createAsyncThunk(
    'products/updateProduct',
    async ({ product, token }, { rejectWithValue }) => {
        try {
            const response = await updatProduct(product._id, product, token);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const addProductAsync = createAsyncThunk( // הוספת async thunk להוספת מוצר
    'products/addProduct',
    async ({ product, token }, { rejectWithValue }) => {
        try {
            const response = await addProduct(product, token);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const productSlice = createSlice({
    name: "products",
    initialState: {
        currentProduct: null,
        productList: [],
        status: 'idle',
        error: null
    },
    reducers: {
        setProductList: (state, action) => {
            state.productList = action.payload;
        },
        removeProductFromList: (state, action) => {
            state.productList = state.productList.filter(
                product => product._id !== action.payload
            );
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProduct.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProduct.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.currentProduct = action.payload;
            })
            .addCase(fetchProduct.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload ? action.payload.message : action.error.message;
            })
            .addCase(updateProductAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateProductAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const index = state.productList.findIndex(p => p._id === action.payload._id);
                if (index !== -1) {
                    state.productList[index] = action.payload;
                }
                state.currentProduct = action.payload;
            })
            .addCase(updateProductAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload ? action.payload.message : action.error.message;
            })
            .addCase(addProductAsync.pending, (state) => { // טיפול ב-addProductAsync
                state.status = 'loading';
            })
            .addCase(addProductAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.productList.push(action.payload); // הוספת המוצר לרשימה
            })
            .addCase(addProductAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload ? action.payload.message : action.error.message;
            });
    },
});

export const { removeProductFromList ,setProductList} = productSlice.actions;

export default productSlice.reducer;