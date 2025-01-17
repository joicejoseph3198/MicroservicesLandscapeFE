import { Link, Outlet } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import SideBar from "../components/SideBar";

export const AdminSection = () => {
  return (
    <div className="flex flex-row relative w-full h-full text-stone-600">
      <div className="flex-auto w-9/12 p-1 sm:p-10 h-full">
        <SideBar/>
        <Outlet/>
      </div>
    </div>
  );
};
