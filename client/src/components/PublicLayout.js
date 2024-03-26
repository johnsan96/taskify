import { Outlet } from "react-router-dom"
import PublicNavigation from "./PublicNavigation"

const PublicLayout = () => {
    return (
        <main className="App">
            <div className="">
                <div className="">
                    <PublicNavigation />                    
                </div>
                <div className="col ms-5 mt-5 pe-5">          
                    <Outlet />
                </div>
            </div>
        </main>
    )
}

export default PublicLayout
