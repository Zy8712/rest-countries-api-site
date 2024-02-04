import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from '../redux/settings';

function Navbar() {

    const { darkMode } = useSelector(state => state.displayValue);
    const dispatch = useDispatch();

    return (
        <>
            <div className={`w-full h-20 absolute z-50 flex items-center ${darkMode ? 'bg-dark-blue-dark-mode-elements' : 'bg-white'} px-24 shadow-lg`}>
                <div className="w-full h-10 flex items-center justify-between">
                    <h1 className="text-very-dark-blue-light-mode-text text-2xl font-extrabold">
                        Where in the world?
                    </h1>
                    <button onClick={() => dispatch(toggleDarkMode())}
                    className="font-semibold px-3 py-2">
                        <i className="las la-moon mr-1"></i>
                        Dark Mode
                    </button>
                </div>
            </div>
        </>
    );
}

export default Navbar;