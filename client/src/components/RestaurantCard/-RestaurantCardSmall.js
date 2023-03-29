import {useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {useForm} from "react-hook-form";

import API_URL from "../../config";
import {roles} from "../../constants";
import {restaurantActions} from "../../redux";

import {Card, CardGroup, CardImg, Col} from "react-bootstrap";
import CardHeader from "react-bootstrap/CardHeader";
import css from './RestCard.module.css'
import {StarsRating} from "../StarsRating/starsRating";




const RestaurantCardSmall = ({restaurant}) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const {_id,name,place,averageBill,mainImage, rating,moderationMessage, user} = restaurant;
    const {userId} = useSelector(state => state.auth)

    const clickToRest = async () => {
            if (location.pathname === '/restaurantManager')
                navigate(`../restaurantsForAdmin/${_id}`)
            else {
                await dispatch(restaurantActions.completeViews({restId: _id}))
                navigate(`../restaurants/${_id}`)
            }
        }
        const clickDel = async () => {
            const {error} = await dispatch(restaurantActions.deleteById(_id))
            if (!error) navigate('../restaurantManager')//???
        }
        return (
            <div>
                <Card className={css.SmallCard} onClick={clickToRest}>
                    <CardImg height={300} src={API_URL + mainImage} alt={'зображення закладу'}/>
                    <CardHeader><h2>{name}</h2></CardHeader>
                    <CardGroup><StarsRating key={_id} rating={rating}/> </CardGroup>
                    <CardGroup>Адреса: {place} </CardGroup>
                    <CardGroup>Середній чек:{averageBill} грн. </CardGroup>
                </Card>

                {moderationMessage && user===userId && location.pathname === '/restaurantManager' &&
                    <div style={{border:'solid 2px red'}}>
                    Заклад не пройшов модерацію з причини: {moderationMessage}
                    <br/>
                    Після усунення причини відмови ви можете створити заклад повторно
                        <button onClick={clickDel}>Ок</button>
                    </div>}
            </div>
        );
    }


export {RestaurantCardSmall};
