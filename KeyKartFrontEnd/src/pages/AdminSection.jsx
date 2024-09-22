import { Link, Outlet } from "react-router-dom";
import SearchBar from "../components/SearchBar";

export const AdminSection = () => {
  return (
    <div className="flex min-h-screen text-stone-600">
      {/* <div className="flex-auto p-5 w-1/12 bg-gray-50 border-r-2 border-slate-300 top-5">
        <SearchBar />
        <div className="flex flex-col gap-5 pt-10 object-fit">
          <ul><Link to="/admin-section/">Configure Product</Link></ul>
          <ul><Link to="/admin-section/listing">Product Listing</Link></ul>
          <ul>Analytics</ul>
          <ul>Promotion</ul>
          <ul>Page Manager</ul>
        </div>
      </div> */}
      <div className="flex-auto w-9/12 p-1 sm:p-10">
      <Outlet/>
      </div>
    </div>
  );
};
