import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { MdArrowOutward } from "react-icons/md";
import { CustomButton } from "../components/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { fetchCatalogue } from "../redux/slices/shopSlice";
import { useAxios } from "../utils/axiosUtil";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Column Definitions
const columns = [
  {
    accessorKey: "skuCode",
    header: "SKU code",
    cell: (props) => <p>#{props.getValue().toUpperCase()}</p>,
  },
  {
    accessorKey: "modelNumber",
    header: "Model Number",
    cell: (props) => <p>{props.getValue()}</p>,
  },
  {
    accessorKey: "productName",
    header: "Product",
    cell: (props) => <p className="font-['MoriBold']">{props.getValue()}</p>,
  },
  {
    accessorKey: "switches",
    header: "Switch",
    cell: (props) => <p>{props.getValue()}</p>,
  },
  {
    accessorKey: "keyCaps",
    header: "Key Cap",
    cell: (props) => <p>{props.getValue()}</p>,
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: (props) => <p>{props.getValue()}</p>,
  },
  {
    accessorKey: "bidStartPrice",
    header: "Bid Start Price",
    cell: (props) => <p>Rs. {props.getValue()}</p>,
  },
  {
    accessorKey: "buyNowPrice",
    header: "Buy Now Price",
    cell: (props) => <p>Rs. {props.getValue()}</p>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (props)=> <p>{props.getValue()}</p>,
  },
  {
    accessorKey: "viewMore",
    header: "View Details",
    cell: <p className="text-xl text-center" title="Configure Details"><MdArrowOutward/></p>,
  },
  
];

export const ProductListing = () => {
  const shopData = useSelector((state) => state.shop); 
  const dispatch = useDispatch();
  const axiosInstance = useAxios();
  const navigate = useNavigate();

  const viewDetails = (cells) => {
    const skuCodeData = cells.find(cell => cell.column.id == "skuCode")
    if(skuCodeData?.getValue()){
      navigate(`/admin-section/${skuCodeData.getValue()}`)
    }
  }

  useEffect(()=>{
    const requestBody = {limit:10, offset:0}
      dispatch(fetchCatalogue({requestBody, axiosInstance}));
  },[axiosInstance,dispatch])

  const data = shopData?.catalogue?.page?.data?.content || [];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    enableColumnResizing: false,
  });
  return (
    <div className="w-full overflow-x-scroll">
      <p className="text-5xl lg:text-8xl text-left text-slate-700 font-['NeueBit'] py-4">Dashboard/Product Listing</p>
      {/* BUTTON ROW --START*/}
      <div className="relative flex flex-row gap-4 py-4">
      <CustomButton buttonText="All Products" color="blue"/>
      <CustomButton buttonText="Scheduled" color="white"/>
      <CustomButton buttonText="Live" color="white"/>
      <CustomButton buttonText="Sold" color="white"/>
      <CustomButton buttonText="Un-Sold" color="white"/>
      </div>
      {/* BUTTON ROW --END*/}
      <div className={`w-[${table.getTotalSize()}] rounded-md p-2 flex flex-col no-wrap justify-between w-full overflow-x-scroll border-2 text-md`}>
        {/* HEADER --START */}
        <div className={`w-[${table.getTotalSize()}] thead pb-1`}>
          {table.getHeaderGroups().map((headerGroup) => (
            <div
              key={headerGroup.id}
              className="flex flex-row no-wrap justify-between w-full overflow-x-scroll tr text-sm text-slate-700 font-['MoriBold']"
            >
              {headerGroup.headers.map((header) => (
                <div key={header.id} className={`w-full th p-5 border-b-2`} >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
        {/* HEADER --END */}
        {/* ROW --START */}
        <div>
          {table.getRowModel().rows.map((row) => (
            <div key={row.id} className="flex flex-row items-center text-sm justify-between hover:bg-blue-500 hover:text-white hover:hover:cursor-pointer"
             onClick={()=>viewDetails(row.getVisibleCells())}>
              {row.getVisibleCells().map((cell) => (
                <div key={cell.id} className={`w-full p-5`}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </div>
              ))}
            </div>
          ))}
        </div>
        {/* ROW --END */}
      </div>
    </div>
  );
};
