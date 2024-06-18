import { Outlet } from "react-router-dom"
import { Navbar } from "./Navbar"
import { Auth0Provider } from "@auth0/auth0-react";

export const PageLayout = () => {
    return (
    <Auth0Provider
    domain="dev-mqzx0ckhfl41mzxd.jp.auth0.com"
    clientId="E8VdjWcbW6Bc6ZjaVhAWMjzBIgk5xNYx"
    authorizationParams={{
    redirect_uri: window.location.origin,
    audience: "https://user-api",
    scope: "openid profile email"
    }}
    cacheLocation="localstorage"
    useRefreshTokens="true"
    >
        <Navbar/>
        <Outlet/>
    </Auth0Provider>
    )
};