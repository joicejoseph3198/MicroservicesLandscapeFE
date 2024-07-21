import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Auth0Provider } from "@auth0/auth0-react";
import { AxiosProvider, useAxios } from "../utils/axiosUtil";

export const PageLayout = () => {
  const axiosInstance = useAxios();
  return (
    <Auth0Provider
      domain="dev-mqzx0ckhfl41mzxd.jp.auth0.com"
      clientId="E8VdjWcbW6Bc6ZjaVhAWMjzBIgk5xNYx"
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: "https://user-api",
        scope: "openid profile email refresh offline_access",
      }}
      cacheLocation="localstorage"
      useRefreshTokens="true"
    >
      <AxiosProvider>
        <Navbar />
        <Outlet />
      </AxiosProvider>
    </Auth0Provider>
  );
};
