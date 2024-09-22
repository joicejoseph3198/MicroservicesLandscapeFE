import { useDispatch, useSelector } from "react-redux";
import { CustomButton } from "./CustomButton";
import { InputTextField } from "./InputTextField";
import { MdCurrencyRupee } from "react-icons/md";
import { MdClear } from "react-icons/md";
import { setBidAmount } from "../redux/slices/shopSlice";
import { useState } from "react";

const BiddingModal = (props) => {
  const modalType = useSelector((state) => state.shop.modalType);
  const bidAmount = useSelector((state) => state.shop.bidAmount);
  const dispatch = useDispatch();
  const [bidValue, setBidValue] = useState(null);
  const { productData, closeModalHandler } = props;

  const handleBidChange = (event) => {
    const amount = event.target.value;
    const numericValue = Number(amount);
    // Check if the numericValue is a valid number
    if (!isNaN(numericValue)) {
      dispatch(setBidAmount(numericValue));
    } else {
      // Handle the case where the input value is not a number
      console.error("Invalid input: Please enter a numerical value");
    }
  };

  const updateBid = (value) => {
    if(bidAmount <= productData.bidStartPrice){
      dispatch(setBidAmount(productData.bidStartPrice + value))
    }else{
      dispatch(setBidAmount(bidAmount + value));
    }
  };

  let modalContent;

  switch (modalType) {
    case "BID":
      modalContent = (
        <div className="flex flex-col justify-center bg-white w-full lg:w-2/5 rounded-md border-2 border-slate-500 mx-2 p-2 lg:p-5">
          <p
            className="text-lg hover:cursor-pointer"
            onClick={closeModalHandler}
          >
            <MdClear />
          </p>
          <h3 className="font-[NeueBit] text-3xl py-5">
            {productData.productName.toUpperCase()}
          </h3>
          <div className="text-left px-2 pb-10">
            <h2 className="text-lg text-slate-700 pb-2"> Bidding Details </h2>
            <div className="p-5 border-2 rounded-md text-md">
              <h3>Bid Start Price</h3>
              <p className="flex flex-row items-center text-4xl lg:text-6xl">
                <MdCurrencyRupee /> {productData.bidStartPrice} 
                {bidValue !== null && (
                  <span className="text-4xl text-slate-300"> +{bidValue}</span>
                )}
              </p>
              <div className="pt-5 flex flex-row gap-5 py-5">
                <CustomButton
                  color="gray"
                  buttonText="+100"
                  mouseEnterHandler={()=>setBidValue(100)}
                  mouseExitHandler={()=>setBidValue(null)}
                  onClickHandler={() => updateBid(100)}
                />
                <CustomButton
                  color="gray"
                  buttonText="+500"
                  mouseEnterHandler={()=>setBidValue(500)}
                  mouseExitHandler={()=>setBidValue(null)}
                  onClickHandler={() => updateBid(500)}
                />
                <CustomButton
                  color="gray"
                  buttonText="+1000"
                  mouseEnterHandler={()=>setBidValue(1000)}
                  mouseExitHandler={()=>setBidValue(null)}
                  onClickHandler={() => updateBid(1000)}
                />
              </div>
              <InputTextField
                title="Bid Amount"
                placeholder="Enter new bid amount"
                valueStore={bidAmount}
                onChangeHandler={handleBidChange}
              />
              <div className="pt-5">
                <CustomButton
                  color="blue"
                  buttonText="Place Bid"
                  onClickHandler={closeModalHandler}
                />
              </div>
            </div>
          </div>
        </div>
      );
      break;

    case "BUY":
      modalContent = (
        <div className="flex flex-col justify-center bg-white w-full lg:w-2/5 rounded-md border-2 border-slate-500 mx-2 p-2 lg:p-5">
          <p
            className="text-lg hover:cursor-pointer"
            onClick={closeModalHandler}
          >
            <MdClear />
          </p>
          <h3 className="font-[NeueBit] text-3xl py-5">
            {productData.productName.toUpperCase()}
          </h3>
          <div className="text-left px-2 pb-10">
            <h2 className="text-lg text-slate-700 pb-2"> Buy Now Details </h2>
            <div className="p-5 border-2 rounded-md text-md">
              <h3>Buy Now Price</h3>
              <p className="flex flex-row items-center text-4xl lg:text-6xl">
                <MdCurrencyRupee /> {productData.buyNowPrice}
              </p>
              <p>
                By choosing <span className="font-['MoriBold']">Buy Now</span> :
                <br />
                • The auction will end immediately
                <br />
                • You'll pay the full Buy Now price
                <br />
                • Other bidders will no longer be able to bid
                <br />
                <br />
                You are about to buy this item immediately for the{" "}
                <span className="font-['MoriBold']">Buy Now Price</span>.
                <br />
                <br />
                Are you sure you want to proceed with the immediate purchase?
              </p>
              <div className="pt-5 flex flex-row gap-5">
                <CustomButton
                  color="blue"
                  buttonText="Buy Now"
                  onClickHandler={closeModalHandler}
                />
                <CustomButton
                  color="white"
                  buttonText="Cancel"
                  onClickHandler={closeModalHandler}
                />
              </div>
            </div>
          </div>
        </div>
      );
      break;

    default:
      modalContent = null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-10 backdrop-blur-sm flex flex-row justify-center items-center">
      {modalContent}
    </div>
  );
};

export default BiddingModal;
