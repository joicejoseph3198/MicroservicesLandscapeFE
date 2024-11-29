
import { useParams } from 'react-router-dom';
import ImageSlide from '../components/ImageSlide';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { aggregateDetails } from '../redux/slices/aggregationSlice';
import { useAxios } from '../utils/axiosUtil';
import AuctionDetailsCard from '../components/AuctionDetailsCard';
import BiddingModal from '../components/BiddingModal';
import { setBidAmount, setBiddingModalSku } from '../redux/slices/shopSlice';

const ProductDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const axiosInstance = useAxios();

    const productData = useSelector((state) => state.aggregation.product);
    const shopData = useSelector((state) => state.shop);

    useEffect(()=>{
        dispatch(aggregateDetails({ skuCode: id, axiosInstance }));
    },[dispatch,id,axiosInstance])

    
    const closeModal = useCallback(
        () => {
            dispatch(setBiddingModalSku({skuCode: null, modalType: null }))
            dispatch(setBidAmount(0))
        },
        [dispatch]
    );

    return (
        <div className='p-5 lg:p-10'>
            <p className='px-4 text-5xl lg:text-8xl text-left font-[NeueBit] text-slate-700'> Details / {productData?.productName?.toUpperCase()}</p>
            <div className='flex flex-col lg:flex-row items-center justify-between gap-5 px-10'>
                <div className='py-5 max-h-screen lg:w-1/3 text-left text-md lg:text-lg'>
                    <div className='p-2'>
                        <p className='font-[MoriBold] text-sm lg:text-lg border-b-2 py-5 border-slate-300'>Product Specs</p>
                        <div className='py-5'>
                        {productData?.productDescription?.split("\n").map((line, index) => (
                            <p className="pt-1" key={index}>{line.toUpperCase()}</p>))}
                        </div>            
                    </div>
                </div>
                <div className='lg:pt-12 max-h-screen lg:w-1/3'>
                    <ImageSlide  imageUrls={productData?.productImages || []} />
                </div>
                <div className='py-5 max-h-screen lg:w-1/3'>
                    <AuctionDetailsCard/>
                </div>
                <div>
                {shopData.modalType && (
                    <BiddingModal
                    productData={productData}
                    closeModalHandler={closeModal}
                    />
                )}
                </div>
            </div>
            
        </div>
    )
}

export default ProductDetails