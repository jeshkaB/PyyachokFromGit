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




const RestaurantCard = ({restaurant, isTop}) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const {register, handleSubmit} = useForm()

    const {_id,name,place,averageBill,mainImage,hours,categories,phone,email,webSite,rating,tags, moderationMessage, moderated, user} = restaurant;
    const {role, userId} = useSelector(state => state.auth)
    const[isModerationMessage, setIsModerationMessage] = useState(false)
    const[isModerationDone, setIsModerationDone] = useState(false)


    if (location.pathname === '/restaurants'|| location.pathname ==='/superAdmin') {

        const clickToRest1 = async () => {
            if (location.pathname === '/superAdmin')
                navigate(`../restaurantsForAdmin/${_id}`)
            else {
                await dispatch (restaurantActions.completeViews({restId: _id}))
                navigate(`${_id}`)
            }
        }
        const moderatedClick = async () => {
            const {error} = await dispatch(restaurantActions.updateById({id:_id, restObj: {'moderated': true}}))
            if (!error) setIsModerationDone(true)
        }
        const submit = async (data) => {
            const {error} = await dispatch(restaurantActions.updateById({id:_id, restObj:data}))
            if (!error) setIsModerationDone(true)
        }

        return ( <div>
                    <Card className={css.BigCard} onClick={clickToRest1}>
                        <CardImg width={300} height={300} src={API_URL + mainImage} alt={'зображення закладу'}/>
                        <CardHeader><h2>{name}</h2></CardHeader>
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
        const clickToRest2 = async () => {
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
                {!isTop && <Card className={css.SmallCard} onClick={clickToRest2}>
                     <CardImg height={300} src={API_URL + mainImage} alt={'зображення закладу'}/>
                     <CardHeader><h2>{name}</h2></CardHeader>
                     <CardGroup><StarsRating key={_id} rating={rating}/> </CardGroup>
                     <CardGroup>Адреса: {place} </CardGroup>
                     <CardGroup>Середній чек:{averageBill} грн. </CardGroup>
                 </Card>}

                {isTop && <div className={css.TopCard} onClick={clickToRest2}>
                    <div className={css.Top1}>
                        <h2>{name}</h2>
                        <img style={{height:'150px'}} src={API_URL + mainImage} alt={'зображення закладу'}/>
                    </div>
                    <div className={css.Top2}>
                        <StarsRating key={_id} rating={rating}/>
                        <br/>
                        <p>Адреса: {place} </p>
                        <p>Середній чек:{averageBill} грн. </p>
                    </div>
                </div>}

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

};

export {RestaurantCard};
