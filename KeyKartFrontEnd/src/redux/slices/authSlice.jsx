import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState :{
        authenticated: false,
    },
    reducers:{
        setUserState: (state,action)=>{
            const {isAuthenticated} = action.payload;
            state.authenticated = isAuthenticated;
        }
    }
})
export const {setUserState} = authSlice.actions;
export default authSlice.reducer;