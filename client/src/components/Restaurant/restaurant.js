import API_URL from "../../config";
import {StarsRating} from "../StarsRating/starsRating";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {restaurantActions, userActions} from "../../redux";
import {Link, useParams} from "react-router-dom";


const Restaurant = () => {

    const {restaurant} = useSelector(state => state.restaurant);
    const {userId} = useSelector(state => state.auth)
    const {user, isFavorite} = useSelector(state => state.user)
    const {id} = useParams();
    const {favoriteRestaurants} = user;

    let alreadyFavorite
    if (favoriteRestaurants) alreadyFavorite = favoriteRestaurants.includes(id);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(restaurantActions.getById(id))
    }, [id]);

    useEffect(() => {
        dispatch(userActions.getById(userId))
    }, [id, isFavorite]);


//TODO щось дуже перемудрила з "додати до улюблених" стосовно стану улюблений/не улюблений - тре подумати
    const addFavorite = async () => {
        await dispatch(userActions.addFavoriteRest({userId, restId: id}))
    };
    const removeFavorite = async () => {
        await dispatch(userActions.removeFavoriteRest({userId, restId: id}))
    };

    return (
        <div>
            <div>
                <h1>{restaurant.name}</h1>
                {(isFavorite || alreadyFavorite) === false &&
                    <div>
                        <h3 style={{cursor: "pointer"}} onClick={() => addFavorite()}>Додати до улюблених</h3>
                        {/*<label><input type="checkbox" onChange={()=>addFavorite()}/>Додати до улюблених</label>*/}
                    </div>}
                {(isFavorite || alreadyFavorite) === true &&
                    <div>
                        <h3 style={{cursor: "pointer"}} onClick={() => removeFavorite()}>Прибрати з улюблених</h3>
                    </div>}
                <div>
                    <Link to={'userEvents'}><h3 style={{cursor: "pointer", fontFamily: 'cursive', color: 'blue'}}> Пиячок </h3></Link>

                </div>
            </div>

            <img width={'50%'} src={API_URL + restaurant.mainImage} alt={'зображення закладу'}/>
            <div><StarsRating rating={restaurant.rating}/></div>
            <div> Адреса: {restaurant.place}</div>
            <div> Телефон: {restaurant.phone}</div>
            <div> Режим роботи: {restaurant.hours}</div>
            <div> email: {restaurant.email} </div>
            <div> Сайт: {restaurant.webSite} </div>
            <div> Середній чек:{restaurant.averageBill} грн.</div>

        </div>
    )
};

export {Restaurant};
