import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const createProduct = createAsyncThunk(
    "addProduct/createProduct",
    async (params) => {
        try{
            const {productData, axiosInstance} = params;
            const response = await axiosInstance.post("/productComposite/configure/product", productData)
            return response;
        }catch(error){
            console.log(error);
        }
    });

const defaultState = {
    productName: "",
    productDescription: "",
    brandName: "",
    modelNumber: "",
    switches: "",
    keyCaps: "",
    layout: "",
    productImages: [],
    skuCode: "",
    category: "",
    size:{
        length: 0,
        breadth: 0,
        height: 0,
    },
    weight: 0,
    bidStartPrice: 0,
    buyNowPrice: 0,
}

const addProductSlice = createSlice({
    name: "addProduct",
    initialState: defaultState,
    reducers:{
        addProductImages:(state,action) => {
            state.productImages = [...action.payload];
        },
        updateField: (state,action) => {
            const {name,value} = action.payload;
            const keys = name.split('.');
            if (keys.length > 1) {
                state[keys[0]][keys[1]] = value;
            } else {
                state[name] = value;
            }
        },
        resetForm: () => {
            return {...defaultState};
        }
    }
})


export const {addProductImages,updateField,resetForm} = addProductSlice.actions;
export default addProductSlice.reducer;