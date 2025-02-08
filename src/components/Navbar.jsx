import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from '../redux/settings';
import Logo from '../assets/world-map-svgrepo-com.svg'

function Navbar() {

    const { darkMode } = useSelector(state => state.displayValue);
    const dispatch = useDispatch();

    const [isMinimized, minimizeNavbar] = useState(false);

    const handleScroll = () => {
        if (window.scrollY > 300) {
            minimizeNavbar(true);
        } else {
            minimizeNavbar(false);
        }
    };

    // Add scroll event listener when the component mounts
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);// bugged delay transition, as dark mode delay is affecting navbar size change for light and dark mode - must separate into separate divs

    return (
        <>
            <div className={`w-full ${isMinimized ? 'h-14' : 'h-20'} fixed top-0 z-50 flex items-center shadow-lg duration-300 transition-all ease-in-out`}>
                <div className={`w-full min-h-full flex items-center px-4 sm:px-8 md:px-24  ${darkMode ? 'bg-dark-blue-dark-mode-elements text-white duration-100' : 'bg-white text-very-dark-blue-light-mode-text duration-500'} transition-all ease-in-out`}>

                    <div className="w-full h-10 flex items-center justify-between">

                        <div className="w-48 sm:w-60 h-full flex items-center relative">
                            <img src={Logo} alt="" className={`${isMinimized ? 'h-10 sm:h-12 mr-3' : 'h-12 sm:h-14 mr-4'} transition-all duration-300 ease-in-out`} />
                            <h1 className={`${isMinimized ? 'text-xl sm:text-2xl' : 'text-2xl sm:text-3xl'} font-extrabold duration-300 transition-all ease-in-out`}>
                                WorldView
                            </h1>
                            <a href="https://restcountries.com/"
                                className={`w-64 font-semibold underline underline-offset-2 absolute ${isMinimized ? ' text-[8px] sm:text-[10px] -bottom-0 sm:-bottom-1 -right-28' : 'text-[10px] sm:text-xs -bottom-2 sm:-bottom-3 -right-36'} duration-300 transition-all ease-in-out`}>
                                Powered by REST Countries API
                                <i className="las la-external-link-alt ml-1"></i>
                            </a>
                        </div>

                        <button onClick={() => dispatch(toggleDarkMode())}
                            className="font-semibold px-3 py-2">
                            <i className="las la-moon mr-2 text-xl"></i>
                            <span className="hidden custom-xs:inline">Dark Mode</span>
                        </button>

                    </div>

                </div>
            </div>
        </>
    );
}

export default Navbar;