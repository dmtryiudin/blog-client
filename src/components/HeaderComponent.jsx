import HeaderProfileComponent from "./HeaderProfileComponent";

const HeaderComponent = () => {
    return (
        <div className="h-28 bg-orange-500 flex items-center p-12 justify-between">
            <h2 className="uppercase text-white text-4xl font-extrabold font-sans">Blog title</h2>
            <HeaderProfileComponent />
        </div>
    )
}

export default HeaderComponent