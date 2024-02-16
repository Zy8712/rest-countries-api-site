import { Route, useParams, Link } from "wouter";
import { useSelector } from "react-redux";
import countryData from '../../data.json';
import { useState } from "react";

import XMarkWhite from "../assets/cross-white-svgrepo-com.svg";
import XMarkBlack from "../assets/cross-svgrepo-com.svg";

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

    const [fullFlagDisplay, setFullFlagDisplay] = useState(false);

    const toggleFullFlag = () => {
        setFullFlagDisplay(!fullFlagDisplay);
    }

    return (
        <>
            <div className={`w-full min-h-screen flex flex-col px-8 custom-lg:px-24 pt-32 ${darkMode ? 'bg-very-dark-blue-dark-mode-background text-white' : 'bg-very-light-gray-light-mode-background text-very-dark-blue-light-mode-text transition-all duration-500 ease-in-out'}`}>
                <div className="w-full mb-14">
                    <Link href="/">
                        <button className={`w-32 h-10 ${darkMode ? 'bg-dark-blue-dark-mode-elements shadow-white' : 'bg-white shadow-dark-gray-light-mode-input'} font-bold rounded-md shadow-2xl`}>
                            <i className="las la-arrow-left mr-3"></i>
                            Back
                        </button>
                    </Link>
                </div>

                <div className="w-full flex flex-col xl:flex-row justify-between items-center xl:items-start mb-32">
                    <div className="w-[98%] sm:w-[580px] h-auto sm:h-[400px] relative">
                        <img src={selectedCountry.flags.svg} className="object-cover w-full h-full" />
                        <button onClick={toggleFullFlag}
                            className={`w-44 h-10 flex justify-center items-center ${darkMode ? 'bg-very-dark-blue-dark-mode-background text-white border-very-light-gray-light-mode-background' : 'bg-very-light-gray-light-mode-background text-very-dark-blue-light-mode-text border-very-dark-blue-light-mode-text'}  font-extrabold absolute -bottom-12 left-auto xl:left-0 right-0 xl:right-auto border-2 border-solid`}>
                            <i className="las la-expand text-xl mr-3"></i>
                            View Full Flag
                        </button>
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

            <div className={`w-screen h-full ${fullFlagDisplay ? 'flex' : 'hidden'} justify-center items-start sm:items-center absolute z-50 top-0 bg-custom-translucent-black`}>
                <img src={selectedCountry.flags.svg} className="w-[95%] sm:w-[620px] md:w-[640px] custom-md:w-[768px] lg:w-[900px] xl:w-[1024px] mt-40 sm:mt-0 transition-all duration-500 ease-in-out" />
                <button onClick={toggleFullFlag}
                    className={`w-12 h-12 flex justify-center items-center absolute top-5 right-5 ${darkMode ? 'border-white' : 'border-black'} border-2 border-solid rounded-full`}>
                    <img src={XMarkWhite} className={`${darkMode ? 'inline' : 'hidden'}`} />
                    <img src={XMarkBlack} className={`${darkMode ? 'hidden' : 'inline'}`} />
                </button>
            </div>
        </>
    );
}

export default CountryDetails;

// to do: stop overscroll behaviour,  fix site layout for super large screen, mobile resposiveness for new features, improve animations and mobile responsiveness