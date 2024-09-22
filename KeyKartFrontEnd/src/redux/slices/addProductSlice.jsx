import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { act } from "react";

export const createProduct = createAsyncThunk(
  "addProduct/createProduct",
  async (params) => {
    try {
      const { productData, axiosInstance } = params;
      const response = await axiosInstance.post(
        "/productComposite/configure/product",
        productData
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchProductDetails = createAsyncThunk(
    "addProduct/fetchDetails",
    async (params) => {
        try{
            const {id, axiosInstance} = params;
            const response = await axiosInstance.get(`/product/${id}`);
            return response;
        }catch(error){
            console.log(error)
        }
    }
)

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
  size: {
    length: 0,
    breadth: 0,
    height: 0,
  },
  weight: 0,
  bidStartPrice: 0,
  buyNowPrice: 0,
};

const addProductSlice = createSlice({
  name: "addProduct",
  initialState: defaultState,
  reducers: {
    addProductImages: (state, action) => {
      state.productImages = [...action.payload];
    },
    updateField: (state, action) => {
      const { name, value } = action.payload;
      const keys = name.split(".");
      if (keys.length > 1) {
        state[keys[0]][keys[1]] = value;
      } else {
        state[name] = value;
      }
    },
    resetForm: () => {
      return { ...defaultState };
    },
  },
  extraReducers:(builder) =>{
    builder.addCase(fetchProductDetails.fulfilled, (state, action) => {
      const productData = action.payload?.data?.data;
      console.log("PAYLOAD", action.payload.data.data)
      if (productData) {
        return {
          ...state,
          productName: productData.productName,
          productDescription: productData.productDescription,
          brandName: productData.brandName,
          modelNumber: productData.modelNumber,
          switches: productData.switches,
          keyCaps: productData.keyCaps,
          layout: productData.layout,
          productImages: productData.productImages,
          skuCode: productData.skuCode,
          category: productData.category,
          size: {
            length: productData.size?.length || 0,
            breadth: productData.size?.breadth || 0,
            height: productData.size?.height || 0,
          },
          weight: productData.weight || 0,
          bidStartPrice: productData.bidStartPrice || 0,
          buyNowPrice: productData.buyNowPrice || 0,
        };
      }
    });
}
  
});

export const { addProductImages, updateField, resetForm } =
  addProductSlice.actions;
export default addProductSlice.reducer;
