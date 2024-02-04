import { Route, useParams, Link } from "wouter";
import countryData from '../../data.json';

function CountryDetails() {

    const params = useParams();

    const selectedCountry = countryData.find(country => country.alpha3Code === params.countryCode);

    const getBorderCountries = (borderCountries) => {
        return borderCountries.map((code, index) => {
            const country = countryData.find((country) => country.alpha3Code === code);
            const countryName = country ? country.name : 'Unknown';
            return (
                <span key={index} className="text-sm shadow-md shadow-black rounded-md mr-1 mb-3 px-4 py-1">
                    {countryName}
                </span>
            );
        });
    };

    return (
        <>
            <div className="w-full h-screen flex flex-col px-24 pt-32 bg-very-light-gray-light-mode-background text-very-dark-blue-light-mode-text">
                <div className="w-full mb-14">
                    <Link href="/">
                        <button className="w-32 h-10 rounded-md shadow-md" >
                            <i className="las la-arrow-left mr-3"></i>
                            Back
                        </button>
                    </Link>
                </div>
                <div className="w-full flex justify-between">
                    <div className="w-[580px] h-[400px] overflow-hidden">
                        <img src={selectedCountry.flags.svg} className="object-cover w-full h-full" />
                    </div>
                    <div className="w-[560px]">
                        <h2 className="text-3xl font-extrabold mt-10 mb-7">{selectedCountry.name}</h2>
                        <div className="w-full flex text-base">
                            <div className="w-1/2 flex flex-col">
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
                            <div className="w-1/2 flex flex-col">
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
                        <div className="w-full flex mt-16">
                            <p className="w-[25%] font-semibold">Border Countries:</p>
                            <div className="w-[75%] flex flex-wrap">
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