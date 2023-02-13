import {Routes, Route, Navigate} from "react-router-dom";
import './App.css';

import {MainLayout} from './mainLayout';
import {
    HomePage,
    LoginPage,
    MyAccountPage,
    NewsListPage,
    NewsPage,
    RegisterPage,
    RestaurantManagerPage,
    RestaurantPage,
    RestaurantsListPage,
    SuperAdminPage,
    UserEventsPageInRestaurant,
    UserEventsListPage,
    UsersListPage,
    UserEventPage,
    RestaurantForAdminPage,
    NewsForAdminPage, MarksInRestPage
} from "./pages";
import {CommentsInRest} from "./components";



const App = () => {
      return (
        <div>

            <Routes>
                <Route path={''} element={<MainLayout/>}>
                    <Route index element={<Navigate to={'home'}/>}/>
                    <Route path={'home'} element={<HomePage/>}/>
                    <Route path={'register'} element={<RegisterPage/>}/>
                    <Route path={'login'} element={<LoginPage/>}/>
                    <Route path={'myAccount'} element={<MyAccountPage/>}/>
                    <Route path={'restaurantManager'} element={<RestaurantManagerPage/>}/>
                    <Route path={'superAdmin'} element={<SuperAdminPage/>}/>
                    <Route path={'restaurants'} element={<RestaurantsListPage/>}/>
                    <Route path={'restaurants/:id'} element={<RestaurantPage/>}/>
                    <Route path={'restaurantsForAdmin/:id'} element={<RestaurantForAdminPage/>}/>
                    <Route path={'restaurantsForAdmin/:restId/newsForAdmin/:newsId'} element={<NewsForAdminPage/>}/>
                    <Route path={'restaurants/:id/comments'} element={<CommentsInRest/>}/>
                    <Route path={'restaurants/:id/marks'} element={<MarksInRestPage/>}/>
                    <Route path={'restaurants/:id/userEvents'} element={<UserEventsPageInRestaurant/>}/>
                    <Route path={'news'} element={<NewsListPage/>}/>
                    <Route path={'news/:id'} element={<NewsPage/>}/>
                    <Route path={'UserEvents'} element={<UserEventsListPage/>}/>
                    <Route path={'UserEvents/:id'} element={<UserEventPage/>}/>
                    <Route path={'Users'} element={<UsersListPage/>}/>
                </Route>
            </Routes>
        </div>
    );
}

export {App};
