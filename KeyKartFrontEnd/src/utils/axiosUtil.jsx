import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { createContext, useContext } from "react";

export const axiosContext = createContext(); // create a context
export const useAxios = () => useContext(axiosContext); // to use useAxios directly in the components

export const AxiosProvider = ({ children }) => {
  const { getAccessTokenSilently } = useAuth0();

  const axiosInstance = axios.create({
    baseURL: "https://localhost:30443",
    headers: {
      "Content-Type": "application/json",
    },
  });

  axiosInstance.interceptors.request.use(
    async (request) => {
      const accessToken = await getAccessTokenSilently();
      if (accessToken != null) {
        request.headers["Authorization"] = `Bearer ${accessToken}`;
      }
      return request;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
   (response) => response, // Directly return successful responses.
    async (error) => {
      const originalRequest = error.config;
      const status = error.response ? error.response.status : null;
      if (status === 401 && !originalRequest._retry) {
        originalRequest._retry = true; // Mark the request as retried to avoid infinite loops.
        try {
          const accessToken = await getAccessTokenSilently();
          axiosInstance.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${accessToken}`;
          return axiosInstance(originalRequest); // Retry the original request with the new access token.
        } catch (refreshError) {
          // Handle refresh token errors by clearing stored tokens and redirecting to the login page.
          console.error("Token refresh failed:", refreshError);
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error); // For all other errors, return the error as is.
    }
  );
  return (
    <axiosContext.Provider value={axiosInstance}>
      {children}
    </axiosContext.Provider>
  );
};

