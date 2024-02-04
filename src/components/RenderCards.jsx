import { useLocation } from 'wouter';
import countryData from '../../data.json';
import { useSelector } from "react-redux";

function RenderCards() {
    const { searchValue, filterValue } = useSelector(state => state.displayValue);

    const [location, setLocation] = useLocation();

    const handleCardClick = (alpha3Code) => {
        setLocation(`/${alpha3Code}`);
    };

    const getRegionNameFromFilterValue = (filterValue) => {
        switch (filterValue) {
            case 1:
                return ''; // Default, include all regions
            case 2:
                return 'Africa';
            case 3:
                return 'Americas';
            case 4:
                return 'Asia';
            case 5:
                return 'Europe';
            case 6:
                return 'Oceania';
            case 7:
                return 'Polar';
            default:
                return '';
        }
    };


    const filteredCountries = countryData.filter(country => {
        const matchesFilter = filterValue === 1 || country.region === getRegionNameFromFilterValue(filterValue);

        const matchesSearch = searchValue === '' || country.name.toLowerCase().includes(searchValue.toLowerCase());

        return matchesSearch && matchesFilter;
    });

    const renderData = () => {
        return filteredCountries.map((country, data) => (
            <>
                <div onClick={() => handleCardClick(country.alpha3Code)} key={country.alpha3Code}
                    className="w-64 h-[336px] rounded-md overflow-hidden shadow-lg group hover:scale-105 hover:cursor-pointer">
                    <div className="w-full h-40 flex justify-center items-center overflow-hidden">
                        <img src={country.flags.svg} className="object-cover w-full h-full" />
                    </div>
                    <div className="w-full h-44 px-6 pt-6 bg-white">
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
            </>
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