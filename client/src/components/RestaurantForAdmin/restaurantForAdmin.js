import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {restaurantActions} from "../../redux";
import API_URL from "../../config";
import {StarsRating} from "../StarsRating/starsRating";
import {RestaurantUpdate} from "../RestaurantUpdate/RestaurantUpdate";
import {roles} from "../../constants";
import {NewsCreate} from "../NewsCreate/NewsCreate";
import {NewsList} from "../NewsList/newsList";


const RestaurantForAdmin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams();
    const {role} = useSelector(state => state.auth);
    const {restaurant} = useSelector(state => state.restaurant);
    const [confirmDelete, setConfirmDelete] = useState(false)
    useEffect(() => {
        dispatch(restaurantActions.getById(id))
    }, [id]);

    let isSuperAdmin
    if (role && role.includes(roles.SUPER_ADMIN)) isSuperAdmin = true

    return (
        <div>
            <div>
                <h2>{restaurant.name}</h2>
                <img width={'25%'} src={API_URL + restaurant.mainImage} alt={'зображення закладу'}/>
                <div><StarsRating rating={restaurant.rating}/></div>
                <div> Адреса: {restaurant.place}</div>
                <div> Телефон: {restaurant.phone}</div>
                <div> Режим роботи: {restaurant.hours}</div>
                <div> email: {restaurant.email} </div>
                <div> Сайт: {restaurant.webSite} </div>
                <div> Середній чек:{restaurant.averageBill} грн.</div>
            </div>
            <div>
                <RestaurantUpdate restaurant={restaurant}/>
            </div>
            {isSuperAdmin && <div>
                <h3 style={{cursor: 'pointer', fontSize: '10px', color: 'orange'}}
                    onClick={() => setConfirmDelete(true)}> Видалити заклад</h3>
                {confirmDelete &&
                    <div>
                        <p style={{color: 'red'}}> Ви упевнені, що хочете видалити заклад?</p>
                        <button onClick={() => dispatch(restaurantActions.deleteById(id))}>Так</button>
                        <button onClick={() => setConfirmDelete(false)}>Ні</button>
                    </div>}
            </div>}
            <hr/>
            <h3 style={{cursor: 'pointer', color: "green"}}
                onClick={() => navigate(`/restaurants/${id}/marks`)}> Оцінки</h3>

            <hr/>
            <h3 style={{cursor: 'pointer', color: "green"}}
                onClick={() => navigate(`/restaurants/${id}/comments`)}>Відгуки</h3>
            <hr/>
            <h3 style={{color: "green"}}> Новини</h3>
            <NewsCreate restId={id}/>
            <NewsList restId={id}/>

        </div>
    )
};

export {RestaurantForAdmin};
