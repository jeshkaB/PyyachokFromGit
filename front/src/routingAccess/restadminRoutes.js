import {Outlet, Navigate} from 'react-router-dom';

import {roles} from '../constants';
import {authService} from '../services';

const RestadminRoutes = () => {

    const role = authService.getUserRoleInLS();

       return (
        (role?.includes(roles.SUPER_ADMIN) || role?.includes(roles.REST_ADMIN)) ? <Outlet/> : <Navigate to ='login'/>
    );
};

export {RestadminRoutes};
