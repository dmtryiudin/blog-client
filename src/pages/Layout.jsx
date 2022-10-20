import { Outlet } from "react-router-dom";
import HeaderComponent from "../components/HeaderComponent";
import FooterComponent from "../components/FooterComponent";

const Layout = () => {
    return (
        <div className="min-h-full flex flex-col">
            <HeaderComponent />
            <div className="flex-auto">
                <div className="container mx-auto px-14">
                    <Outlet />
                </div>
            </div>
            <FooterComponent />
        </div>
    )
}

export default Layout