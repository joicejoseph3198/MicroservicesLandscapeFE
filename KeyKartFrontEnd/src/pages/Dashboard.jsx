import { CustomButton } from "../components/CustomButton";
import { ImageUploadField } from "../components/ImageUploadField";
import { InputTextField } from "../components/InputTextField";
import { InputTextFieldWithButton } from "../components/InputTextFieldWithButton";
import {
  resetImages,
  setSelectedImages,
  uploadToBucket,
} from "../redux/slices/imageUploadSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductImages,
  createProduct,
  fetchProductDetails,
  resetForm,
  updateField,
} from "../redux/slices/addProductSlice";
import { useEffect, useState } from "react";
import { useAxios } from "../utils/axiosUtil";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AuctionModal from "../components/AuctionModal";
import { MdArrowBack } from "react-icons/md";

export const Dashboard = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const axiosInstance = useAxios();

  const previewUrls = useSelector((state) => state.imageUpload.previewUrls);
  const storageUrls = useSelector((state) => state.imageUpload.storageUrls);
  const productData = useSelector((state) => state.addProduct);
  const [toggleModal, setToggleModel] = useState(false);


  useEffect(() => {
    if (storageUrls.length >= 1) {
      // add bucket urls to product data
      dispatch(addProductImages(storageUrls));
    }
  }, [storageUrls, dispatch]);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductDetails({ id, axiosInstance }));
    }
    return () => {
      handleResetForm()
    }
  },[id,axiosInstance,dispatch]);

  const handleImageAdd = async (event) => {
    const file = event.target.files[0];
    const localImgPath = URL.createObjectURL(file);
    // set urls to be used for preview functionality
    dispatch(setSelectedImages(localImgPath));
    // upload to bucket
    dispatch(uploadToBucket(file));
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    dispatch(updateField({ name, value }));
  };

  const handleResetForm = () => {
    dispatch(resetImages());
    dispatch(resetForm());
  };

  const handleFormSubmission = async () => {
    const response = await dispatch(createProduct({ productData, axiosInstance })).unwrap();
    console.log("SUBMISSION RESPONSE",response.data.status)
    if(response?.data?.status === "true" ){
      toast.success("Request processed successfully.")
    }
    toast.error("Request processing un-successful.")
  };

  const backToListing = () => {
    navigate('/admin-section/listing');
  }

  return (
    <>
    {/*BEGIN Page Navigation*/}
      <div className="px-2 lg:px-10">
        <p className="text-md text-left text-gray flex flex-row items-center hover:cursor-pointer" onClick={()=>backToListing()}>
            <MdArrowBack/> Back to product list</p>
        <h2 className="text-5xl lg:text-8xl text-left text-slate-700 font-['NeueBit']">
            Dashboard/Add New Product
        </h2>
      </div>
        {/*END Page Navigation*/}
     <div className="flex h-full text-stone-600">
      <div className="flex-1 w-9/12 lg:px-10">
        <div className="flex flex-col lg:flex-row gap-5">
          <div className="flex flex-col px-0 pt-5 w-full">
            {/*BEGIN Description Section*/}
            <div className="text-left w-full text-sm px-2 pb-10">
              <h2 className=" text-slate-700 pb-2"> Description </h2>
              <div className="p-5 border-2 rounded-md">
                <InputTextField
                  title="Product Name"
                  placeholder="Enter product name"
                  name="productName"
                  valueStore={productData.productName}
                  onChangeHandler={handleInputChange}
                />
                <div className="py-2">
                  <h3>Product Description</h3>
                  <textarea
                    placeholder="Enter product description"
                    value={productData.productDescription}
                    name="productDescription"
                    onChange={handleInputChange}
                    className="resize-none bg-transparent text-black w-full h-60 focus:outline-blue px-6 py-2 text-sm font-semibold border-2 rounded-md"
                  />
                </div>
              </div>
            </div>
            {/*END Description Section*/}
            {/*BEGIN Category Section*/}
            <div className="text-left px-2 pb-5 text-sm">
              <h2 className="text-slate-700 pb-2"> Category </h2>
              <div className="p-5 border-2 rounded-md ">
                <InputTextField
                  title="Type"
                  placeholder="Enter product type"
                  name="category"
                  valueStore={productData.category}
                  onChangeHandler={handleInputChange}
                />
                <InputTextField
                  title="Brand Name"
                  placeholder="Enter brand name"
                  name="brandName"
                  valueStore={productData.brandName}
                  onChangeHandler={handleInputChange}
                />
                <InputTextField
                  title="Model Number"
                  placeholder="Enter model number"
                  name="modelNumber"
                  valueStore={productData.modelNumber}
                  onChangeHandler={handleInputChange}
                />
                <div className="flex flex-row gap-2">
                  <InputTextField
                    title="Switches"
                    placeholder=""
                    name="switches"
                    valueStore={productData.switches}
                    onChangeHandler={handleInputChange}
                  />
                  <InputTextField
                    title="Keycaps"
                    placeholder=""
                    name="keyCaps"
                    valueStore={productData.keyCaps}
                    onChangeHandler={handleInputChange}
                  />
                  <InputTextField
                    title="Layout"
                    placeholder=""
                    name="layout"
                    valueStore={productData.layout}
                    onChangeHandler={handleInputChange}
                  />
                </div>
              </div>
            </div>
            {/*END Category Section*/}
            {/*BEGIN Variant Section*/}
            <div className="text-left px-2 pb-5">
              <h2 className="text-sm text-slate-700 pb-2"> Variants </h2>
              <div className="p-5 border-2 rounded-md text-sm flex flex-row justify-between">
                <p>Product Variants</p>
                <p className="font-['MoriBold'] text-blue-500">
                  {" "}
                  + Add Variant
                </p>
              </div>
            </div>
            {/*END Variant Section*/}
          </div>
          {/*-----------------------------COLUMN PARTITION----------------------------*/}
          <div className="flex-auto w-full pt-5 text-sm ">
            {/*BEGIN Product Images Section*/}
            <div className="text-left px-2 pb-10">
              <h2 className="text-slate-700 pb-2"> Product Images </h2>
              <div className="p-5 border-2 rounded-md">
                {previewUrls.length < 3 && (
                  <>
                    <label
                      className="btn"
                      onClick={() =>
                        document.querySelector(".hidden-input").click()
                      }
                    >
                      <span className="text-blue-500 underline hover:cursor-pointer">
                        Click
                      </span>{" "}
                      to upload
                    </label>
                    <input
                      hidden
                      type="file"
                      accept="image/*"
                      className="hidden-input"
                      onChange={handleImageAdd}
                    ></input>
                  </>
                )}
                {id ? <ImageUploadField previewUrls={productData.productImages} /> :<> <ImageUploadField previewUrls={previewUrls} /></>}
              </div>
            </div>
            {/*END Product Images Section*/}
            {/*BEGIN Inventory Details Section*/}
            <div className="text-left px-2 pb-10 text-sm">
              <h2 className=" text-slate-700 pb-2">
                {" "}
                Inventory And Shipping{" "}
              </h2>
              <div className="p-5 border-2 rounded-md text-sm">
                <InputTextField
                  title="SKU Code (Optional)"
                  placeholder="Enter SKU code"
                  name="skuCode"
                  valueStore={productData.skuCode}
                  onChangeHandler={handleInputChange}
                />
                <h3 className="flex-auto py-2">Package Size (used to ship)</h3>
                <div className="flex flex-row gap-2">
                  <InputTextField
                    title="Length"
                    placeholder="in"
                    name="size.length"
                    valueStore={productData.size.length}
                    onChangeHandler={handleInputChange}
                  />
                  <InputTextField
                    title="Breadth"
                    placeholder="in"
                    name="size.breadth"
                    valueStore={productData.size.breadth}
                    onChangeHandler={handleInputChange}
                  />
                  <InputTextField
                    title="Height"
                    placeholder="in"
                    name="size.height"
                    valueStore={productData.size.height}
                    onChangeHandler={handleInputChange}
                  />
                </div>
                <InputTextField
                  title="Item Weight"
                  placeholder="kg"
                  name="weight"
                  valueStore={productData.weight}
                  onChangeHandler={handleInputChange}
                />
              </div>
            </div>
            {/*END Inventory Details Section*/}
            {/*BEGIN Pricing Section*/}
            <div className="text-left px-2 pb-5 text-sm">
              <h2 className="text-slate-700 pb-2"> Pricing </h2>
              <div className="p-5 border-2 rounded-md text-md">
                <InputTextFieldWithButton
                  name="bidStartPrice"
                  title="Bid Start Price"
                  buttonText="Rs."
                  placeholder="Starting bid price"
                  valueStore={productData.bidStartPrice}
                  onChangeHandler={handleInputChange}
                />
                <InputTextFieldWithButton
                  name="buyNowPrice"
                  title="Buy Now Price"
                  buttonText="Rs."
                  placeholder="Max buy price"
                  valueStore={productData.buyNowPrice}
                  onChangeHandler={handleInputChange}
                />
              </div>
            </div>
            {/*END Pricing Section*/}
            {/*BEGIN Buttons Section*/}
            <div className="text-right px-0 pb-10">
              <div className="flex flex-row flex-wrap justify-between gap-5 p-5 pt-0 text-md">
                <CustomButton
                  buttonText="Discard"
                  color="white"
                  onClickHandler={handleResetForm}
                />
                <div className="flex flex-row gap-5">
                  {id ? (
                      <>
                      <CustomButton buttonText="Schedule" color="gray" onClickHandler={()=> setToggleModel(true)}/>
                      <CustomButton
                        buttonText="Update Product"
                        color="blue"
                        onClickHandler={handleFormSubmission}
                      />
                      </>
                    ): <CustomButton
                    buttonText="Add Product"
                    color="blue"
                    onClickHandler={handleFormSubmission}
                  />}
                </div>
              </div>
            </div>
            {/*END Buttons Section*/}
          </div>
        </div>
      </div>
    </div>
    {id && toggleModal &&
     <AuctionModal productData={productData} closeModalHandler={()=> setToggleModel(false)}/>}
    </>
   
  );
};
