import { useState } from 'react';
import DownArrow from '../assets/arrow-down-339-svgrepo-com.svg';
import MagnifyGlass from '../assets/search-svgrepo-com.svg';
import XMark from '../assets/cross-svgrepo-com.svg';
import { useDispatch, useSelector } from "react-redux";
import { alterFilterValue, alterSearchValue } from '../redux/settings';

function FilterAndSearchBar() {

    const filterOptions = ["All", "Africa", "Americas", "Asia", "Europe", "Oceania", "Polar"];

    const dispatch = useDispatch();
    const { searchValue, filterValue } = useSelector(state => state.displayValue);

    const setSearchQuery = (value) => {
        dispatch(alterSearchValue(value));
    }

    const [showFilters, setShowFilters] = useState(false);

    const toggleFilterOptions = () => {
        setShowFilters(!showFilters);
    }

    return (
        <>
            <div className="w-full flex justify-between mb-12">
                <div className="w-[440px] h-14 relative flex justify-between items-center bg-white rounded-md shadow-md">
                    <img src={MagnifyGlass} className="absolute left-6 w-5" />
                    <input type="text"
                        placeholder="Search for a country..."
                        className="w-full h-full pl-14"
                        value={searchValue}
                        onChange={(e) => setSearchQuery(e.target.value)} />
                    <button onClick={() => dispatch(alterSearchValue(''))}
                        className={`absolute right-6 ${searchValue != "" ? 'inline' : 'hidden'}`}>
                        <img src={XMark} className="w-8" />
                    </button>
                </div>

                <div className="w-48 h-14 relative border-2 bg-white rounded-md shadow-md">
                    <button
                        onClick={toggleFilterOptions}
                        className="w-full h-full flex justify-between items-center px-5 focus:outline-none"
                    >
                        <span className="text-sm">Filter by Region</span>
                        <img src={DownArrow} className={`w-3 transition-transform transform ${showFilters ? 'rotate-180' : ''}`} alt="Down Arrow" />
                    </button>
                    <p className="w-40 flex justify-end absolute text-sm top-1/2 -translate-y-1/2 right-56">Current Filter: {filterOptions[filterValue - 1]}</p>
                    <div
                        className={`w-full h-56 absolute top-16 z-50 text-sm px-5 py-5 ${showFilters ? 'flex' : 'hidden'} flex-col justify-between items-start bg-white rounded-md shadow-md`}
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