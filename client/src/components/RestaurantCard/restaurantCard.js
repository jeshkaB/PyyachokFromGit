import API_URL from "../../config";

import './restCardStyle.css'
import {StarsRating} from "../StarsRating/starsRating";
import {useLocation, useNavigate} from "react-router-dom";

const RestaurantCard = ({restaurant}) => {


    const {
        _id,
        name,
        place,
        averageBill,
        mainImage,
        hours,
        categories,
        phone,
        email,
        webSite,
        rating,
        tags
    } = restaurant;

    const location = useLocation();
    const navigate = useNavigate();

    const click = ()=> {
        if (location.pathname ===('/restaurantManager' || 'superAdmin'))
            navigate(`../restaurantsForAdmin/${_id}`)
        else navigate(`../restaurants/${_id}`)
    }


    if (location.pathname === '/home' || '/myAccount')
        return (
            <div className={'RestCardOnHome'} onClick={click}>
                <h1 className={'RestName'}>{name}</h1>
                <img width={200} height={200} src={API_URL + mainImage} alt={'зображення закладу'}/>
                <div><StarsRating key={_id} rating={rating}/></div>
                <div> Адреса: {place}</div>
                <div> Середній чек:{averageBill} грн.</div>
            </div>
        );
    else if (location.pathname === '/restaurants')
        return (<div>
                <div className={'RestCard'} onClick={() => navigate(`${_id}`)}>
                    <h1 className={'RestName'}>{name}</h1>
                    <img width={300} height={300} src={API_URL + mainImage} alt={'зображення закладу'}/>
                    <div><StarsRating key={_id} rating={rating}/></div>
                    <div> Адреса: {place}</div>
                    <div> Телефон: {phone}</div>
                    <div> Режим роботи: {hours}</div>
                    <div> email: {email} </div>
                    <div> Сайт: {webSite} </div>
                    <div> Середній чек:{averageBill} грн.</div>
                </div>
            </div>

        );
};

export {RestaurantCard};
