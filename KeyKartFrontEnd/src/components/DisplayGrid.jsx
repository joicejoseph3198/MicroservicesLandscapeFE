import { fetchCatalogue, setBidAmount, setBiddingModalSku } from "../redux/slices/shopSlice";
import DisplayCard from "./DisplayCard";
import BiddingModal from "./BiddingModal";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import { useAxios } from "../utils/axiosUtil";

//   {
//     productName: "OPAL Base 65 Keyboard",
//     productDescription:
//       '65% COMPACT FORM FACTOR (includes arrow keys)\n\nPC FRAME\n\nHOT SWAPPABLE\n\nKEYCAPS\n\nALUMINUM PLATE\n\nDUAL SILICONE DAMPENING FOAM\n\nSIDE "NINJA" PRINT LETTERING\n\nSILENT GLACIER SWITCHES\n\nFULL CUSTOMIZABLE RGB LIGHTING\n\nMACRO PROGRAMMING\n\nUSB-C DETACHABLE CONNECTION\n',
//     brandName: "HIGHGROUND",
//     modelNumber: "OB65K",
//     connectivity: null,
//     switches: "MXRED",
//     keyCaps: "MDA",
//     layout: "QWERTY",
//     category: "SIXTYFIVE",
//     skuCode: "ee7e2e",
//     weight: 0.695,
//     size: {
//       length: 12.2,
//       breadth: 4.3,
//       height: 1.5,
//     },
//     buyNowPrice: 18000.0,
//     bidStartPrice: 8700.0,
//     productImages: [
//       "https://vkoqiqkoixdhweekdqmv.supabase.co/storage/v1/object/public/KeyBidsBucket/7b19aed4-3b83-4198-803a-ac13fa0b7e4d",
//       "https://vkoqiqkoixdhweekdqmv.supabase.co/storage/v1/object/public/KeyBidsBucket/df3bf440-cac9-4cfd-89e4-164107fbf24c",
//       "https://vkoqiqkoixdhweekdqmv.supabase.co/storage/v1/object/public/KeyBidsBucket/f522f258-631f-44d0-98c0-ddeebabb3f51",
//     ],
//   },
//   {
//     _id: {
//       $oid: "66a3aab1a50abd6232874dab",
//     },
//     skuCode: "d4ae3e",
//     brandName: "HighGround",
//     modelNumber: "BIB65K",
//     switches: "MXSILVER",
//     keyCaps: "XDA",
//     layout: "QWERTY",
//     category: "SIXTYFIVE",
//     productDescription:
//       '\n\n65% COMPACT FORM FACTOR (includes arrow keys)\n\nABS FRAME\n\nHOT SWAPPABLE\n\nKEYCAPS\n\nALUMINUM PLATE\n\nDUAL SILICONE DAMPENING FOAM\n\nSIDE "NINJA" PRINT LETTERING\n\nWHITE FLAME SWITCHES (HIGROUND AND TTC CO-DESIGNED)\n\nFULL CUSTOMIZABLE RGB LIGHTING\n\nMACRO PROGRAMMING\n\nUSB-C DETACHABLE CONNECTION\n',
//     productName: "BLACKICE Base 65 Keyboard",
//     weight: 0.699999988079071,
//     size: {
//       length: 12.199999809265137,
//       breadth: 4.099999904632568,
//       height: 1.75,
//     },
//     buyNowPrice: 12500,
//     bidStartPrice: 8000,
//     productImages: [
//       "https://vkoqiqkoixdhweekdqmv.supabase.co/storage/v1/object/public/KeyBidsBucket/03a4e216-fff2-4db6-ad0d-6f53a77001d3",
//       "https://vkoqiqkoixdhweekdqmv.supabase.co/storage/v1/object/public/KeyBidsBucket/c613defc-3af3-4ba3-9585-3709d349f0cc",
//       "https://vkoqiqkoixdhweekdqmv.supabase.co/storage/v1/object/public/KeyBidsBucket/e79924eb-5a3c-4640-ad74-f9ebab746a02",
//     ],
//     _class: "com.example.productservice.entity.Product",
//   },
//   {
//     productName: "AOT2 x HG Base 65 Keyboard - TITAN MEETUP",
//     productDescription:
//       '\n\n65% COMPACT FORM FACTOR (includes arrow keys)\n\nTRANSLUCENT BASE: PC\n\nOPAQUE BASE: ABS\n\nHOT SWAPPABLE\n\nPBT DYE-SUB KEYCAPS\n\nALUMINUM PLATE\n\nDUAL SILICONE DAMPENING FOAM\n\nSIDE "NINJA" PRINT LETTERING\n\nPRE-LUBED TTC TITAN HEART SWITCHES\n\nFULL CUSTOMIZABLE RGB LIGHTING\n\nMACRO PROGRAMMING\n\nUSB-C DETACHABLE CONNECTION\n',
//     brandName: "HighGround",
//     modelNumber: "AOTB65TM",
//     connectivity: null,
//     switches: "GRED",
//     keyCaps: "DSA",
//     layout: "QWERTY",
//     category: "SIXTYFIVE",
//     skuCode: "d65b75",
//     weight: 2.72,
//     size: {
//       length: 12.38,
//       breadth: 4.48,
//       height: 0.76,
//     },
//     buyNowPrice: 24500.0,
//     bidStartPrice: 12750.0,
//     productImages: [
//       "https://vkoqiqkoixdhweekdqmv.supabase.co/storage/v1/object/public/KeyBidsBucket/9c764cf6-6ba1-4d98-bacf-9144dc1ba257",
//       "https://vkoqiqkoixdhweekdqmv.supabase.co/storage/v1/object/public/KeyBidsBucket/8c8f9b25-b977-4659-8003-0b3113978219",
//       "https://vkoqiqkoixdhweekdqmv.supabase.co/storage/v1/object/public/KeyBidsBucket/62cf821c-024e-4251-a329-f0122de0c3ac",
//     ],
//   },
//   {
//     productName: "Sonic x Higround Dreamcast Keyboard",
//     productDescription:
//       'An official collaboration celebrating the innovators that created the Dreamcast.\n\n65% COMPACT FORM FACTOR (includes arrow keys)\n\nABS FRAME\n\nHOT SWAPPABLE\n\nPBT DYE-SUB KEYCAPS\n\nALUMINUM PLATE\n\nDUAL SILICONE DAMPENING FOAM\n\nSIDE "NINJA" PRINT LETTERING\n\nTTC SPEED SILVER SWITCHES\n\nFULL CUSTOMIZABLE RGB LIGHTING\n\nMACRO PROGRAMMING\n\nUSB-C DETACHABLE CONNECTION\n',
//     brandName: "DreamCast",
//     modelNumber: "SXHDK",
//     connectivity: null,
//     switches: "MXGREEN",
//     keyCaps: "DSA",
//     layout: "QWERTY",
//     category: "SIXTYFIVE",
//     skuCode: "3e2c07",
//     weight: 1.12,
//     size: {
//       length: 12.1,
//       breadth: 4.3,
//       height: 1.0,
//     },
//     buyNowPrice: 18999.0,
//     bidStartPrice: 8999.0,
//     productImages: [
//       "https://vkoqiqkoixdhweekdqmv.supabase.co/storage/v1/object/public/KeyBidsBucket/c7b23f14-ee20-4533-987c-39853383cf2a",
//       "https://vkoqiqkoixdhweekdqmv.supabase.co/storage/v1/object/public/KeyBidsBucket/ca3ce040-c817-4da3-89e3-6e781317e975",
//       "https://vkoqiqkoixdhweekdqmv.supabase.co/storage/v1/object/public/KeyBidsBucket/09d5ffd0-be01-469c-a3e0-f92a44ee6260",
//     ],
//   },
//   {
//     productName: "Minecraft Base 65 Keyboard - Blocky",
//     productDescription:
//       '\n\n65% COMPACT FORM FACTOR (includes arrow keys)\n\nTRANSLUCENT FRAME: PC\n\nOPAQUE FRAME: ABS\n\nHOT SWAPPABLE\n\nPBT DYE-SUB KEYCAPS\n\nALUMINUM PLATE\n\nDUAL SILICONE DAMPENING\n\nSIDE "NINJA" PRINT LETTERING\n\nPRE-LUBED TTC WHITE FLAME SWITCHES\n\nFULL CUSTOMIZABLE RGB LIGHTING\n\nMACRO PROGRAMMING\n\nUSB-C DETACHABLE CONNECTION\n\n',
//     brandName: "MineCraft",
//     modelNumber: "MB65KB",
//     connectivity: null,
//     switches: "MXBLACK",
//     keyCaps: "DSA",
//     layout: "QWERTY",
//     category: "SIXTYFIVE",
//     skuCode: "ff7a25",
//     weight: 1.6,
//     size: {
//       length: 12.0,
//       breadth: 4.1,
//       height: 1.4,
//     },
//     buyNowPrice: 45000.0,
//     bidStartPrice: 20000.0,
//     productImages: [
//       "https://vkoqiqkoixdhweekdqmv.supabase.co/storage/v1/object/public/KeyBidsBucket/7fefbf67-afb0-4fbd-8d19-e030818c7b0d",
//       "https://vkoqiqkoixdhweekdqmv.supabase.co/storage/v1/object/public/KeyBidsBucket/5802718f-8e92-410a-82ea-1b34c45179c0",
//       "https://vkoqiqkoixdhweekdqmv.supabase.co/storage/v1/object/public/KeyBidsBucket/6df54171-b5d6-49bb-8f8d-1c25d084060f",
//     ],
//   },
//   {
//     productName: "CELSHADE Base 65 Keyboard - GRAY",
//     productDescription:
//       "\n\n65% COMPACT FORM FACTOR (includes arrow keys)\n\nABS FRAME\n\nHOT SWAPPABLE\n\nPBT DYE-SUB KEYCAPS\n\nALUMINUM PLATE\n\nDUAL SILICONE DAMPENING\n\nSIDE PRINT LETTERING\n\nPRE-LUBED TTC VENUS SWITCHES\n\nFULL CUSTOMIZABLE RGB LIGHTING\n\nMACRO PROGRAMMING\n\nUSB-C DETACHABLE CONNECTION\n",
//     brandName: "GRAFX Program",
//     modelNumber: "CB65KG",
//     connectivity: null,
//     switches: "MXBLACK",
//     keyCaps: "DSA",
//     layout: "QWERTY",
//     category: "SIXTYFIVE",
//     skuCode: "3fde9d",
//     weight: 1.2,
//     size: {
//       length: 12.2,
//       breadth: 4.2,
//       height: 3.0,
//     },
//     buyNowPrice: 17000.0,
//     bidStartPrice: 5700.0,
//     productImages: [
//       "https://vkoqiqkoixdhweekdqmv.supabase.co/storage/v1/object/public/KeyBidsBucket/e2f344b3-ee29-4665-98bf-a251e4fef5d2",
//       "https://vkoqiqkoixdhweekdqmv.supabase.co/storage/v1/object/public/KeyBidsBucket/a9fe4812-eea1-4969-bdde-1140705709c6",
//       "https://vkoqiqkoixdhweekdqmv.supabase.co/storage/v1/object/public/KeyBidsBucket/e52ed878-0d9f-45e8-a316-06e447ed605e",
//     ],
//   },
// ];

const DisplayGrid = () => {
  const shopData = useSelector((state) => state.shop);
  const dispatch = useDispatch();
  const axiosInstance = useAxios();
  
  useEffect(()=>{
    const requestBody = {limit:10, offset:0}
    dispatch(fetchCatalogue({requestBody, axiosInstance}));
  },[axiosInstance,dispatch])

  const data = shopData?.catalogue?.page?.data?.content || [];

  /*
   * when you have a child component that relies on a function passed down from a parent component.
   * Without useCallback, the function would get recreated every time the parent component re-renders,
   *  causing unnecessary re-renders of the child component as well.
   */
  const closeModal = useCallback(
    () => {
        dispatch(setBiddingModalSku({skuCode: null, modalType: null }))
        dispatch(setBidAmount(0))
    },
    [dispatch]
  );

  const currentProduct = data.find(
    (product) => product.skuCode === shopData.biddingModalSku
  );

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 py-10">  
        {data.length > 0 ? (data.map((product) => (
          <DisplayCard key={product.skuCode} productData={product} />
        ))):<p className="text-sm text-left"> No product available currently.</p>}
      </div>
      {currentProduct && shopData.modalType && (
        <BiddingModal
          productData={currentProduct}
          closeModalHandler={closeModal}
        />
      )}
    </>
  );
};

export default DisplayGrid;
