import FilterAndSearchBar from "../components/FilterAndSearchBar";
import RenderCards from "../components/RenderCards";
import { useSelector } from "react-redux";

function Home() {

    const { darkMode } = useSelector(state => state.displayValue);

    return (
        <>
            <div className={`w-full flex flex-col pt-32 pb-12 px-24 ${darkMode ? 'bg-very-dark-blue-dark-mode-background' : 'bg-very-light-gray-light-mode-background'} text-very-dark-blue-light-mode-text`}>
                <FilterAndSearchBar />
                <RenderCards />
            </div>
        </>
    );
}

export default Home;