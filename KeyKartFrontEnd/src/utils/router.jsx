import { createBrowserRouter } from "react-router-dom";
import { PageLayout } from "../components/PageLayout";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <PageLayout/>,
      children: [ 
        {
          path: "",
          element: "",
        },
        {
          path: "profile",
          element: "",
        },
        {
          path:"my-orders",
          element: ""
        }
      ],
    },
  ]);