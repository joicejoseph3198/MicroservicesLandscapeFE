import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoIosClose } from "react-icons/io";
import { useDebounce } from "../hooks/useDebounce";
import { TfiViewList } from "react-icons/tfi";
import { BsArrowReturnLeft } from "react-icons/bs";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useAxios } from "../utils/axiosUtil";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
    const [searchInput,setSearchInput] = useState("");
    const debouncedSearch = useDebounce(searchInput, 500);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [result,setResult] = useState({});
    const [loading,setLoading] = useState(false);
    const axiosInstance = useAxios();
    const navigate = useNavigate();

    const navigateToProductPage = (id) =>{
      navigate(`/details/${id}`)
    }

    useEffect(()=>{
      if(debouncedSearch.trim()){
        const loadSearchResult = async () => {
          setLoading(true);
          const response = await axiosInstance.get(`/search/autocomplete?searchTerm=${debouncedSearch}`)  
        if (response.status == "200") {
            const data = await response?.data; 
            setResult(data);
          } else {
            console.error('Failed to fetch data');
          }
        }
        setLoading(false);
        loadSearchResult();
      }else{
        setResult({});
      }
    },[debouncedSearch, axiosInstance])

    const underlineMatch = (text, searchTerm) => {
        if (!searchTerm) return text; // No underline if no search term
        const regex = new RegExp(`(${searchTerm})`, 'gi'); // Create a regex to find the search term (case-insensitive)
        const parts = text.split(regex); // Split the text into matching and non-matching parts
      
        return parts.map((part, index) =>
          regex.test(part) ? (
            <span key={index} style={{ textDecoration: 'underline'}}>{part}</span>
          ) : part
        );
    };

    const renderSearchResult = (item, searchInput) => {
        switch (item.type) {
          case 'SIMILAR_MATCH':
            return (
                <li className="flex flex-row items-center p-1 px-4 justify-between hover:bg-blue-500 hover:cursor-pointer hover:text-white rounded-md" key={item.id} onClick={()=>navigateToProductPage(item.id)}>
                    <div className="flex flex-row items-center gap-2">
                        <TfiViewList />
                        <span>{item.suggestion}</span>
                    </div>
                <BsArrowReturnLeft/>
            </li>
            );
            
          case 'BRAND_MATCH':
            return (
                <li className="flex flex-row items-center p-1 px-4 justify-between hover:bg-blue-500 hover:cursor-pointer hover:text-white rounded-md" key={item.id} onClick={()=>navigateToProductPage(item.id)}>
                <div className="flex flex-row items-center gap-2">
                    <TfiViewList />
                    <div className="flex flex-col">
                        <span className="text-slate-400 hover:text-white">{underlineMatch(item.brandName, searchInput)}</span>
                        <span>{item.suggestion}</span>
                    </div>
                </div>
                <BsArrowReturnLeft/>
            </li>
            );
            
          case 'PRODUCT_MATCH':
            return (
                <li className="flex flex-row items-center p-1 px-4 justify-between hover:bg-blue-500 hover:cursor-pointer hover:text-white rounded-md" key={item.id} onClick={()=>navigateToProductPage(item.id)}>
                    <div className="flex flex-row items-center gap-2">
                        <TfiViewList />
                        <span>{underlineMatch(item.suggestion, searchInput)}</span>
                    </div>
                <BsArrowReturnLeft/>
            </li>
            );

            case 'DESCRIPTION_MATCH':
                return (
                    <li className="flex flex-row items-center p-1 px-4 justify-between hover:bg-blue-500 hover:cursor-pointer hover:text-white rounded-md" key={item.id} onClick={()=>navigateToProductPage(item.id)}>
                    <div className="flex flex-row items-center gap-2">
                        <TfiViewList />
                        <div className="flex flex-col">
                            <span className="text-slate-400 text-sm hover:text-white">...{underlineMatch(item.description, searchInput)}...</span>
                            <span>{item.suggestion}</span>
                        </div>
                    </div>
                    <BsArrowReturnLeft/>
                </li>
                );
          default:
            return (
              <div className="flex flex-row items-center gap-2">
                <TfiViewList />
                <span>{item.suggestion}</span>
              </div>
            );
        }
      };
    
    return(
        <div>
        {/* Search Bar as Placeholder */}
        {(
          <div
            className="flex items-center mt-10 py-2 px-6 mx-5 rounded-full bg-gray-50 border cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            <div className="flex items-center pr-2"  onClick={() => setIsModalOpen(true)}>
             <CiSearch />
            </div>
            <input
              type="text"
              placeholder="Search for your favourite products"
              className="bg-transparent w-full focus:outline-none text-sm border-0 text-slate-700 h-[30px]"
              disabled // Disable input when modal is closed
            />
          </div>
        )}
  
        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50" onClick={()=>setIsModalOpen(false)}>
            <div className="bg-white rounded-md p-6 mt-10 md:w-2/3 w-full m-2" onClick={(e)=> e.stopPropagation()}>
              {/* Search Input */}
              <div className="flex items-center mt-2 py-2 px-6 bg-gray-50 border rounded-md">
                <div className="flex items-center pr-2">
                  <CiSearch />
                </div>
                <input
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type="text"
                  placeholder="Type to search"
                  className="bg-transparent w-full focus:outline-none text-sm border-0 text-slate-700 h-[30px]"
                />
                <button title="clear" onClick={()=> setSearchInput("")}><IoIosClose/></button>
              </div>
  
              {/* Search Results */}
              <div className="text-left text-slate-500 py-2 mt-4 max-h-[300px] overflow-y-scroll">
                {Object.entries(result).length > 0 ? (
                  Object.entries(result).map(([key, items]) => (
                    <div key={key} className="result-section">
                      <h2 className="text-black">{key.replace("_", " ")}</h2>
                      <ul>
                        {items.map((item) => (
                          <div key={item.id}>
                            {renderSearchResult(item, searchInput)}
                          </div>
                        ))}
                      </ul>
                    </div>
                  ))
                ) : (
                  <p className="mt-12 text-center">No search result found.</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    )
}
export default SearchBar;