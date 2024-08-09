import { createSlice } from "@reduxjs/toolkit";


const shopSlice = createSlice({
    name: "shop",
    initialState :{
        biddingModalOpen: false,
    },
    reducers:{
        toggleBiddingModal: (state) => {
            state.biddingModalOpen = !state.biddingModalOpen;
        },
    }
})
export const {toggleBiddingModal} = shopSlice.actions;
export default shopSlice.reducer;