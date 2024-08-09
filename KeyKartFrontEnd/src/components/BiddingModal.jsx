import { useDispatch, useSelector } from "react-redux";
import { CustomButton } from "./CustomButton";
import { InputTextField } from "./InputTextField";
import { MdCurrencyRupee } from "react-icons/md";
import { MdClear } from "react-icons/md";
import { toggleBiddingModal } from "../redux/slices/shopSlice";
import { useEffect } from "react";

const BiddingModal = (props) => {
  const {biddingModalOpen} = useSelector(state=>state.shop);
  const dispatch = useDispatch();

  useEffect(()=>{},[biddingModalOpen])

  const biddingModalSwitch = () => {
    dispatch(toggleBiddingModal())
  }

  const { productData } = props;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-10 backdrop-blur-sm flex justify-center items-center">
      <div className="flex flex-col bg-white w-3/4 lg:w-2/5 rounded-md border-2 border-slate-500 p-5">
        <p className="text-lg hover:cursor-pointer" onClick={biddingModalSwitch}><MdClear /></p>
        <h3 className="font-[NeueBit] text-3xl py-5">{productData.productName.toUpperCase()}</h3>
        <div className="text-left px-2 pb-10">
          <h2 className="text-lg text-slate-700 pb-2"> Bidding Details </h2>
          <div className="p-5 border-2 rounded-md text-md">
            <h3>Bid Start Price</h3>
            <p className="flex flex-row items-center text-4xl lg:text-6xl">
              {" "}
              <MdCurrencyRupee /> {productData.bidStartPrice} <span className="text-slate-400 opacity-50">+100</span>
            </p>
            <InputTextField
              title="Bid Amount"
              placeholder="Enter new bid amount"
            />
            <div className="pt-5">
              <CustomButton color="blue" buttonText="Place Bid" onClickHandler={biddingModalSwitch} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BiddingModal;
