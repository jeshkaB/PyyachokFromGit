import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {restaurantActions} from "../../redux";
import API_URL from "../../config";
import {StarsRating} from "../StarsRating/starsRating";
import {RestaurantUpdate} from "../RestaurantUpdate/RestaurantUpdate";
import {roles} from "../../constants";


const RestaurantForAdmin = ({restId, role, restaurant}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [confirmDelete, setConfirmDelete] = useState(false)


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
                        <button onClick={() => dispatch(restaurantActions.deleteById(restId))}>Так</button>
                        <button onClick={() => setConfirmDelete(false)}>Ні</button>
                    </div>}
            </div>}
            <hr/>
            <button onClick={()=>navigate('viewStatistics')}>Статистика переглядів</button>



        </div>
    )
};

export {RestaurantForAdmin};
