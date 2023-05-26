import {Outlet, Navigate} from 'react-router-dom';

import {roles} from '../constants';
import {authService} from '../services';

const SuperadminRoutes = () => {

    const role = authService.getUserRoleInLS();

    return (
        role?.includes(roles.SUPER_ADMIN) ? <Outlet/> : <Navigate to ='login'/>
    );
};

export {SuperadminRoutes};
