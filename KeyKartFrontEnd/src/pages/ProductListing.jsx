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

  // USE THIS AS DUMMY DATA IF NEEDED

  // const data = [
	// 	{
	// 		"productName": "OPAL Base 65 Keyboard",
	// 		"productDescription": "65% COMPACT FORM FACTOR (includes arrow keys)\n\nPC FRAME\n\nHOT SWAPPABLE\n\nKEYCAPS\n\nALUMINUM PLATE\n\nDUAL SILICONE DAMPENING FOAM\n\nSIDE \"NINJA\" PRINT LETTERING\n\nSILENT GLACIER SWITCHES\n\nFULL CUSTOMIZABLE RGB LIGHTING\n\nMACRO PROGRAMMING\n\nUSB-C DETACHABLE CONNECTION\n",
	// 		"brandName": "HIGHGROUND",
	// 		"modelNumber": "OB65K",
	// 		"switches": "MXRED",
	// 		"keyCaps": "MDA",
	// 		"layout": "QWERTY",
	// 		"category": "SIXTYFIVE",
	// 		"skuCode": "ee7e2e",
	// 		"weight": 0.695,
	// 		"size": {
	// 			"length": 12.2,
	// 			"breadth": 4.3,
	// 			"height": 1.5
	// 		},
	// 		"buyNowPrice": 18000,
	// 		"bidStartPrice": 8700,
	// 		"status": "UNPUBLISHED",
	// 		"productImages": [
	// 			"https://vkoqiqkoixdhweekdqmv.supabase.co/storage/v1/object/public/KeyBidsBucket/7b19aed4-3b83-4198-803a-ac13fa0b7e4d",
	// 			"https://vkoqiqkoixdhweekdqmv.supabase.co/storage/v1/object/public/KeyBidsBucket/df3bf440-cac9-4cfd-89e4-164107fbf24c",
	// 			"https://vkoqiqkoixdhweekdqmv.supabase.co/storage/v1/object/public/KeyBidsBucket/f522f258-631f-44d0-98c0-ddeebabb3f51"
	// 		]
	// 	},
	// 	{
	// 		"productName": "BLACKICE Base 65 Keyboard",
	// 		"productDescription": "\n\n65% COMPACT FORM FACTOR (includes arrow keys)\n\nABS FRAME\n\nHOT SWAPPABLE\n\nKEYCAPS\n\nALUMINUM PLATE\n\nDUAL SILICONE DAMPENING FOAM\n\nSIDE \"NINJA\" PRINT LETTERING\n\nWHITE FLAME SWITCHES (HIGROUND AND TTC CO-DESIGNED)\n\nFULL CUSTOMIZABLE RGB LIGHTING\n\nMACRO PROGRAMMING\n\nUSB-C DETACHABLE CONNECTION\n",
	// 		"brandName": "HighGround",
	// 		"modelNumber": "BIB65K",
	// 		"switches": "MXSILVER",
	// 		"keyCaps": "XDA",
	// 		"layout": "QWERTY",
	// 		"category": "SIXTYFIVE",
	// 		"skuCode": "d4ae3e",
	// 		"weight": 0.7,
	// 		"size": {
	// 			"length": 12.2,
	// 			"breadth": 4.1,
	// 			"height": 1.75
	// 		},
	// 		"buyNowPrice": 12500,
	// 		"bidStartPrice": 8000,
	// 		"status": "UNPUBLISHED",
	// 		"productImages": [
	// 			"https://vkoqiqkoixdhweekdqmv.supabase.co/storage/v1/object/public/KeyBidsBucket/03a4e216-fff2-4db6-ad0d-6f53a77001d3",
	// 			"https://vkoqiqkoixdhweekdqmv.supabase.co/storage/v1/object/public/KeyBidsBucket/c613defc-3af3-4ba3-9585-3709d349f0cc",
	// 			"https://vkoqiqkoixdhweekdqmv.supabase.co/storage/v1/object/public/KeyBidsBucket/e79924eb-5a3c-4640-ad74-f9ebab746a02"
	// 		]
	// 	},
	// 	{
	// 		"productName": "AOT2 x HG Base 65 Keyboard - TITAN MEETUP",
	// 		"productDescription": "\n\n65% COMPACT FORM FACTOR (includes arrow keys)\n\nTRANSLUCENT BASE: PC\n\nOPAQUE BASE: ABS\n\nHOT SWAPPABLE\n\nPBT DYE-SUB KEYCAPS\n\nALUMINUM PLATE\n\nDUAL SILICONE DAMPENING FOAM\n\nSIDE \"NINJA\" PRINT LETTERING\n\nPRE-LUBED TTC TITAN HEART SWITCHES\n\nFULL CUSTOMIZABLE RGB LIGHTING\n\nMACRO PROGRAMMING\n\nUSB-C DETACHABLE CONNECTION\n",
	// 		"brandName": "HighGround",
	// 		"modelNumber": "AOTB65TM",
	// 		"switches": "GRED",
	// 		"keyCaps": "DSA",
	// 		"layout": "QWERTY",
	// 		"category": "SIXTYFIVE",
	// 		"skuCode": "d65b75",
	// 		"weight": 2.72,
	// 		"size": {
	// 			"length": 12.38,
	// 			"breadth": 4.48,
	// 			"height": 0.76
	// 		},
	// 		"buyNowPrice": 24500,
	// 		"bidStartPrice": 12750,
	// 		"status": "UNPUBLISHED",
	// 		"productImages": [
	// 			"https://vkoqiqkoixdhweekdqmv.supabase.co/storage/v1/object/public/KeyBidsBucket/9c764cf6-6ba1-4d98-bacf-9144dc1ba257",
	// 			"https://vkoqiqkoixdhweekdqmv.supabase.co/storage/v1/object/public/KeyBidsBucket/8c8f9b25-b977-4659-8003-0b3113978219",
	// 			"https://vkoqiqkoixdhweekdqmv.supabase.co/storage/v1/object/public/KeyBidsBucket/62cf821c-024e-4251-a329-f0122de0c3ac"
	// 		]
	// 	},
	// 	{
	// 		"productName": "Sonic x Higround Dreamcast Keyboard",
	// 		"productDescription": "An official collaboration celebrating the innovators that created the Dreamcast.\n\n65% COMPACT FORM FACTOR (includes arrow keys)\n\nABS FRAME\n\nHOT SWAPPABLE\n\nPBT DYE-SUB KEYCAPS\n\nALUMINUM PLATE\n\nDUAL SILICONE DAMPENING FOAM\n\nSIDE \"NINJA\" PRINT LETTERING\n\nTTC SPEED SILVER SWITCHES\n\nFULL CUSTOMIZABLE RGB LIGHTING\n\nMACRO PROGRAMMING\n\nUSB-C DETACHABLE CONNECTION\n",
	// 		"brandName": "DreamCast",
	// 		"modelNumber": "SXHDK",
	// 		"switches": "MXGREEN",
	// 		"keyCaps": "DSA",
	// 		"layout": "QWERTY",
	// 		"category": "SIXTYFIVE",
	// 		"skuCode": "3e2c07",
	// 		"weight": 1.12,
	// 		"size": {
	// 			"length": 12.1,
	// 			"breadth": 4.3,
	// 			"height": 1
	// 		},
	// 		"buyNowPrice": 18999,
	// 		"bidStartPrice": 8999,
	// 		"status": "UNPUBLISHED",
	// 		"productImages": [
	// 			"https://vkoqiqkoixdhweekdqmv.supabase.co/storage/v1/object/public/KeyBidsBucket/09d5ffd0-be01-469c-a3e0-f92a44ee6260",
	// 			"https://vkoqiqkoixdhweekdqmv.supabase.co/storage/v1/object/public/KeyBidsBucket/ca3ce040-c817-4da3-89e3-6e781317e975",
	// 			"https://vkoqiqkoixdhweekdqmv.supabase.co/storage/v1/object/public/KeyBidsBucket/c7b23f14-ee20-4533-987c-39853383cf2a"
	// 		]
	// 	},
	// 	{
	// 		"productName": "Minecraft Base 65 Keyboard - Blocky",
	// 		"productDescription": "\n\n65% COMPACT FORM FACTOR (includes arrow keys)\n\nTRANSLUCENT FRAME: PC\n\nOPAQUE FRAME: ABS\n\nHOT SWAPPABLE\n\nPBT DYE-SUB KEYCAPS\n\nALUMINUM PLATE\n\nDUAL SILICONE DAMPENING\n\nSIDE \"NINJA\" PRINT LETTERING\n\nPRE-LUBED TTC WHITE FLAME SWITCHES\n\nFULL CUSTOMIZABLE RGB LIGHTING\n\nMACRO PROGRAMMING\n\nUSB-C DETACHABLE CONNECTION\n\n",
	// 		"brandName": "MineCraft",
	// 		"modelNumber": "MB65KB",
	// 		"switches": "MXBLACK",
	// 		"keyCaps": "DSA",
	// 		"layout": "QWERTY",
	// 		"category": "SIXTYFIVE",
	// 		"skuCode": "ff7a25",
	// 		"weight": 1.6,
	// 		"size": {
	// 			"length": 12,
	// 			"breadth": 4.1,
	// 			"height": 1.4
	// 		},
	// 		"buyNowPrice": 45000,
	// 		"bidStartPrice": 20000,
	// 		"status": "UNPUBLISHED",
	// 		"productImages": [
	// 			"https://vkoqiqkoixdhweekdqmv.supabase.co/storage/v1/object/public/KeyBidsBucket/7fefbf67-afb0-4fbd-8d19-e030818c7b0d",
	// 			"https://vkoqiqkoixdhweekdqmv.supabase.co/storage/v1/object/public/KeyBidsBucket/5802718f-8e92-410a-82ea-1b34c45179c0",
	// 			"https://vkoqiqkoixdhweekdqmv.supabase.co/storage/v1/object/public/KeyBidsBucket/6df54171-b5d6-49bb-8f8d-1c25d084060f"
	// 		]
	// 	},
	// 	{
	// 		"productName": "CELSHADE Base 65 Keyboard - GRAY",
	// 		"productDescription": "\n\n65% COMPACT FORM FACTOR (includes arrow keys)\n\nABS FRAME\n\nHOT SWAPPABLE\n\nPBT DYE-SUB KEYCAPS\n\nALUMINUM PLATE\n\nDUAL SILICONE DAMPENING\n\nSIDE PRINT LETTERING\n\nPRE-LUBED TTC VENUS SWITCHES\n\nFULL CUSTOMIZABLE RGB LIGHTING\n\nMACRO PROGRAMMING\n\nUSB-C DETACHABLE CONNECTION\n",
	// 		"brandName": "GRAFX Program",
	// 		"modelNumber": "CB65KG",
	// 		"switches": "MXBLACK",
	// 		"keyCaps": "DSA",
	// 		"layout": "QWERTY",
	// 		"category": "SIXTYFIVE",
	// 		"skuCode": "3fde9d",
	// 		"weight": 1.2,
	// 		"size": {
	// 			"length": 12.2,
	// 			"breadth": 4.2,
	// 			"height": 3
	// 		},
	// 		"buyNowPrice": 17000,
	// 		"bidStartPrice": 5700,
	// 		"status": "UNPUBLISHED",
	// 		"productImages": [
	// 			"https://vkoqiqkoixdhweekdqmv.supabase.co/storage/v1/object/public/KeyBidsBucket/e2f344b3-ee29-4665-98bf-a251e4fef5d2",
	// 			"https://vkoqiqkoixdhweekdqmv.supabase.co/storage/v1/object/public/KeyBidsBucket/a9fe4812-eea1-4969-bdde-1140705709c6",
	// 			"https://vkoqiqkoixdhweekdqmv.supabase.co/storage/v1/object/public/KeyBidsBucket/e52ed878-0d9f-45e8-a316-06e447ed605e"
	// 		]
	// 	},
	// 	{
	// 		"productName": "Brain Dead  Base 65 Keyboard",
	// 		"productDescription": "\n\n65% COMPACT FORM FACTOR (includes arrow keys)\n\nABS FRAME\n\nHOT SWAPPABLE\n\nPBT DYE-SUB KEYCAPS\n\nALUMINUM PLATE\n\nDUAL SILICONE DAMPENING FOAM\n\nSIDE \"NINJA\" PRINT LETTERING\n\nWHITE FLAME SWITCHES (HIGROUND AND TTC CO-DESIGNED)\n\nFULL CUSTOMIZABLE RGB LIGHTING\n\nMACRO PROGRAMMING\n\nUSB-C DETACHABLE CONNECTION\n",
	// 		"brandName": "BrainDead",
	// 		"modelNumber": "BDB65K",
	// 		"switches": "MXSILVER",
	// 		"keyCaps": "PBT",
	// 		"layout": "QWERTY",
	// 		"category": "SIXTYFIVE",
	// 		"skuCode": "f3a717",
	// 		"weight": 0.89,
	// 		"size": {
	// 			"length": 12.5,
	// 			"breadth": 4.6,
	// 			"height": 2.7
	// 		},
	// 		"buyNowPrice": 32000,
	// 		"bidStartPrice": 16000,
	// 		"status": "UNPUBLISHED",
	// 		"productImages": [
	// 			"https://vkoqiqkoixdhweekdqmv.supabase.co/storage/v1/object/public/KeyBidsBucket/fd536fe1-85bd-4281-bfcb-ff406dea45c0",
	// 			"https://vkoqiqkoixdhweekdqmv.supabase.co/storage/v1/object/public/KeyBidsBucket/d154653c-aad5-419a-abc1-e1d9119791b2",
	// 			"https://vkoqiqkoixdhweekdqmv.supabase.co/storage/v1/object/public/KeyBidsBucket/6ba8bc09-e1a1-49bd-b3eb-1b150e5959dd"
	// 		]
	// 	},
	// 	{
	// 		"productName": "2020 Ducky Year Of The Rat",
	// 		"productDescription": "Ducky’s First Hot swappable premium keyboard\nIncludes exclusive year of the rat Mouse Pad\nGerman made Cherry MX keys for tactile feedback.\nRGB back-light keyboard.\nPBT double-shot seamless keycaps for perfect use in home, office & gaming.\nComes with detachable USB Type-C cable\nDye-sublimation techniques featuring various graffiti elements\n3 level angle adjustment keyboard stand",
	// 		"brandName": "Ducky",
	// 		"modelNumber": "DKYOTR2020",
	// 		"switches": "MXSILENTRED",
	// 		"keyCaps": "PBT",
	// 		"layout": "QWERTY",
	// 		"category": "SIXTYFIVE",
	// 		"skuCode": "8e5eb3",
	// 		"weight": 0.593,
	// 		"size": {
	// 			"length": 12,
	// 			"breadth": 4.13,
	// 			"height": 1.4
	// 		},
	// 		"buyNowPrice": 75000,
	// 		"bidStartPrice": 30000,
	// 		"status": "UNPUBLISHED",
	// 		"productImages": [
	// 			"https://vkoqiqkoixdhweekdqmv.supabase.co/storage/v1/object/public/KeyBidsBucket/ac085e5f-bef6-4508-8cff-46740685e1e9",
	// 			"https://vkoqiqkoixdhweekdqmv.supabase.co/storage/v1/object/public/KeyBidsBucket/d4cc8e2c-2ea4-420f-8f66-d828146f76d5",
	// 			"https://vkoqiqkoixdhweekdqmv.supabase.co/storage/v1/object/public/KeyBidsBucket/50ebf128-bea6-4856-9c5c-cc41f08f95d2"
	// 		]
	// 	}
	// ]

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
