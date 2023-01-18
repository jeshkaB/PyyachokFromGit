import {Outlet} from 'react-router-dom'
import {Header} from "../components";



function MainLayout(props) {
    return (
        <div>
            <Header/>
            <Outlet/>
        </div>
    );
}

export {MainLayout};
