import { useAuth0 } from "@auth0/auth0-react"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux";
import { setUserState } from "../redux/slices/authSlice";

export const Navbar = () => {
    const {loginWithRedirect, logout, getAccessTokenSilently, user, isAuthenticated} = useAuth0();
    const dispatch = useDispatch();
    const userToken = getAccessTokenSilently();

    console.log(user,isAuthenticated,getAccessTokenSilently())

    const handleLogin = async () => {
      await loginWithRedirect();
      if(isAuthenticated){
        const token =  userToken;
        const payload = {user, token, isAuthenticated}
        dispatch(setUserState(payload))
      }
    }

    const handleLogout = async () => {
      await logout({
        logoutParams: {
          returnTo: window.location.origin,
        }})
      const token = null;
      const payload = {user, token, isAuthenticated}
      console.log("Logout Payload:", payload)
      dispatch(setUserState(payload))
    }

    return(
        <div className="flex flex-row flex-wrap justify-between border-b-2 pb-2 border-black text-xl">
        <div className="text-2xl">
          <div className="font-black"> KeyBids &trade; </div>
        </div>
        <nav>
          <ul className="flex flex-wrap flex-row gap-2 content-center color-black">
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