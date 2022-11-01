import HeaderProfileComponent from "./HeaderProfileComponent";

const HeaderComponent:React.FC = () => {
    return (
        <div className="h-28 bg-orange-500 flex items-center sm:p-12 p-4 justify-between">
            <a href="/">
                <h2 className="uppercase text-white text-4xl font-extrabold font-sans">Blog</h2>
            </a>
            <HeaderProfileComponent />
        </div>
    )
}

export default HeaderComponent