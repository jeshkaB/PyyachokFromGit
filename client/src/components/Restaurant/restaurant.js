import API_URL from "../../config";
import {StarsRating} from "../StarsRating/starsRating";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {authActions, restaurantActions, userActions} from "../../redux";
import {Link, useParams} from "react-router-dom";
import {Tag} from "../Tag/Tag";


const Restaurant = () => {
    const dispatch = useDispatch();
    const {restaurant} = useSelector(state => state.restaurant);
    const {user} = useSelector(state => state.user);
    const {authUser, isAuth} = useSelector(state => state.auth)
    const {id} = useParams();


    const tags = restaurant?.tags?.split(',').map(tag => tag.trim());

    let alreadyFavorite=false
    let userId = null
    if (isAuth)  {
        alreadyFavorite = user.favoriteRestaurants?.includes(id);
        userId=authUser._id
    }
    const [stateFavorite, setStateFavorite] = useState(alreadyFavorite);

    useEffect(() => {
        dispatch(restaurantActions.getById(id))
    }, []);

    useEffect(() => {
        dispatch(userActions.getById(userId))
    }, [stateFavorite]);


    const addFavorite = async () => {
        if (isAuth) {
            await dispatch(authActions.addFavoriteRest({userId, restId: id}));
            setStateFavorite(true)
        }
        else alert('Увійдіть або зареєструйтеся')
    };
    const removeFavorite = async () => {
        await dispatch(authActions.removeFavoriteRest({userId, restId: id}))
        setStateFavorite(false)
    };

    return (
        <div>
            <div>
                <h1>{restaurant.name}</h1>
                {!stateFavorite &&
                    <div>
                        <h3 style={{cursor: "pointer"}} onClick={addFavorite}>Додати до улюблених</h3>
                    </div>}
                {stateFavorite &&
                    <div>
                        <h3 style={{cursor: "pointer"}} onClick={removeFavorite}>Прибрати з улюблених</h3>
                    </div>}
                <div>
                    <Link to={'userEvents'}><h3
                        style={{cursor: "pointer", fontFamily: 'cursive', color: 'blue'}}> Пиячок </h3></Link>

                </div>
            </div>
            <div>
                <img width={'50%'} src={API_URL + restaurant.mainImage} alt={'зображення закладу'}/>
                <div><StarsRating rating={restaurant.rating}/></div>
                <div> Адреса: {restaurant.place}</div>
                <div> Телефон: {restaurant.phone}</div>
                <div> Режим роботи: {restaurant.hours}</div>
                <div> email: {restaurant.email} </div>
                <div> Сайт: {restaurant.webSite} </div>
                <div> Середній чек:{restaurant.averageBill} грн.</div>
                {tags && <div> {tags.map(tag => <Tag key={tag} tag={tag}/>)}</div>}
            </div>
        </div>
    )
};

export {Restaurant};
