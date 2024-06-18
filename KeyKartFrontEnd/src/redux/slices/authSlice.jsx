import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState :{
        userInfo: null,
        userToken: null,
        authenticated: false,
    },
    reducers:{
        setUserState: (state,action)=>{
            const {user, isAuthenticated,token} = action.payload;
            state.userInfo = user;
            state.authenticated = isAuthenticated;
            state.userToken = token;
            console.log("state changed.")
        }
    }
})
export const {setUserState} = authSlice.actions;
export default authSlice.reducer;