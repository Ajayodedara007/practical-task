import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'


export const getCategories = createAsyncThunk('mainSlice/getCategories', async () => {
    try {
        const res = await axios.get('http://192.168.251.242:5050/category');
        return res.data.data
    } catch (err) {
        console.error("API call failed:", err);
    }

})
export const getProducts = createAsyncThunk('mainSlice/getProducts', async () => {
    try {
        const res = await axios.get('http://192.168.251.242:5050/product');
        console.log("&&&&&&&&&&", res)
        return res.data.data.products
    } catch (err) {
        console.error("API call failed:", err);
    }

})
export const createProducts = createAsyncThunk('mainSlice/getProducts', async (data, { dispatch }) => {
    try {
        const res = await axios.post('http://192.168.251.242:5050/product', data);
        dispatch(getProducts())
        return res.data.data
    } catch (err) {
        console.error("API call failed:", err);
    }

})
export const deleteProduct = createAsyncThunk('mainSlice/deleteProduct', async (id, { dispatch }) => {
    try {
        const res = await axios.delete('http://192.168.251.242:5050/product/' + id);
        return res.data.data
    } catch (err) {
        console.error("API call failed:", err);
    }

})

export const mainSlice = createSlice({
    name: 'mainSlice',
    initialState: {
        category: [],
        products: []
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getCategories.fulfilled, (state, action) => {
            state.category = action.payload;
            return;
        });
        builder.addCase(getProducts.fulfilled, (state, action) => {
            console.log("action", action)
            state.products = action.payload;
            return;
        });

    }
})

export default mainSlice.reducer