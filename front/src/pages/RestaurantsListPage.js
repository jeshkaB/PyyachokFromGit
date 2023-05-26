import {RestaurantsList} from '../components';
import {useLocation} from 'react-router-dom';

const RestaurantsListPage = () => {
    const location = useLocation();
    const tag = location.state?.tag || '';
    return (
        <div>
            <RestaurantsList tag={tag}/>
        </div>
    );
};

export {RestaurantsListPage};
