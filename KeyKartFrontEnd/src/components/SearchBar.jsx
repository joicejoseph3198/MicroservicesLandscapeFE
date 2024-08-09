const SearchBar = () => {
    // const searchTerm = useSelector(state => state.search.searchText);
    // const dispatch = useDispatch();
    // const navigate = useNavigate();
    
    // const buttonClickHandler = () =>{
    //     dispatch(updateCurrentSearchTerm(searchTerm));
    //     dispatch(updateSearchText(''));
        
    //     // Navigate to RecipeSearch component
    //     navigate('/search');
        
    // }
    
    return(
        <div className="mt-10 py-2 px-6 rounded-full bg-gray-50 border flex">
            <input type="text" placeholder="Search" 
            className="bg-transparent w-full focus:outline-none pr-4 text-sm font-semibold border-0 " 
           />
            <button className="flex flex-row items-center justify-center px-2 rounded-full text-sm bg-blue-600 text-white border-transparent py-1 h-[30px] -mr-3"
            >
                Search
                </button>
            </div>
    )
}
export default SearchBar;