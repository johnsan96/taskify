import { Outlet } from "react-router-dom"
import MainNavigation from "./MainNavigation"

const Layout = () => {
    return (
        <main className="App">
            <div className="">
                <div className="">
                    <MainNavigation />                    
                </div>
                <div className="col ms-5 mt-5 pe-5">          
                    <Outlet />
                </div>
            </div>
        </main>
    )
}

export default Layout
