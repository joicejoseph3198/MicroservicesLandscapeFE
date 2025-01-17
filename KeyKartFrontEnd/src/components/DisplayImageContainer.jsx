import { MdOutlineControlPoint } from "react-icons/md";
import { MdCurrencyRupee } from "react-icons/md";
import { useDispatch} from "react-redux";
import { setBiddingModalSku } from "../redux/slices/shopSlice";
import { useEffect, useState } from "react";

const DisplayImageContainer = (props) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const { imageUrls, productData } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    let intervalId;
    if (isHovering && imageUrls.length > 1) {
      intervalId = setInterval(() => {
        setCurrentImageIndex((index) => (index + 1) % imageUrls.length);
      }, 2000); 
    }
    return () => clearInterval(intervalId);
  }, [isHovering, imageUrls]);

  const openModal = (type) => {
    dispatch(setBiddingModalSku({skuCode: productData.skuCode, modalType: type}));
  };

  return (
    <div className="relative h-[300px] w-full rounded-md border-2 object-cover overflow-hidden border-slate-400 border-2 hover:border-blue-500"
    onMouseEnter={() => setIsHovering(true)}
    onMouseLeave={() => {
      setIsHovering(false);
      setCurrentImageIndex(0);
    }}>
      <img 
        src={imageUrls[currentImageIndex]} 
        alt={`Product ${currentImageIndex + 1}`}
        className={`w-full h-full object-cover ${productData?.status.toUpperCase() === "PRODUCT UNAVAILABLE"  ? "grayscale" : ""}`}
      />
      <div>
      { 
      productData?.status?.toUpperCase() == "START BIDDING" && 
      <div>
        <div
          className="absolute top-2 left-2 text-xl size-8 bg-white border-slate-400 border-2 p-1 hover:bg-blue-500 hover:text-white hover:cursor-pointer"
          title="Buy Now"
          onClick={()=>openModal("BUY")}
        >
          <MdOutlineControlPoint />
        </div>
        <div
          className="absolute top-2 left-12 text-xl size-8 border-slate-400 bg-white border-2 p-1 hover:bg-blue-500 hover:text-white hover:cursor-pointer"
          title="Place Bid"
          onClick={()=>openModal("BID")}
        >
          <MdCurrencyRupee />
        </div>
      </div> 
      }
        
        <h3 className={`absolute bottom-2 right-2 border-slate-400 
        ${productData?.status.toUpperCase() === "START BIDDING" ? "bg-green-400 animate-bounce" : "bg-white"}
         border-2 text-black text-lg rounded-full font-['NeueBit'] m-1 px-4 w-fit`} title='View Details'>
            {productData?.status.toUpperCase()}
        </h3>
      </div>
    </div>
  );
};

export default DisplayImageContainer;
