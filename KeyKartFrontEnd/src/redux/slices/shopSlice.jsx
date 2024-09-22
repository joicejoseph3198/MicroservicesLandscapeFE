import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchCatalogue = createAsyncThunk(
    "shop/fetchCatalogue",
    async (params) => {
        try{
            const {requestBody, axiosInstance} = params;
            const response = await axiosInstance.post(`/product/fetchPage`, requestBody);
            return response;
        }catch(error){
            console.log(error)
        }
    }
  )

const shopSlice = createSlice({
    name: "shop",
    initialState :{
        biddingModalSku: null,
        modalType: null,
        bidAmount:0,
        catalogue:{
            isLoading: false,
            isError: false,
            page: null
        }
    },
    reducers:{
        setBiddingModalSku: (state,action) => {
            const {skuCode, modalType} = action.payload
            state.biddingModalSku = skuCode;
            state.modalType = modalType;
        },
        setBidAmount: (state,action) => {
            state.bidAmount = action.payload;
        }
    },
    extraReducers:(builder) =>{
        builder.addCase(fetchCatalogue.rejected, (state)=>{
            state.catalogue.isError = true;
         });
         builder.addCase(fetchCatalogue.pending, (state)=>{
             state.catalogue.isLoading = true;
         });
         builder.addCase(fetchCatalogue.fulfilled, (state,action)=>{
             state.catalogue.isError = false;
             state.catalogue.isLoading = false;
             state.catalogue.page = action.payload;
         });
    }
})
export const {setBiddingModalSku, setBidAmount} = shopSlice.actions;
export default shopSlice.reducer;