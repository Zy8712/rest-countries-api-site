import { useLocation } from 'wouter';
import countryData from '../../data.json';

function RenderCards() {

    const [location, setLocation] = useLocation();

    const handleCardClick = (alpha3Code) => {
        setLocation(`/${alpha3Code}`);
    };

    const renderData = () => {
        return countryData.map((country, data) => (
            <>
                <div onClick={() => handleCardClick(country.alpha3Code)} key={country.alpha3Code}
                    className="w-64 h-[336px] rounded-md overflow-hidden shadow-lg group hover:scale-105 hover:cursor-pointer">
                    <div className="w-full h-40 flex justify-center items-center overflow-hidden">
                        <img src={country.flags.svg} className="object-cover w-full h-full" />
                    </div>
                    <div className="w-full h-44 px-6 pt-6">
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