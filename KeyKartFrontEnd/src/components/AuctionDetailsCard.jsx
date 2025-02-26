import dayjs from 'dayjs';
import { useCallback, useEffect, useState } from 'react'
import { MdCurrencyRupee } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { CustomButton } from './CustomButton';
import { setBiddingModalSku } from '../redux/slices/shopSlice';
import { useAxios } from '../utils/axiosUtil';
import { fetchAuctionDetails } from '../redux/slices/auctionSlice';
import { useParams } from 'react-router-dom';

const AuctionDetailsCard = () => {
    const auctionDetails = useSelector((state)=> state.auction)
    const dispatch = useDispatch();
    const axiosInstance = useAxios();
    const { id } = useParams();


    useEffect(()=>{
        dispatch(fetchAuctionDetails({skuCode: id, axiosInstance}))
    },[id, axiosInstance, dispatch])
    
    const openModal = (type) => {
        dispatch(setBiddingModalSku({skuCode: id, modalType: type}));
    };

    const [timeLeft, setTimeLeft] = useState({});

    const calculateTimeLeft = useCallback((givenTime) => {
        const now = dayjs();
        if (now.isValid() && dayjs.isDayjs(givenTime)) {
            const diffInSeconds = givenTime.diff(now, 'second');
    
            if (diffInSeconds > 0) {
                const days = givenTime.diff(now, 'day'); // Total days difference
                const hours = givenTime.diff(now.add(days, 'day'), 'hour'); // Remaining hours
                const minutes = givenTime.diff(
                    now.add(days, 'day').add(hours, 'hour'),
                    'minute'
                ); // Remaining minutes
                const seconds = givenTime.diff(
                    now.add(days, 'day').add(hours, 'hour').add(minutes, 'minute'),
                    'second'
                ); // Remaining seconds
    
                setTimeLeft({ days, hours, minutes, seconds });
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        } else {
            setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        }
    }, [setTimeLeft]);
    
    
    useEffect(() => {
        // Determine the target time based on auction status
        const targetTime =
            auctionDetails?.auctionStatus?.toUpperCase() === 'START BIDDING'
                ? auctionDetails?.endTime
                : auctionDetails?.auctionStatus?.toUpperCase() === 'COMING SOON'
                ? auctionDetails?.startTime
                : null;
    
        if (targetTime) {
            const givenTime = dayjs(targetTime); 
            calculateTimeLeft(givenTime); 
    
            const timer = setInterval(() => {
                calculateTimeLeft(givenTime);
            }, 1000);
    
        
            return () => clearInterval(timer);
        }
    }, [auctionDetails?.auctionStatus, auctionDetails?.endTime, auctionDetails?.startTime, calculateTimeLeft]);
    


    const renderAuctionDetails = () => {
        switch (auctionDetails?.auctionStatus?.toUpperCase()) {
            case 'START BIDDING':
                return (
                    <>
                        <h3 className='text-sm md:text-md'>{ auctionDetails?.highestBid ? "CURRENT HIGHEST BID": "BID START PRICE"}</h3>
                        <div className="flex flex-row items-center text-xl">
                            <MdCurrencyRupee /> { auctionDetails?.highestBid ? auctionDetails?.highestBid : auctionDetails?.bidStartPrice || "NIL"}
                        </div>
                        <h3 className='text-sm md:text-md'>BUY NOW PRICE</h3>
                        <div className="flex flex-row items-center text-xl">
                            <MdCurrencyRupee /> {auctionDetails?.buyNowPrice || "NIL"}
                        </div>
                        <h3 className='text-sm md:text-md'>AUCTION ENDS IN</h3>
                        <div className="flex flex-row items-center text-3xl">
                        {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
                        </div>
                    </>
                );
            case 'COMING SOON':
                return (
                    <>
                        <h3 className='text-sm md:text-md'>AUCTION START</h3>
                        <div className="flex flex-row items-center text-2xl">
                            {dayjs(auctionDetails?.startTime).format('DD-MM-YYYY HH:mm:ss')}
                        </div>
                        <h3 className='text-sm md:text-md'>AUCTION END</h3>
                        <div className="flex flex-row items-center text-2xl">
                            {dayjs(auctionDetails?.endTime).format('DD-MM-YYYY HH:mm:ss')}
                        </div>
                        <h3 className='text-sm md:text-md'>AUCTION BEGINS IN</h3>
                        <div className="flex flex-row items-center text-2xl">
                        {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
                        </div>
                    </>
                );
            case 'SOLD OUT':
                return (
                    <>
                        <h3 className='text-sm md:text-md'>AUCTION CONCLUDED ON</h3>
                        <div className="flex flex-row items-center text-2xl">
                            {dayjs(auctionDetails?.endTime).format('DD-MM-YYYY HH:mm:ss')}
                        </div>
                        {
                        auctionDetails?.highestBid && (
                            <>
                                <h3 className='text-sm md:text-md'>SOLD FOR</h3>
                                <div className="flex flex-row items-center text-3xl">
                                    <MdCurrencyRupee /> {auctionDetails?.highestBid}
                                </div>
                            </>
                        )}    
                    </>
                )
                
            default:
                return <p>Auction status not available.</p>;
        }
    };

    return (
        <div className='text-left text-md lg:text-lg lg:px-5 text-slate-500 rounded-md flex flex-col justify-center w-fit'>
            <div className='p-2'>
            <p className='text-sm lg:text-xl py-5'> SKU : {auctionDetails?.productSkuCode?.toUpperCase() || "N/A"} | <span className='text-black'>{auctionDetails?.auctionStatus?.toUpperCase() || "CURRENTLY UNAVAILABLE"}</span></p>
            <div className='border-t-2 border-slate-300 py-5'>
                <div className='text-md lg:text-lg text-left text-black'>
                    <div className=" text-left flex flex-col gap-2">
                       {renderAuctionDetails()}
                    </div>
                </div>
            </div>
            </div>
           
            <div className='flex flex-col border-t-2 gap-5 py-5 text-md p-2'>
                <h2 className='text-slate-black'> How it works?</h2>
                <div className='text-black'>
                   Bidding:
                   <ul className='pl-5 text-slate-500'>
                    <li> * Place a bid higher than the current price to participate in the auction.</li>
                    <li> * Keep an eye on the timer—once it ends, the highest bidder wins!</li>
                    <li> * You’ll receive notifications if you’re outbid so you can place another bid.</li>
                   </ul>
                </div>
                <div className='text-black'>
                   Buy Now:
                   <ul className='pl-5 text-slate-500'>
                      <li>* Don’t want to wait?</li>
                      <li>* Use the "Buy Now" option to purchase the item immediately at the fixed price.</li>
                   </ul>
                </div>
            </div>
           
            {   auctionDetails?.auctionStatus?.toUpperCase() === 'START BIDDING' && (
                    <div className='flex flex-row border-t-2 gap-5 pt-5 text-lg'>
                        <CustomButton buttonText="Place Bid" color="blue" onClickHandler={()=>openModal("BID")} />
                        <CustomButton buttonText="Trigger Buy Now" color="white"  onClickHandler={()=>openModal("BUY")} />
                    </div>
                )
            }
           
        </div>
    )
}

export default AuctionDetailsCard;