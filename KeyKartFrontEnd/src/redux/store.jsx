import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import imageUploadSlice from "./slices/imageUploadSlice";
import addProductSlice from "./slices/addProductSlice";
import shopSlice from "./slices/shopSlice";
import auctionSlice from "./slices/auctionSlice";
import aggregationSlice from "./slices/aggregationSlice";
import bidSlice from "./slices/bidSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        imageUpload: imageUploadSlice,
        addProduct: addProductSlice,
        shop: shopSlice,
        auction: auctionSlice,
        aggregation: aggregationSlice,
        bid: bidSlice
    }
})