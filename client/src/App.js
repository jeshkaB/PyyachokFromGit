import {Routes, Route, Navigate} from "react-router-dom";

import {MainLayout} from './mainLayout';
import {
    CreateUserEventPage, HomePage,
    LoginPage,
    MyAccountPage, NewsListPage, NewsPage,
    RegisterPage,
    RestaurantAdminPage, RestaurantPage,
    SuperAdminPage, UserEventPage, UserEventsListPage
} from "./pages";

function App() {
    return (
        <div>
            <Routes>
                <Route path={''} element={<MainLayout/>}>
                    <Route index element={<Navigate to={'home'}/>}/>
                    <Route path={'home'} element={<HomePage/>}/>
                    <Route path={'register'} element={<RegisterPage/>}/>
                    <Route path={'login'} element={<LoginPage/>}/>
                    <Route path={'myAccount'} element={<MyAccountPage/>}/>
                    <Route path={'restaurantAdmin'} element={<RestaurantAdminPage/>}/>
                    <Route path={'superAdmin'} element={<SuperAdminPage/>}/>
                    {/*<Route path={'restaurants'} element={<RestaurantsListPage/>}/>*/}
                    <Route path={'restaurants/:id'} element={<RestaurantPage/>}/>
                    <Route path={'news'} element={<NewsListPage/>}/>
                    <Route path={'news/:id'} element={<NewsPage/>}/>
                    <Route path={'createUserEvent'} element={<CreateUserEventPage/>}/>
                    <Route path={'UserEvents'} element={<UserEventsListPage/>}/>
                    <Route path={'UserEvents/:id'} element={<UserEventPage/>}/>
                </Route>
            </Routes>
        </div>
    );
}

export {App};
