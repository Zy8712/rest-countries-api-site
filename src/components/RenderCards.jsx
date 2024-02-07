import { useLocation } from 'wouter';
import countryData from '../../data.json';
import { useSelector } from "react-redux";
import { useState, useEffect } from 'react'; // Import useState and useEffect

function RenderCards() {
    const { searchValue, filterValue, darkMode } = useSelector(state => state.displayValue);
    const [location, setLocation] = useLocation();

    // Define getRegionNameFromFilterValue function
    const getRegionNameFromFilterValue = (filterValue) => {
        const regionNames = ['', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania', 'Polar'];
        return regionNames[filterValue - 1];
    };

    // Define state to track the number of cards to render initially
    const [visibleCardsCount, setVisibleCardsCount] = useState(32); // Initial number of cards to load

    // Listen for scrolling events to load more cards
    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight
            ) {
                // Reached the bottom of the page, load more cards
                setVisibleCardsCount(prevCount => prevCount + 32); // Load additional 32 cards
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []); // Run this effect only once

    const filteredCountries = countryData
        .filter(country => {
            const matchesFilter = filterValue === 1 || country.region === getRegionNameFromFilterValue(filterValue);

            const matchesSearch = searchValue === '' || country.name.toLowerCase().includes(searchValue.toLowerCase());

            return matchesSearch && matchesFilter;
        });

    // Adjust the filteredCountries array based on the visibleCardsCount
    const visibleCountries = filteredCountries.slice(0, visibleCardsCount);

    const renderData = () => {
        return visibleCountries.map((country) => (
            <div key={country.alpha3Code}
                onClick={() => handleCardClick(country.alpha3Code)}
                className={`w-64 h-[336px] rounded-md overflow-hidden ${darkMode ? 'shadow-white shadow-2xl' : 'shadow-dark-gray-light-mode-input shadow-lg'} group hover:scale-110 hover:cursor-pointer transition-all duration-500 ease-in-out`}
            >
                <div className="w-full h-40 flex justify-center items-center overflow-hidden">
                    <img src={country.flags.svg} className="object-cover w-full h-full" />
                </div>
                <div className={`w-full h-44 px-6 pt-6 ${darkMode ? 'bg-dark-blue-dark-mode-elements' : 'bg-white'}`}>
                    <div className="w-full h-full">
                        <p className="font-extrabold mb-3">{country.name}</p>
                        <p className="text-sm mb-1">
                            <span className="font-bold">Population:</span> {country.population.toLocaleString('en-US', { style: 'decimal' })}
                        </p>
                        <p className="text-sm mb-1">
                            <span className="font-bold">Region:</span> {country.region}
                        </p>
                        <p className="text-sm mb-1">
                            <span className="font-bold">Capital:</span> {country.capital}
                        </p>
                    </div>
                </div>
            </div>
        ));
    };

    const handleCardClick = (alpha3Code) => {
        setLocation(`/${alpha3Code}`);
    };

    return (
        <>
            <div className="flex flex-wrap justify-around gap-16">
                {renderData()}
            </div>
        </>
    );
}

export default RenderCards;
