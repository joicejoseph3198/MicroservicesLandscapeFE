import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authSlice from "./authSlice";

export const scheduleAuction = createAsyncThunk(
    "auction/schedule",
    async (params) => {
        try{
            const {requestBody, axiosInstance} = params;
            const response = await axiosInstance.post(`/auction/`, requestBody);
            return response?.data;
        }catch(error){
            console.log(error)
        }
    }
)

export const endAuction = createAsyncThunk(
    "auction/end",
    async (params) => {
        try{
            const {skuCode,axiosInstance} = params;
            const response = await axiosInstance.delete(`/auction/${skuCode}`);
            return response?.data;
        }catch(error){
            console.log(error)
        }
    }
)

export const fetchAuctionDetails = createAsyncThunk(
    "auction/details",
    async (params) => {
        try{
            const {skuCode, axiosInstance} = params;
            const response = await axiosInstance.get(`/auction/${skuCode}`); 
            return response?.data?.data;
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
        id: 0,
        productSkuCode: null,
        bidStartPrice: 0,
        buyNowPrice: 0,
        startTime: null,
        endTime: null,
        auctionStatus: null,
        highestBid: null
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
            state.id = 0;
            state.productSkuCode = "";
            state.bidStartPrice = 0;
            state.buyNowPrice = 0;
            state.startTime =null;
            state.endTime= null;
            state.auctionStatus = null;
            state.highestBid = null;
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
         builder.addCase(endAuction.rejected, (state)=>{
            state.state.isError = true;
         });
         builder.addCase(endAuction.pending, (state)=>{
             state.state.isLoading = true;
         });
         builder.addCase(endAuction.fulfilled, (state)=>{
             state.state.isError = false;
             state.state.isLoading = false;
        }); 
         builder.addCase(fetchAuctionDetails.rejected, (state)=>{
            state.state.isError = true;
         });
         builder.addCase(fetchAuctionDetails.pending, (state)=>{
             state.state.isLoading = true;
         });
         builder.addCase(fetchAuctionDetails.fulfilled, (state, action)=>{
             state.state.isError = false;
             state.state.isLoading = false;
             const apiResponse = action.payload;
             if(apiResponse){
                state.id = apiResponse.id;
                state.auctionStatus = apiResponse.auctionStatus;
                state.productSkuCode = apiResponse.productSkuCode;
                state.bidStartPrice = apiResponse.bidStartPrice;
                state.buyNowPrice = apiResponse.buyNowPrice;
                state.startTime = apiResponse.startTime;
                state.endTime = apiResponse.endTime;
                state.highestBid = apiResponse.highestBid;
             }
         }); 
    }
})
export const {updateField, resetFields} = auctionSlice.actions;
export default auctionSlice.reducer;