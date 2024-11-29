import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const aggregateDetails = createAsyncThunk(
  "aggregation/aggregateDetails",
  async (params) => {
    try {
      const { skuCode, axiosInstance } = params;
      const response = await axiosInstance.get(`/productComposite/${skuCode}`);
      return response.data; 
    } catch (error) {
      console.log(error);
    }
  }
);

const defaultState = {
  product: {},
  auction: {},
  review: [],
  isError: false,
  isLoading: false

};

const aggregationSlice = createSlice({
  name: "aggregation",
  initialState: defaultState,
  extraReducers:(builder) =>{
    builder.addCase(aggregateDetails.rejected, (state)=>{
        state.isError = true;
     });
     builder.addCase(aggregateDetails.pending, (state)=>{
        state.isLoading = true;
     });
    builder.addCase(aggregateDetails.fulfilled, (state, action) => {
        const aggregatedData = action.payload?.data; 
        console.log("aggregated data inside slice",aggregatedData)
        if (aggregatedData) {
            state.product = aggregatedData?.productDTO || {};
            state.auction = aggregatedData?.auctionDetailsDTO || {};
            state.review = aggregatedData?.reviewDTOList || [];
            state.isError = false;
            state.isLoading = false;
      }
    });
}
  
});

// export const {} = aggregationSlice.actions;
export default aggregationSlice.reducer;
