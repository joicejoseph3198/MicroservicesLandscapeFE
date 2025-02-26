import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const placeBid = createAsyncThunk(
    "bid/place",
    async (params) => {
        try{
            const {requestBody, axiosInstance} = params;
            const response = await axiosInstance.post(`/auction/bid/place-bid`, requestBody);
            return response?.data;
        }catch(error){
            console.log(error)
        }
    }
)


const bidSlice = createSlice({
    name: "bid",
    initialState :{
        state:{
            isError: false,
            isLoading: false
        },
        user: null,
        auctionId: 0,
        amount:0,
        timestamp: 0,
        buyNowTriggered: false,
    },
    reducers:{
    },
    extraReducers:(builder) =>{
        builder.addCase(placeBid.rejected, (state)=>{
            state.state.isError = true;
         });
         builder.addCase(placeBid.pending, (state)=>{
             state.state.isLoading = true;
         });
         builder.addCase(placeBid.fulfilled, (state)=>{
             state.state.isError = false;
             state.state.isLoading = false;
         });
    }
})

export default bidSlice.reducer;