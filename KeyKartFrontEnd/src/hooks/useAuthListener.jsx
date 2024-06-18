import { useAuth0 } from "@auth0/auth0-react"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserState } from "../redux/slices/authSlice";


export const useAuthListener = () => {
    console.log("AuthListener called...")
    const {user,isAuthenticated,isLoading,getAccessTokenSilently,getIdTokenClaims} = useAuth0();
    const {token} = isAuthenticated && (getAccessTokenSilently() || null)

    const dispatch = useDispatch();

    /*TO BE REMOVED*/
    isAuthenticated && console.log(getIdTokenClaims())
   
    useEffect(()=>{
        const payload = {user,isAuthenticated,isLoading,token}
        dispatch(setUserState(payload))
    },[dispatch,isAuthenticated,isLoading,user,token])

    return {isLoading, isAuthenticated}
}