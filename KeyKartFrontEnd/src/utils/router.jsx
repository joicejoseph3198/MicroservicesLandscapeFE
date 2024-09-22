import { createBrowserRouter } from "react-router-dom";
import { PageLayout } from "../components/PageLayout";
import { Home } from "../pages/Home";
import { Dashboard } from "../pages/Dashboard";
import { AdminSection } from "../pages/AdminSection";
import { ProductListing } from "../pages/ProductListing";
import Shop from "../pages/Shop";

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
          path:"shop",
          element: <Shop/>
        },
        {
          path:"admin-section",
          element: <AdminSection/>,
          children:[
            {
              path:"/admin-section/:id?",
              element: <Dashboard/>
            },
            {
              path:"/admin-section/listing",
              element: <ProductListing/>
            }
          ]
        }
      ],
    },
  ]);