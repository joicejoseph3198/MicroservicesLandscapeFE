import { useNavigate } from "react-router-dom";
import DisplayImageContainer from "./DisplayImageContainer";

const DisplayCard = (props) => {
  const {productData} = props;
  const navigate = useNavigate();

  const goToDetails = () => {
    const skuCodeData = productData?.skuCode
    if(skuCodeData){
      navigate(`/details/${skuCodeData}`)
    }
  }
  return (
    <div>
      <DisplayImageContainer productData={productData} imageUrls={productData.productImages} />
      <div className="product-info flex flex-row items-center justify-between">
        <div className="text-left pt-2 text-sm md:text-md">
          <h3 className="hover:text-blue-500 cursor-pointer text-lg lg:text-2xl font-['NeueBit']" title='View Details' onClick={goToDetails}>
            {productData.productName.toUpperCase()}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default DisplayCard;
