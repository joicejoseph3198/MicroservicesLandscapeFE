import { useParams } from "react-router-dom";
import ImageSlide from "../components/ImageSlide";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { aggregateDetails } from "../redux/slices/aggregationSlice";
import { useAxios } from "../utils/axiosUtil";
import AuctionDetailsCard from "../components/AuctionDetailsCard";
import BiddingModal from "../components/BiddingModal";
import { setBidAmount, setBiddingModalSku } from "../redux/slices/shopSlice";
import useAuctionSSE from "../hooks/useAuctionSSE";
import { useAuth0 } from "@auth0/auth0-react";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const axiosInstance = useAxios();
  const [activeTab, setActiveTab] = useState("Auction Details");
  const productData = useSelector((state) => state.aggregation.product);
  const auctionDetails = useSelector((state)=> state.auction);
  const { user } = useAuth0();
  const shopData = useSelector((state) => state.shop);

  useEffect(() => {
    dispatch(aggregateDetails({ skuCode: id, axiosInstance }));
  }, [dispatch, id, axiosInstance]);

  const closeModal = useCallback(() => {
    dispatch(setBiddingModalSku({ skuCode: null, modalType: null }));
    dispatch(setBidAmount(0));
  }, [dispatch]);

   const {isConnected } = useAuctionSSE({
          auctionId: auctionDetails?.id,
          clientId: user?.email,
          skuCode: id,
          axiosInstance,
    });

  return (
    <div className="p-5 lg:p-10">
      <p className="px-4 text-5xl lg:text-8xl text-left font-[NeueBit] text-slate-700">
        {" "}
        Details / {productData?.productName}
      </p>
      <div className="flex flex-col lg:flex-row justify-center items-center py-5 lg:items-start gap-10 px-10">
        <div className="flex w-full py-5">
          <ImageSlide imageUrls={productData?.productImages || []} />
        </div>

        <div className="tab-container flex flex-col border-2 p-2 rounded-md pt-5 pb-5 h-fit w-fit">
          <div
            className="tab-list flex flex-row gap-2 border-2 p-2 mx-5 rounded-md
                     [&>*]:text-sm text-slate-500 w-fit xl:w-max [&>*]:bg-white [&>*]:p-2 [&>*]:rounded-md"
          >
            <button
              className={`${
                activeTab === "Auction Details" ? "!bg-blue-700 text-white" : ""
              }`}
              onClick={() => setActiveTab("Auction Details")}
            >
              Auction Details
            </button>
            <button
              className={`${
                activeTab === "Product Description"
                  ? "!bg-blue-700 text-white"
                  : ""
              }`}
              onClick={() => setActiveTab("Product Description")}
            >
              Product Description
            </button>
            <button
              className={`${
                activeTab === "Specifications" ? "!bg-blue-700 text-white" : ""
              }`}
              onClick={() => setActiveTab("Specifications")}
            >
              Specifications
            </button>
            <button
              className={`${
                activeTab === "Recent Activity" ? "!bg-blue-700 text-white" : ""
              }`}
              onClick={() => setActiveTab("Recent Activity")}
            >
              Recent Activity
            </button>
          </div>
          {activeTab == "Auction Details" && (
            <div className="tab-content flex w-fit py-5">
              <AuctionDetailsCard />
            </div>
          )}
          {activeTab == "Product Description" && (
            <div className="flex w-fit">
              <div className="max-h-screen lg:w-full text-left text-md px-5">
                <div className="p-2">
                  <p className="text-sm md:text-lg border-b-2 py-5 border-slate-300">
                    PRODUCT DESCRIPTION
                  </p>
                  <div className="py-2">
                    {productData?.productDescription
                      ?.split("\n")
                      .map((line, index) => (
                        <p className="pt-1 text-slate-500" key={index}>
                          {line.toUpperCase()}
                        </p>
                      ))}
                  </div>
                </div>
              </div>
              <div></div>
            </div>
          )}
        </div>
      </div>
      {shopData.modalType && (
        <BiddingModal
          productData={productData}
          closeModalHandler={closeModal}
        />
      )}
    </div>
  );
};

export default ProductDetails;
