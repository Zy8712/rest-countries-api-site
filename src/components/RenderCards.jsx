import { useLocation } from 'wouter';
import { useEffect, useState } from 'react'; // Import useEffect and useState
import countryData from '../../data.json';
import { useSelector } from "react-redux";
import { setPaginationSettings } from '../redux/settings';

function RenderCards() {
    const { searchValue, filterValue, darkMode } = useSelector(state => state.displayValue);
    const [location, setLocation] = useLocation();
    const [visibleCardsCount, setVisibleCardsCount] = useState(16); // State to track number of visible cards

    // SCREEN RESIZE. CARD LOAD COUNT CHANGED.
    // Alters the number of cards loaded upon site load and the number of cards loaded each time (via. infinite scrolling) we react the bottom of the page
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setVisibleCardsCount(6); // Update visible cards count for smaller screens
            } else {
                setVisibleCardsCount(16); // Default value for larger screens
            }
        };

        // Initial call to set the correct visible cards count based on screen size
        handleResize();

        // Add event listener to update visible cards count when the window is resized
        window.addEventListener('resize', handleResize);

        // Cleanup function to remove event listener when component unmounts
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []); // Empty dependency array ensures that this effect runs only once after initial render


    // PAGE CHANGE TO COUNTRY DETAILS PAGE
    const handleCardClick = (alpha3Code) => {
        setLocation(`/${alpha3Code}`);
    };


    // DROPDOWN REGION FILTER MENU OPTIONS.
    const regionNames = ['', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania', 'Polar'];

    const getRegionNameFromFilterValue = (filterValue) => {
        return regionNames[filterValue - 1];
    };


    // SEARCHBAR STRING SEARCH.
    const filteredCountries = countryData.filter(country => {
        const matchesFilter = filterValue === 1 || country.region === getRegionNameFromFilterValue(filterValue);
        const matchesSearch = searchValue === '' || country.name.toLowerCase().includes(searchValue.toLowerCase());
        return matchesSearch && matchesFilter;
    });


    // INFINITE SCROLLING CARD LOADING.
    useEffect(() => {
        const handleScroll = () => {
            const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

            if (scrollTop + clientHeight >= scrollHeight - 100) { // Load more cards when user is near the bottom
                setVisibleCardsCount(prevCount => prevCount + 16);
            }
        };

        const handleResize = debounce(() => {
            // Recalculate visible cards count based on window size
            // Adjust visibleCardsCount based on new viewport dimensions
            // Perform necessary calculations based on resized window
            setVisibleCardsCount(16); // Reset visible cards count on resize
        }, 300); // Debounce resize events with a 300ms delay

        window.addEventListener('scroll', handleScroll); // Add scroll event listener
        window.addEventListener('resize', handleResize); // Add resize event listener

        return () => {
            window.removeEventListener('scroll', handleScroll); // Clean up scroll event listener on unmount
            window.removeEventListener('resize', handleResize); // Clean up resize event listener on unmount
        };
    }, []); // Run effect only once


    // CARD RENDERING.
    const renderData = () => {
        return filteredCountries.slice(0, visibleCardsCount).map(country => (
            <div key={country.alpha3Code} onClick={() => handleCardClick(country.alpha3Code)}
                className={`w-64 h-[336px] rounded-md overflow-hidden ${darkMode ? 'shadow-white shadow-2xl' : 'shadow-dark-gray-light-mode-input shadow-lg'} group hover:scale-110 hover:cursor-pointer transition-all duration-500 ease-in-out`}>
                <div className="w-full h-40 flex justify-center items-center overflow-hidden">
                    <img src={country.flags.svg} className="object-cover w-full h-full" alt={country.name} />
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
    }

    return (
        <>
            <div className="flex flex-wrap justify-around gap-16">
                {renderData()}
            </div>
        </>
    );
}

export default RenderCards;

function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}