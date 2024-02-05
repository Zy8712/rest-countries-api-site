import FilterAndSearchBar from "../components/FilterAndSearchBar";
import RenderCards from "../components/RenderCards";
import { useSelector } from "react-redux";

function Home() {

    const { darkMode } = useSelector(state => state.displayValue);

    return (
        <>
            <div className={`w-full h-auto flex flex-col pt-32 pb-20 px-4 sm:px-10 lg:px-24 ${darkMode ? 'bg-very-dark-blue-dark-mode-background text-white' : 'bg-very-light-gray-light-mode-background text-very-dark-blue-light-mode-text'}`}>
                <FilterAndSearchBar />
                <RenderCards />
            </div>
        </>
    );
};

export default Home;