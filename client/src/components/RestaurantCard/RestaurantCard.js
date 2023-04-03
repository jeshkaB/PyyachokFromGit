import {useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {useForm} from "react-hook-form";

import API_URL from "../../config";
import {roles} from "../../constants";
import {restaurantActions} from "../../redux";

import {Card, CardGroup, CardImg} from "react-bootstrap";
import CardHeader from "react-bootstrap/CardHeader";
import {StarsRating} from "../StarsRating/starsRating";
import {ModalUC} from "../ModalUC/ModalUC";

import css from './RestCard.module.css'

const RestaurantCard = ({restaurant, isTop}) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const {register, handleSubmit} = useForm();
    const {role, userId} = useSelector(state => state.auth)
    const {errors} = useSelector(state => state.restaurant)
    const {_id,name,place,averageBill,mainImage,hours,phone,email,webSite,rating, moderationMessage, moderated, user} = restaurant;

    const [visibleModerationMessage, setVisibleModerationMessage] = useState(false)
    const [isModerationDone, setIsModerationDone] = useState(false)
    const [errorIsVisible, setErrorIsVisible] = useState(false)

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
        const submitModerationMessage = async (data) => {
            const {error} = await dispatch(restaurantActions.updateById({id:_id, restObj:data}))
            if (!error) setIsModerationDone(true)
            else setErrorIsVisible(true)
        }

        return (
            <div>
                <ModalUC modalText={errors?.message} show={errorIsVisible} onHide={setErrorIsVisible} type={'danger'}></ModalUC>

                <Card className={css.BigCard} onClick={clickToRest1}>
                        <CardImg style={{width:'250px'}} src={API_URL + mainImage} alt={'зображення закладу'}/>
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
                    <button style={{marginLeft:5}} onClick={()=>setVisibleModerationMessage(true)}>Відмовити в розміщенні закладу</button>
                    {visibleModerationMessage &&
                        <form onSubmit={handleSubmit(submitModerationMessage)}>
                        <input style={{width:300}} placeholder={'вкажіть причину відмови'}
                               required={true} {...register('moderationMessage')}/>
                        <button>Відправити</button>
                        <button style={{marginLeft:5}} onClick={()=>setVisibleModerationMessage(false)}>Згорнути</button>
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
            if (!error) navigate('../restaurantManager')
        }
        return (
            <div>
                {!isTop && <Card className={css.SmallCard} onClick={clickToRest2}>
                     <CardImg style={{width:'250px'}} src={API_URL + mainImage} alt={'зображення закладу'}/>
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
                    <div className={css.ModerMes}>
                        Заклад не пройшов модерацію з причини: <b>{moderationMessage}</b>
                        <br/>
                        Після усунення причини відмови ви можете створити заклад повторно
                        <button onClick={clickDel}>Ок</button>
                    </div>}
            </div>
        );
    }

};

export {RestaurantCard};
