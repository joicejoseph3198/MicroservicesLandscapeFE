import { createBrowserRouter } from "react-router-dom";
import { PageLayout } from "../components/PageLayout";
import { Home } from "../pages/Home";
import { Dashboard } from "../pages/Dashboard";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <PageLayout/>,
      children: [ 
        {
          path: "",
          element: <Home/>,
        },
        {
          path: "profile",
          element: "",
        },
        {
          path:"my-orders",
          element: ""
        },
        {
          path:"dashboard",
          element: <Dashboard/>
        }
      ],
    },
  ]);