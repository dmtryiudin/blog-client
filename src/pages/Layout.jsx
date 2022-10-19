import { Outlet } from "react-router-dom";
import HeaderComponent from "../components/HeaderComponent";
import FooterComponent from "../components/FooterComponent";

const Layout = () => {
    return (
        <div className="flex flex-col min-h-full">
            <HeaderComponent />
                <div className="flex-auto">
                    <div className="container">
                        <Outlet />
                    </div>
                </div>
            <FooterComponent />
        </div>
    )
}

export default Layout