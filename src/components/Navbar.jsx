
function Navbar() {
    return (
        <>
            <div className="w-full h-20 absolute z-50 flex items-center bg-white px-24 shadow-lg">
                <div className="w-full h-10 flex items-center justify-between">
                    <h1 className="text-very-dark-blue-light-mode-text text-2xl font-extrabold">
                        Where in the world?
                    </h1>
                    <button className="font-semibold">
                        <i className="las la-moon mr-1"></i>
                        Dark Mode
                    </button>
                </div>
            </div>
        </>
    );
}

export default Navbar;