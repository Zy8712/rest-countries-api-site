import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from '../redux/settings';
import Logo from '../assets/world-map-svgrepo-com.svg'

function Navbar() {

    const { darkMode } = useSelector(state => state.displayValue);
    const dispatch = useDispatch();

    return (
        <>
            <div className={`w-full h-20 fixed top-0 z-50 flex items-center ${darkMode ? 'bg-dark-blue-dark-mode-elements text-white' : 'bg-white text-very-dark-blue-light-mode-text'} px-4 sm:px-8 md:px-24 shadow-lg transition-all duration-500 ease-in-out`}>
                <div className="w-full h-10 flex items-center justify-between">
                    <div className="w-48 sm:w-60 h-full flex items-center relative">
                        <img src={Logo} alt="" className="h-12 sm:h-14 mr-4" />
                        <h1 className="text-2xl sm:text-3xl font-extrabold">
                            WorldView
                        </h1>
                        <a href="https://restcountries.com/"
                            className="w-64 text-[10px] sm:text-xs font-semibold underline underline-offset-2 absolute -bottom-2 sm:-bottom-3 -right-36">
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
        </>
    );
}

export default Navbar;