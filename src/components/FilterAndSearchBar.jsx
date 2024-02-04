import { useState } from 'react';
import DownArrow from '../assets/arrow-down-339-svgrepo-com.svg';
import MagnifyGlass from '../assets/search-svgrepo-com.svg';

function FilterAndSearchBar() {

    const [showFilters, setShowFilters] = useState(false);

    const toggleFilterOptions = () =>{
        setShowFilters(!showFilters);
    }

    return (
        <>
            <div className="w-full flex justify-between mb-12">
                <div className="w-[440px] h-14 pl-6 flex justify-between items-center bg-white rounded-md shadow-md">
                    <img src={MagnifyGlass} className="w-5 mr-4" />
                    <input type="text" placeholder="Search for a country..." className="w-full h-full outline-none" />
                </div>

                <div className="w-48 h-14 relative border-2 bg-white border-none rounded-md shadow-md">
                    <button onClick={toggleFilterOptions}
                    className="w-full h-full flex justify-between items-center px-5">
                        <span className="text-sm">Filter by Region</span>
                        <img src={DownArrow} className="w-3" />
                    </button>
                    <p className="w-40 flex justify-end absolute text-sm top-1/2 -translate-y-1/2 right-56">Current Filter: All</p>
                    <div className={`w-full h-56 absolute top-16 z-50 text-sm px-5 py-5 ${showFilters ?  'flex' : 'hidden'} flex-col justify-between items-start bg-white rounded-md shadow-md`}>
                        <button className="pl-1">All</button>
                        <button className="pl-1">Africa</button>
                        <button className="pl-1">Americas</button>
                        <button className="pl-1">Asia</button>
                        <button className="pl-1">Europe</button>
                        <button className="pl-1">Oceania</button>
                        <button className="pl-1">Polar</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default FilterAndSearchBar;