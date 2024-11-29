export const CustomButton = (props) => {
    const {color, buttonText, onClickHandler, mouseEnterHandler, mouseExitHandler} = props;
    const buttonVariants = {
        blue: 'bg-blue-600 hover:bg-blue-500 text-white',
        gray: 'bg-gray-200 hover:bg-gray-100 text-blue-600',
        white: 'bg-white hover:bg-gray-100 text-slate-700 border-slate-400',   
    }
    return (
        <button onClick={onClickHandler} onMouseEnter={mouseEnterHandler} onMouseLeave={mouseExitHandler}
        className={`${buttonVariants[color]} flex flex-row items-center justify-center px-4 font-['MoriBold'] rounded-full text-sm lg:text-md py-5 h-[38px] -mr-3 border-2`}>
        {buttonText}
      </button>  
    )
}