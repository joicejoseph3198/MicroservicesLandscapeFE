import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import imageUploadSlice from "./slices/imageUploadSlice";
import addProductSlice from "./slices/addProductSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        imageUpload: imageUploadSlice,
        addProduct: addProductSlice
    }
})