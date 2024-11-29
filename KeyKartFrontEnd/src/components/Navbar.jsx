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
        <div className="text-slate-800 flex flex-row flex-wrap justify-between items-center border-b-2  border-black font-['NeueBit'] px-5">
        <div className="text-8xl py-1 mx-2">
          <div className="font-['Fuji']"> KEYBIDS.</div>
        </div>
        <nav className="p-5">
          <ul className="flex flex-row justify-center gap-2 color-black w-fit rounded-full border-2 p-1 border-slate-700 px-4 py-1.4 text-lg">
            <li><Link to="/">Home</Link> </li>
            <li><Link to="/shop">Shop</Link></li>
            <li><Link to="">Profile</Link></li>
            <li><Link to="admin-section">Dashboard</Link></li>
            <li>{ isAuthenticated ?
            (<button onClick={handleLogout}>Logout</button>):
            (<button onClick={handleLogin}>Login</button>)}</li>
          </ul>
        </nav>
      </div>
    )
}