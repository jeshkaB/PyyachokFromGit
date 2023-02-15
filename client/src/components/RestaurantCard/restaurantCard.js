import API_URL from "../../config";

import './restCardStyle.css'
import {StarsRating} from "../StarsRating/starsRating";
import {useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {roles} from "../../constants";
import {restaurantActions} from "../../redux";
import {useState} from "react";
import {useForm} from "react-hook-form";

const RestaurantCard = ({restaurant}) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const {register, handleSubmit} = useForm()

    const {_id,name,place,averageBill,mainImage,hours,categories,phone,email,webSite,rating,tags, moderationMessage, moderated, user} = restaurant;
    const {role, userId} = useSelector(state => state.auth)
    const[isModerationMessage, setIsModerationMessage] = useState(false)
    const[isModerationDone, setIsModerationDone] = useState(false)

    if (location.pathname === '/restaurants'|| location.pathname ==='/superAdmin') {
        const click1 = () => {
            if (location.pathname === '/superAdmin')
                navigate(`../restaurantsForAdmin/${_id}`)
            else navigate(`${_id}`)
        }
        const moderatedClick = async () => {
            const {error} = await dispatch(restaurantActions.updateById({id:_id, restObj: {'moderated': true}}))
            if (!error) setIsModerationDone(true)
        }
        const submit = async (data) => {

            const {error} = await dispatch(restaurantActions.updateById({id:_id, restObj:data}))
            if (!error) setIsModerationDone(true)
        }

        return (<div>
                <div className={'RestCard'} onClick={click1}>
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
                {role && role.includes(roles.SUPER_ADMIN) && !isModerationDone && !moderated &&
                <div>
                    <button onClick={moderatedClick}>Дозволити розміщення закладу</button>
                    <button onClick={()=>setIsModerationMessage(true)}>Відмовити в розміщенні закладу</button>
                    {isModerationMessage && <form onSubmit={handleSubmit(submit)}>
                        <input type='text' placeholder={'вкажіть причину відмови'}
                               required={true} {...register('moderationMessage')}/>
                        <button onClick={()=>setIsModerationDone(true)}>Відправити</button>
                    </form>}
                </div>}
            </div>
        );
    }
    else {
        const click2 = () => {
            if (location.pathname === '/restaurantManager')
                navigate(`../restaurantsForAdmin/${_id}`)
            else navigate(`../restaurants/${_id}`)
        }
        const click3 = async () => {
            const {error} = await dispatch(restaurantActions.deleteById(_id))
            if (!error) navigate('../restaurantManager')//???
        }
        return (
            <div>
                <div className={'RestCardOnHome'} onClick={click2}>
                    <h1 className={'RestName'}>{name}</h1>
                    <img width={200} height={200} src={API_URL + mainImage} alt={'зображення закладу'}/>
                    <div><StarsRating key={_id} rating={rating}/></div>
                    <div> Адреса: {place}</div>
                    <div> Середній чек:{averageBill} грн.</div>
                </div>
                {moderationMessage && user===userId && location.pathname === '/restaurantManager' &&
                    <div style={{border:'solid 2px red'}}>
                    Заклад не пройшов модерацію з причини: {moderationMessage}
                    <br/>
                    Після усунення причини відмови ви можете створити заклад повторно
                        <button onClick={click3}>Ок</button>
                    </div>}
            </div>
        );
    }

};

export {RestaurantCard};
