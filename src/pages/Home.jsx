import FilterAndSearchBar from "../components/FilterAndSearchBar";
import RenderCards from "../components/RenderCards";

function Home() {
    return (
        <>
            <div className="w-full flex flex-col pt-32 pb-12 px-24 bg-very-light-gray-light-mode-background text-very-dark-blue-light-mode-text">
                <FilterAndSearchBar />
                <RenderCards />
            </div>
        </>
    );
}

export default Home;