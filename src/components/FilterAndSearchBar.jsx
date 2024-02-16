import { useState } from 'react';
import DownArrow from '../assets/arrow-down-339-svgrepo-com.svg';
import DownArrowWhite from '../assets/arrow-down-339-white-svgrepo-com.svg';
import MagnifyGlass from '../assets/search-svgrepo-com.svg';
import MagnifyGlassWhite from '../assets/search-white-svgrepo-com.svg';
import XMark from '../assets/cross-svgrepo-com.svg';
import XMarkWhite from '../assets/cross-white-svgrepo-com.svg';
import { useDispatch, useSelector } from "react-redux";
import { alterFilterValue, alterSearchValue } from '../redux/settings';

function FilterAndSearchBar() {

    const filterOptions = ["All", "Africa", "Americas", "Asia", "Europe", "Oceania", "Polar"];

    const dispatch = useDispatch();
    const { searchValue, filterValue, darkMode } = useSelector(state => state.displayValue);

    const setSearchQuery = (value) => {
        dispatch(alterSearchValue(value));
    }

    const [showFilters, setShowFilters] = useState(false);

    const toggleFilterOptions = () => {
        setShowFilters(!showFilters);
    }

    return (
        <>
            <div className={`w-full flex flex-col custom-md:flex-row justify-start custom-md:justify-between items-center custom-md:items-start mb-12 ${darkMode ? 'text-white' : 'text-very-dark-blue-light-mode-text'} `}>
                <div className={`w-[98%] sm:w-[440px] h-14 relative flex justify-between items-center mb-5 custom-md:mb-0 ${darkMode ? 'bg-dark-blue-dark-mode-elements shadow-white' : 'bg-white shadow-dark-blue-dark-mode-elements'} rounded-md overflow-hidden shadow-2xl transition-all duration-500 ease-in-out`}>
                    <img src={MagnifyGlass} alt="" className={`${darkMode ? 'hidden' : 'inline'} absolute left-6 w-5`} />
                    <img src={MagnifyGlassWhite} alt="" className={`${darkMode ? 'inline' : 'hidden'} absolute left-6 w-5`} />
                    <input type="text"
                        placeholder="Search for a country..."
                        className="w-full h-full pl-14 bg-transparent outline-none"
                        value={searchValue}
                        onChange={(e) => setSearchQuery(e.target.value)} />
                    <button onClick={() => dispatch(alterSearchValue(''))}
                        className={`absolute right-6 ${searchValue != "" ? 'inline' : 'hidden'}`}>
                        <img src={XMark} alt="close button" className={`${darkMode ? 'hidden' : 'inline'} w-8`} />
                        <img src={XMarkWhite} alt="close button" className={`${darkMode ? 'inline' : 'hidden'} w-8`} />
                    </button>
                </div>

                <div className={`w-48 h-14 relative ml-36 custom-md:mr-0 ${darkMode ? 'bg-dark-blue-dark-mode-elements shadow-white' : 'bg-white shadow-dark-blue-dark-mode-elements'} rounded-md shadow-2xl transition-all duration-500 ease-in-out`}>
                    <button
                        onClick={toggleFilterOptions}
                        className="w-full h-full flex justify-between items-center px-5 focus:outline-none"
                    >
                        <span className="text-sm font-semibold">Filter by Region</span>
                        <img src={DownArrow} alt="" className={`w-3 transition-transform transform ${darkMode ? 'hidden' : 'inline'} ${showFilters ? 'rotate-180' : ''}`} />
                        <img src={DownArrowWhite} alt="" className={`w-3 transition-transform transform ${darkMode ? 'inline' : 'hidden'} ${showFilters ? 'rotate-180' : ''}`} />
                    </button>
                    <p className="w-40 flex justify-end absolute text-sm font-semibold top-1/2 -translate-y-1/2 right-56">Current Filter: {filterOptions[filterValue - 1]}</p>
                    <div
                        className={`w-full h-56 absolute top-16 z-50 text-sm px-5 py-5 ${showFilters ? 'flex' : 'hidden'} flex-col justify-between items-start ${darkMode ? 'bg-dark-blue-dark-mode-elements' : 'bg-white'} rounded-md shadow-md`}
                    >
                        <button onClick={() => dispatch(alterFilterValue(1))}
                            className="w-full text-left pl-1">All</button>
                        <button onClick={() => dispatch(alterFilterValue(2))}
                            className="w-full text-left pl-1">Africa</button>
                        <button onClick={() => dispatch(alterFilterValue(3))}
                            className="w-full text-left pl-1">Americas</button>
                        <button onClick={() => dispatch(alterFilterValue(4))}
                            className="w-full text-left pl-1">Asia</button>
                        <button onClick={() => dispatch(alterFilterValue(5))}
                            className="w-full text-left pl-1">Europe</button>
                        <button onClick={() => dispatch(alterFilterValue(6))}
                            className="w-full text-left pl-1">Oceania</button>
                        <button onClick={() => dispatch(alterFilterValue(7))}
                            className="w-full text-left pl-1">Polar</button>
                    </div>
                </div>

            </div>
        </>
    );
}

export default FilterAndSearchBar;