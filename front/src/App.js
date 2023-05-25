import {Routes, Route, Navigate} from 'react-router-dom';
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
    UserEventPage,
    RestaurantForAdminPage,
    NewsForAdminPage,
    MarksInRestPage,
    GeneralNewsPage,
    GeneralNewsListPage,
    UserPage,
    TopPageForAdmin,
    ForgotPasswordPage,
    ViewStatisticsPage,
    GeneralViewStatisticsPage,
    CommentsInRestPage,
    RegisterSuperadminPage,
    PrivacyPolicyPage,
} from './pages';
import {RestadminRoutes, SuperadminRoutes} from './routingAccess';

import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {

      return (
        <div>
            <Routes>
                <Route path={''} element={<MainLayout/>}>
                    <Route element={<SuperadminRoutes/>}>
                        <Route path={'superAdmin'} element={<SuperAdminPage/>}/>
                        <Route path={'superAdmin/top'} element={<TopPageForAdmin/>}/>
                        <Route path={'superAdmin/views'} element={<GeneralViewStatisticsPage/>}/>
                        <Route path={'users/:id'} element={<UserPage/>}/>
                    </Route>
                    <Route element={<RestadminRoutes/>}>
                        <Route path={'restaurantManager'} element={<RestaurantManagerPage/>}/>
                        <Route path={'restaurantsForAdmin/:id'} element={<RestaurantForAdminPage/>}/>
                        <Route path={'restaurantsForAdmin/:restId/newsForAdmin/:newsId'} element={<NewsForAdminPage/>}/>
                        <Route path={'restaurantsForAdmin/:id/viewStatistics'} element={<ViewStatisticsPage/>}/>
                    </Route>
                    <Route index element={<Navigate to={'home'}/>}/>
                    <Route path={'home'} element={<HomePage/>}/>
                    <Route path={'forgotPassword'} element={<ForgotPasswordPage/>}/>
                    <Route path={'register'} element={<RegisterPage/>}/>
                    <Route path={'/superadminRegistrationUrl'} element={<RegisterSuperadminPage/>}/>
                    <Route path={'login'} element={<LoginPage/>}/>
                    <Route path={'myAccount'} element={<MyAccountPage/>}/>
                    <Route path={'generalNews'} element={<GeneralNewsListPage/>}/>
                    <Route path={'generalNews/:id'} element={<GeneralNewsPage/>}/>
                    <Route path={'restaurants'} element={<RestaurantsListPage/>}/>
                    <Route path={'restaurants/:id'} element={<RestaurantPage/>}/>
                    <Route path={'restaurants/:id/comments'} element={<CommentsInRestPage/>}/>
                    <Route path={'restaurants/:id/marks'} element={<MarksInRestPage/>}/>
                    <Route path={'restaurants/:id/userEvents'} element={<UserEventsPageInRestaurant/>}/>
                    <Route path={'news'} element={<NewsListPage/>}/>
                    <Route path={'news/:id'} element={<NewsPage/>}/>
                    <Route path={'userEvents'} element={<UserEventsListPage/>}/>
                    <Route path={'userEvents/:id'} element={<UserEventPage/>}/>
                    <Route path={'privacyPolicy'} element={<PrivacyPolicyPage/>}/>
                </Route>
            </Routes>
        </div>
    );
};

export {App};
