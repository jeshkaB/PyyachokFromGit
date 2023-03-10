import {ChangeManager, CommentsInRest, NewsCreate, NewsForAdmin, NewsList, RestaurantForAdmin} from "../components";
import {useDispatch, useSelector} from "react-redux";
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import {roles} from "../constants";

import {restaurantActions} from "../redux";
import {useEffect} from "react";

const RestaurantForAdminPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams();
    const {role, isAuth} = useSelector(state => state.auth)
    const {errors} = useSelector(state => state.restaurant);


    const {restaurant} = useSelector(state => state.restaurant);

    useEffect(() => {
        dispatch(restaurantActions.getById(id))
    }, []);


    return (
        <div>
            {errors &&
                <h3 className={'errors'}> {errors.message} </h3>}
            {isAuth && role.includes(roles.SUPER_ADMIN) && <ChangeManager restId = {id}/>}
            <RestaurantForAdmin restId = {id} role = {role} restaurant={restaurant}/>

            <h3 style={{cursor: 'pointer', color: "green"}}
                onClick={() => navigate(`/restaurants/${id}/marks`)}> Оцінки</h3>

            <hr/>
            {/*<h3 style={{cursor: 'pointer', color: "green"}}*/}
            {/*    onClick={() => navigate(`/restaurants/${id}/comments`)}>Відгуки</h3>*/}
            <Link to={`../restaurants/${id}/comments`}><h3>Всі відгуки</h3></Link>
            <CommentsInRest/>
            <hr/>
            <h3 style={{color: "green"}}> Новини</h3>
            <NewsCreate restId={id}/>
            <NewsList restId={id}/>

        </div>
    );
};

export {RestaurantForAdminPage};
