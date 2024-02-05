import { Route, useParams, Link } from "wouter";
import { useSelector } from "react-redux";
import countryData from '../../data.json';

function CountryDetails() {

    const { darkMode } = useSelector(state => state.displayValue);

    const params = useParams();

    const selectedCountry = countryData.find(country => country.alpha3Code === params.countryCode);

    const getBorderCountries = (borderCountries) => {
        return borderCountries.map((code, index) => {
            const country = countryData.find((country) => country.alpha3Code === code);
            const countryName = country ? country.name : 'Unknown';
            return (
                <span key={index} className={`text-sm shadow-md ${darkMode ? 'shadow-white' : 'shadow-dark-gray-light-mode-input'} rounded-md mr-1 mb-3 px-4 py-1`}>
                    {countryName}
                </span>
            );
        });
    };

    return (
        <>
            <div className={`w-full min-h-screen flex flex-col px-8 custom-lg:px-24 pt-32 ${darkMode ? 'bg-very-dark-blue-dark-mode-background text-white' : 'bg-very-light-gray-light-mode-background text-very-dark-blue-light-mode-text'}`}>
                <div className="w-full mb-14">
                    <Link href="/">
                        <button className={`w-32 h-10 ${darkMode ? 'bg-dark-blue-dark-mode-elements shadow-white' : 'bg-white shadow-dark-gray-light-mode-input'} rounded-md shadow-2xl`}>
                            <i className="las la-arrow-left mr-3"></i>
                            Back
                        </button>
                    </Link>
                </div>

                <div className="w-full flex flex-col xl:flex-row justify-between items-center xl:items-start mb-32">
                    <div className="w-[98%] sm:w-[580px] h-auto sm:h-[400px] overflow-hidden">
                        <img src={selectedCountry.flags.svg} className="object-cover w-full h-full" />
                    </div>
                    <div className="w-[98%] sm:w-[560px]">
                        <h2 className="text-3xl font-extrabold mt-10 mb-7">{selectedCountry.name}</h2>
                        <div className="w-full flex flex-col sm:flex-row text-base">
                            <div className="w-full sm:w-1/2 flex flex-col mb-8">
                                <p className="mb-2">
                                    <span className="font-semibold">Native Name:</span> {selectedCountry.nativeName}
                                </p>
                                <p className="mb-2">
                                    <span className="font-semibold">Population:</span> {selectedCountry.population.toLocaleString('en-US', { style: 'decimal' })}
                                </p>
                                <p className="mb-2">
                                    <span className="font-semibold">Region:</span> {selectedCountry.region}
                                </p>
                                <p className="mb-2">
                                    <span className="font-semibold">Sub Region:</span> {selectedCountry.subregion}
                                </p>
                                <p className="mb-2">
                                    <span className="font-semibold">Capital:</span> {selectedCountry.capital}
                                </p>
                            </div>
                            <div className="w-full sm:w-1/2 flex flex-col">
                                <p className="mb-2">
                                    <span className="font-semibold">Top Level Domain:</span> {selectedCountry.topLevelDomain}
                                </p>
                                <p className="mb-2">
                                    <span className="font-semibold">Currencies:</span>&nbsp;
                                    {selectedCountry.currencies?.map((currency, index) => (
                                        <span key={currency.code}>
                                            {currency.name}
                                            {index < (selectedCountry.currencies?.length || 0) - 1 && ', '}
                                        </span>
                                    )) || 'Not available'}
                                </p>
                                <p className="mb-2">
                                    <span className="font-semibold">Languages:</span>&nbsp;
                                    {selectedCountry.languages?.map((language, index) => (
                                        <span key={language.code}>
                                            {language.name}
                                            {index < (selectedCountry.languages?.length || 0) - 1 && ', '}
                                        </span>
                                    )) || 'Not available'}
                                </p>
                            </div>
                        </div>
                        <div className="w-full flex flex-col sm:flex-row mt-16">
                            <p className="w-full sm:w-[25%] font-semibold mb-3">Border Countries:</p>
                            <div className="w-full sm:w-[75%] flex flex-wrap">
                                {selectedCountry.borders?.length > 0 ? getBorderCountries(selectedCountry.borders) : 'No bordering countries'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CountryDetails;