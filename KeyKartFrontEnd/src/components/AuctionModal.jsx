import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { MdClear, MdCurrencyRupee } from 'react-icons/md'
import { CustomButton } from './CustomButton';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import 'dayjs/locale/en-gb';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { endAuction, fetchAuctionDetails, resetFields, scheduleAuction, updateField } from '../redux/slices/auctionSlice';
import { useAxios } from '../utils/axiosUtil';
import dayjs from 'dayjs';
import { useEffect } from 'react';

const AuctionModal = (props) => {
    const dispatch = useDispatch();
    const axiosInstance = useAxios();

    const auctionDetails = useSelector(state=>state.auction);

    const {productData, closeModalHandler} = props;


    useEffect(()=>{
        dispatch(fetchAuctionDetails({skuCode:productData.skuCode, axiosInstance}));
    },[dispatch,productData?.skuCode,axiosInstance]);
    
    const handleScheduleAuction = async () => {
        const requestBody = {
            productSkuCode: productData.skuCode,
            buyNowPrice: productData.buyNowPrice,
            bidStartPrice: productData.bidStartPrice,
            startTime: auctionDetails.startTime,
            endTime: auctionDetails.endTime
        }
        const response = await dispatch(scheduleAuction({requestBody,axiosInstance}))
        console.log("Auction schedule API response", response)
        if(response?.payload?.status){
            toast.success(`${response?.payload?.message}`)
        }else{
            toast.error(`${response?.payload?.message}` )
        }
        closeModalHandler();
    }
    const handleEndAuction = async () => {
        const response = await dispatch(endAuction({skuCode:productData.skuCode,axiosInstance}))
        if(response?.payload?.status){
            toast.success(`${response?.payload?.message}`)
        }else{
            toast.error(`${response?.payload?.message}` )
        }
        dispatch(resetFields())
        closeModalHandler();
    }

    const handleStartTimeChange = (newValue) => {
        console.log("newValue:", newValue);
        if (newValue && dayjs(newValue).isValid()) {
            // Format the date using Day.js
            const formattedDate = dayjs(newValue).format('DD-MM-YYYY HH:mm:ss');
            const name = 'startTime';
            const value = formattedDate;
            dispatch(updateField({ name, value }));
        } else {
            console.error("Invalid date value:", newValue);
        }
      };
      
      const handleEndTimeChange = (newValue) => {
        console.log("newValue:", newValue);
        if (newValue && dayjs(newValue).isValid()) {
            // Format the date using Day.js
            const formattedDate = dayjs(newValue).format('DD-MM-YYYY HH:mm:ss');
            const name = 'endTime';
            const value = formattedDate;
            dispatch(updateField({ name, value }));
        } else {
            console.error("Invalid date value:", newValue);
        }
      };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
        <div className="fixed inset-0 bg-black bg-opacity-10 backdrop-blur-sm h-screen flex justify-center items-center ">
            <div className="w-full lg:w-2/5 justify-center flex flex-col bg-white rounded-md border-2 border-slate-500 m-1 p-5">
                <p className="text-lg hover:cursor-pointer" onClick={closeModalHandler}>
                    <MdClear />
                </p>
                <h3 className="font-[NeueBit] text-3xl py-2">
                    {productData.productName.toUpperCase()}{" (SKUCODE: "}{productData.skuCode.toUpperCase()}{")"}
                </h3>
                <div className='pb-10 text-left text-black'>
                    <h2 className=" text-lg text-slate-700 pb-2"> Auction Details </h2>
                    <div className="p-5 border-2 rounded-md text-left flex flex-col gap-2">
                        <h3>Bid Start Price</h3>
                        <div className="flex flex-row items-center text-4xl lg:text-4xl">
                            <MdCurrencyRupee /> {productData.bidStartPrice}
                        </div>
                        <h3>Buy Now Price</h3>
                        <div className="flex flex-row items-center text-4xl lg:text-4xl">
                            <MdCurrencyRupee /> {productData.buyNowPrice}
                        </div>
                       
                        {auctionDetails?.auctionStatus ?
                         <> 
                         <h3>Auction Start</h3>
                            <div className="flex flex-row items-center text-4xl lg:text-4xl">
                            {dayjs(auctionDetails.startTime).format('DD-MM-YYYY HH:mm:ss')}
                            </div>
                         <h3>Auction End</h3>
                            <div className="flex flex-row items-center text-4xl lg:text-4xl">
                            {dayjs(auctionDetails.endTime).format('DD-MM-YYYY HH:mm:ss')}
                            </div>
                          <div className="text-sm flex flex-col gap-5 py-5">
                            <p>
                                Note: There is an existing auction configured for the product. You are required to end the existing
                                auction before proceeding to make any changes.</p>
                          </div>
                          <div className='flex flex-row gap-5'>
                            <CustomButton buttonText="End Auction" color="blue" onClickHandler={handleEndAuction}/>
                            <CustomButton buttonText="Cancel" color="white" onClickHandler={closeModalHandler}/>
                          </div>
                         </>
                         :
                         <>
                          <p className='flex flex-col text-sm gap-5'>
                            <DateTimePicker
                            onChange={handleStartTimeChange} 
                            ampm={false}
                            format="DD-MM-YYYY HH:mm:ss"
                            label="Start Time"/>
                            <DateTimePicker 
                            onChange={handleEndTimeChange} 
                            ampm={false}
                            format="DD-MM-YYYY HH:mm:ss"
                            label="End Time"/>
                        </p>
                         <div className="text-sm flex flex-col gap-5 py-5">
                            <p>Note: You are about to schedule an auction for the product. Any changes you've made 
                                in the previous form will be reflected and an auction will be scheduled.</p>
                            <br />
                            <p>Are you sure you want to proceed with the scheduling?</p>
                        </div>
                        <div className='flex flex-row gap-5'>
                            <CustomButton buttonText="Schedule" color="blue" onClickHandler={handleScheduleAuction}/>
                            <CustomButton buttonText="Cancel" color="white" onClickHandler={closeModalHandler}/>
                        </div>
                         </>
                        }
                    </div>
                </div>
            </div>
        </div>         
        </LocalizationProvider>
    )
}

export default AuctionModal