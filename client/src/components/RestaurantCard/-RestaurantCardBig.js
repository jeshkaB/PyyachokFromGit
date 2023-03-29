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


const RestaurantCardBig = ({restaurant}) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const {register, handleSubmit} = useForm()

    const {_id,name,place,averageBill,mainImage,hours,phone,email,webSite,rating,moderated} = restaurant;
    const {role} = useSelector(state => state.auth)
    const [isModerationMessage, setIsModerationMessage] = useState(false)
    const [isModerationDone, setIsModerationDone] = useState(false)


    // if (location.pathname === '/restaurants'|| location.pathname ==='/superAdmin')

    const click = async () => {
        if (location.pathname === '/superAdmin')
            navigate(`../restaurantsForAdmin/${_id}`)
        else {
            await dispatch(restaurantActions.completeViews({restId: _id}))
            navigate(`${_id}`)
        }
    }
    const moderatedClick = async () => {
        const {error} = await dispatch(restaurantActions.updateById({id: _id, restObj: {'moderated': true}}))
        if (!error) setIsModerationDone(true)
    }
    const submit = async (data) => {
        const {error} = await dispatch(restaurantActions.updateById({id: _id, restObj: data}))
        if (!error) setIsModerationDone(true)
    }

    return (<div>
            <Card className={css.BigCard} onClick={click}>
                <CardImg width={300} height={300} src={API_URL + mainImage} alt={'зображення закладу'}/>
                <CardHeader style={{alignContent: 'center'}}>{name}</CardHeader>
                <CardGroup><StarsRating key={_id} rating={rating}/> </CardGroup>
                <CardGroup>Адреса: {place} </CardGroup>
                <CardGroup>Телефон: {phone} </CardGroup>
                <CardGroup>Режим роботи: {hours} </CardGroup>
                <CardGroup>email: {email}  </CardGroup>
                <CardGroup>Сайт: {webSite} </CardGroup>
                <CardGroup>Середній чек:{averageBill} грн. </CardGroup>
            </Card>

            {role && role.includes(roles.SUPER_ADMIN) && !isModerationDone && !moderated &&
                <div>
                    <button onClick={moderatedClick}>Дозволити розміщення закладу</button>
                    <button onClick={() => setIsModerationMessage(true)}>Відмовити в розміщенні закладу</button>
                    {isModerationMessage && <form onSubmit={handleSubmit(submit)}>
                        <input type='text' placeholder={'вкажіть причину відмови'}
                               required={true} {...register('moderationMessage')}/>
                        <button onClick={() => setIsModerationDone(true)}>Відправити</button>
                    </form>}
                </div>}
        </div>
    );
}

export {RestaurantCardBig};
