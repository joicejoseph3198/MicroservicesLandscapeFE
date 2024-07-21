import { useAuth0 } from "@auth0/auth0-react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { setUserState } from "../redux/slices/authSlice";
import { useEffect } from "react";

export const Navbar = () => {
    const {loginWithRedirect, logout, getAccessTokenSilently, user, isAuthenticated} = useAuth0();

    const handleLogin = async () => {
      await loginWithRedirect();
      if(isAuthenticated){
        const payload = {isAuthenticated}
        dispatch(setUserState(payload))
      }
    }

    const handleLogout = async () => {
      await logout({
        logoutParams: {
          returnTo: window.location.origin,
        }})
      const payload = {isAuthenticated}
      dispatch(setUserState(payload))
    }

    return(
        <div className="flex flex-row flex-wrap justify-between border-b-2 pb-2 border-black font-['NeueBit'] text-md p-2">
        <div className="text-3xl">
          <div className="font-black"> KeyBids&trade; </div>
        </div>
        <nav>
          <ul className="flex flex-wrap flex-row gap-2 content-center color-black w-fit rounded-full border border-slate-700 px-4 py-1.5 text-2xl">
            <li><Link to="/">Home</Link> </li>
            <li><Link to="">Orders</Link></li>
            <li><Link to="">Profile</Link></li>
            <li><Link to="dashboard">Dashboard</Link></li>
            <li>{ isAuthenticated ?
            (<button onClick={handleLogout}>Logout</button>):
            (<button onClick={handleLogin}>Login</button>)}</li>
          </ul>
        </nav>
      </div>
    )
}