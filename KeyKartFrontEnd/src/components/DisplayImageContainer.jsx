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
    <div className="relative h-[300px] w-full rounded-md border-2 object-cover overflow-hidden border-slate-600 border-2 hover:border-blue-500"
    onMouseEnter={() => setIsHovering(true)}
    onMouseLeave={() => {
      setIsHovering(false);
      setCurrentImageIndex(0);
    }}>
      <img 
        src={imageUrls[currentImageIndex]} 
        alt={`Product ${currentImageIndex + 1}`}
        className="w-full h-full object-cover"
      />
      <div>
        <div
          className="absolute top-2 left-2 text-xl size-8 bg-white border-2 p-1 hover:bg-blue-500 hover:text-white hover:cursor-pointer"
          title="Buy Now"
          onClick={()=>openModal("BUY")}
        >
          <MdOutlineControlPoint />
        </div>
        <div
          className="absolute top-2 left-12 text-xl size-8 bg-white border-2 p-1 hover:bg-blue-500 hover:text-white hover:cursor-pointer"
          title="Place Bid"
          onClick={()=>openModal("BID")}
        >
          <MdCurrencyRupee />
        </div>
        <div>
          
        </div>
      </div>
    </div>
  );
};

export default DisplayImageContainer;
