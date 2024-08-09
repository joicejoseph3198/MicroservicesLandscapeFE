import { MdOutlineControlPoint } from "react-icons/md";
import { MdCurrencyRupee } from "react-icons/md";
import BiddingModal from "./BiddingModal";
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleBiddingModal } from "../redux/slices/shopSlice";

const DisplayImageContainer = (props) => {
  const {biddingModalOpen} = useSelector(state=>state.shop);
  const dispatch = useDispatch();
  const { imageUrls, productData } = props;

  useEffect(()=>{},[biddingModalOpen])

  const biddingModalSwitch = () => {
    dispatch(toggleBiddingModal())
  }

  return (
    <Fragment>
    <div className="relative h-[`423px`] w-[`423px`] rounded-md border-2 w-full object-cover overflow-hidden border-slate-600 border-2 hover:border-blue-500">
      <img src={imageUrls[0]}></img>
      <div>
        <div
          className="absolute top-2 left-2 text-xl size-8 bg-white border-2 p-1 hover:bg-blue-500 hover:text-white hover:cursor-pointer"
          title="Buy Now"
        >
          <MdOutlineControlPoint />
        </div>
        <div
          className="absolute top-2 left-12 text-xl size-8 bg-white border-2 p-1 hover:bg-blue-500 hover:text-white hover:cursor-pointer"
          title="Place Bid"
          onClick={biddingModalSwitch}
        >
          <MdCurrencyRupee />
        </div>
      </div>
    </div>
    {biddingModalOpen &&  <BiddingModal productData={productData}/> }
    </Fragment>
  );
};

export default DisplayImageContainer;
