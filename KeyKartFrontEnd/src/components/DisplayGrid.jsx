import { fetchCatalogue, setBidAmount, setBiddingModalSku } from "../redux/slices/shopSlice";
import DisplayCard from "./DisplayCard";
import BiddingModal from "./BiddingModal";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import { useAxios } from "../utils/axiosUtil";
import Loader from "./Loader";
import { CustomButton } from "./CustomButton";

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
	<div className="flex flex-row justify-between border-y-2 border-slate-400 p-2 my-5">
		<CustomButton color="white" buttonText="Filters"/>
		<CustomButton color="white" buttonText="Sort"/>
	</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 py-10">  
        {data.length > 0 ? (data.map((product) => (
          <DisplayCard key={product.skuCode} productData={product} />
        ))): <p className="text-left"> <Loader/> </p>}
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
