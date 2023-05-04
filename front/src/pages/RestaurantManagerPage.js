import {useSelector} from 'react-redux';
import {useState} from 'react';

import {RestaurantCreate, RestaurantsForModeration, RestaurantsList} from '../components';

const RestaurantManagerPage = () => {
    const {userId} = useSelector(state => state.auth);
    const [wasCreated, setWasCreated] = useState(false);

    return (
        <div style={{marginLeft:20}}>
            <RestaurantCreate wasCreated={wasCreated} setWasCreated={setWasCreated}/>
            <div style={{border: 'solid 1px gray', borderRadius:20, padding: 10}}>
                <h3>Заклади на модерації </h3>
                <RestaurantsForModeration userId={userId} wasCreated={wasCreated}/>
             </div>
            <div>
            <h3>Мої заклади </h3>
            <RestaurantsList userId={userId}/>
            </div>
        </div>
    );
};

export {RestaurantManagerPage};
