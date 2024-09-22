import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authSlice from "./authSlice";

export const scheduleAuction = createAsyncThunk(
    "auction/schedule",
    async (params) => {
        try{
            const {requestBody, axiosInstance} = params;
            const response = await axiosInstance.post(`/auction/`, requestBody);
            return response;
        }catch(error){
            console.log(error)
        }
    }
)

export const fetchAuctionDetails = createAsyncThunk(
    "auction/schedule",
    async (params) => {
        try{
            const {skuCode, axiosInstance} = params;
            const response = await axiosInstance.post(`/auction/`, requestBody);
            return response;
        }catch(error){
            console.log(error)
        }
    }
)

const auctionSlice = createSlice({
    name: "auction",
    initialState :{
        state:{
            isError: false,
            isLoading: false
        },
        productSkuCode: null,
        bidStartPrice: 0,
        buyNowProce:0,
        startTime:null,
        endTime:null
    },
    reducers:{
        updateField: (state, action) => {
            const { name, value } = action.payload;
            const keys = name.split(".");
            if (keys.length > 1) {
              state[keys[0]][keys[1]] = value;
            } else {
              state[name] = value;
            }
        },
        resetFields: (state) => {
            state.state = {
                isError: false,
                isLoading: false
            }
            state.productSkuCode = null,
            state.bidStartPrice = 0,
            state.buyNowProce = 0,
            state.startTime =null,
            state.endTime= null;
        }
    },
    extraReducers:(builder) =>{
        builder.addCase(scheduleAuction.rejected, (state)=>{
            state.state.isError = true;
         });
         builder.addCase(scheduleAuction.pending, (state)=>{
             state.state.isLoading = true;
         });
         builder.addCase(scheduleAuction.fulfilled, (state)=>{
             state.state.isError = false;
             state.state.isLoading = false;
         });
    }
})
export const {updateField} = auctionSlice.actions;
export default auctionSlice.reducer;