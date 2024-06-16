import { useAuth0 } from "@auth0/auth0-react"
import { Link } from "react-router-dom"

export const Navbar = () => {
    const {isAuthenticated,loginWithRedirect,logout} = useAuth0();
    return(
        <div className="flex flex-row flex-wrap justify-between border-b-2 pb-2 border-black text-md">
        <div className="text-xl">
          <div className="font-bold"> KeyKart &trade; </div>
        </div>
        <nav>
          <ul className="flex flex-wrap flex-row gap-2 content-center color-black">
            <li><Link to="">Home</Link> </li>
            <li><Link to="">Orders</Link></li>
            <li><Link to="">Profile</Link></li>
            <li>{isAuthenticated ?
            (<button onClick={logout}>Logout</button>):
            (<button onClick={loginWithRedirect}>Login</button>)}</li>
          </ul>
        </nav>
      </div>
    )
}