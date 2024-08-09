import React from "react";
import DisplayImageContainer from "./DisplayImageContainer";

const DisplayCard = (props) => {
  const {productData} = props;
  console.log(productData)
  return (
    <div>
      <DisplayImageContainer productData={productData} imageUrls={productData.productImages} />
      <div className="product-info flex flex-row  items-center justify-between ">
        <div className="text-left pt-2 text-sm md:text-md">
          <h3 className="hover:text-blue-500 cursor-pointer text-lg lg:text-2xl font-['NeueBit']" title='View Details'>
            {productData.productName.toUpperCase()}
          </h3>
          <h3> Bid Start: Rs. {productData.bidStartPrice}</h3>
          <h3> Buy Now: Rs. {productData.buyNowPrice}</h3>
          <h3> 0 Reviews</h3>
        </div>
      </div>
    </div>
  );
};

export default DisplayCard;
