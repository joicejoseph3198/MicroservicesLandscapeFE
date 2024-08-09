export const InputTextFieldWithButton = (props) => {
    const{title, buttonText, onClickHandler, placeholder, valueStore, name, onChangeHandler} = props;
    return(
        <div className="pb-2">
            <h3>{title}</h3>
            <div className="max-w-xl py-2 px-2 rounded-md border flex">
                <button className="flex flex-row items-center justify-center px-4 rounded-full text-sm bg-gray-100 text-slate-700 border-2 py-1.5 h-[38px]"
                >
                    {buttonText}
                </button>
                <input type="text" placeholder={placeholder} value={valueStore} name={name} onChange={onChangeHandler}
                className="bg-transparent w-full px-4 focus:outline-none text-sm lg:md font-semibold border-0 " 
            />
            </div>
        </div>
     
    )
}