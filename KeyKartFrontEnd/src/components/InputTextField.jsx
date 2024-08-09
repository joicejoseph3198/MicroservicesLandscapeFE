export const  InputTextField = (props) => {
    const {title, placeholder, onClickHandler, onChangeHandler, valueStore, name} = props;
    return(
        <div className="pb-2">
            <h3>{title}</h3>
            <input type="text" placeholder={placeholder} value={valueStore} name={name} onChange={onChangeHandler}
                className="bg-transparent text-black w-full focus:outline-blue px-6 py-2 text-sm lg:text-md font-semibold border-2 rounded-md" 
            />
        </div>
    )
};