import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {useState} from 'react';

import {restaurantActions} from '../../redux';
import API_URL from '../../config';
import {roles} from '../../constants';

import {StarsRating} from '../StarsRating/starsRating';
import {RestaurantUpdate} from '../RestaurantUpdate/RestaurantUpdate';

import css from './RestaurantForAdmin.module.css';

const RestaurantForAdmin = ({restId, role, restaurant}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [confirmDelete, setConfirmDelete] = useState(false);


    let isSuperAdmin;
    if (role && role.includes(roles.SUPER_ADMIN)) isSuperAdmin = true;

    return (
        <div>
            <div className={css.RestAndDel}>
                <div>
                    <h2>{restaurant.name}</h2>
                    <img width={'25%'} src={API_URL + restaurant?.mainImage} alt={'зображення закладу'}/>
                    <div><StarsRating rating={restaurant.rating}/></div>
                    <div> Адреса: {restaurant.place}</div>
                    <div> Телефон: {restaurant.phone}</div>
                    <div> Режим роботи: {restaurant.hours}</div>
                    <div> email: {restaurant.email} </div>
                    <div> Сайт: {restaurant.webSite} </div>
                    <div style={{marginBottom: '20px'}}> Середній чек:{restaurant.averageBill} грн.</div>
                </div>
                <div>
                    {isSuperAdmin &&
                        <div>
                            <div className={css.Del}
                                onClick={() => setConfirmDelete(true)}> Видалити заклад</div>
                        </div>}
                    {confirmDelete &&
                        <div>
                            <p style={{color: 'red'}}> Ви упевнені, що хочете видалити заклад?</p>
                            <button onClick={() => dispatch(restaurantActions.deleteById(restId))}>Так</button>
                            <button style={{marginLeft:5}} onClick={() => setConfirmDelete(false)}>Ні</button>
                        </div>}
                </div>

            </div>
            <button onClick={() => navigate('viewStatistics')}>Статистика переглядів</button>
            <hr/>
            <RestaurantUpdate restaurant={restaurant}/>
        </div>
    );
};

export {RestaurantForAdmin};
