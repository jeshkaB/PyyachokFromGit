import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";

import {eventAnswerActions, restaurantActions, userActions, userEventActions} from "../../redux";
import {EventAnswerCard} from "../EventAnswerCard/EventAnswerCard";

import css from './UserEvent.module.css'
import {ModalUC} from "../ModalUC/ModalUC";

const UserEvent = () => {
    const dispatch = useDispatch();
    const {register, handleSubmit} = useForm();
    const {id} = useParams();
    const {isAuth} = useSelector(state => state.auth)
    const {errors, isChangeEventAnswersList} = useSelector(state => state.eventAnswer)

    const {userEvent} = useSelector(state => state.userEvent)
    useEffect(() => {
        dispatch(userEventActions.getById(id))
    }, [isChangeEventAnswersList]);
    const {_id, date, time, purpose, otherInformation, restaurant: restId, user: userId, eventAnswers} = userEvent;

    const {restaurant} = useSelector(state => state.restaurant)
    useEffect(() => {
        dispatch(restaurantActions.getById(restId))
    }, [dispatch]);

    const {user} = useSelector(state => state.user)
    useEffect(() => {
        dispatch(userActions.getById(userId))
    }, [dispatch]);

    const [stateForm, setStateForm] = useState(false);
    const [errorIsVisible, setErrorIsVisible] = useState(false);
    const [modalIsVisible, setModalIsVisible] = useState(false);
    const [modalData, setModalData] = useState({text: '', type: 'secondary'})

    const submit = async (data) => {
        const {error} = await dispatch(eventAnswerActions.create({id: _id, answObj: data}))
        if (!error)
            setStateForm(false)
        else {
            setErrorIsVisible(true)
        }
    }
    const answerClick = () => {
        if (isAuth)
            setStateForm(true)
        else {
            setModalData({text: 'Увійдіть або зареєструйтеся'})
            setModalIsVisible(true)
        }
    }

    return (
        <div className={css.Hole}>
            <ModalUC modalText={modalData.text} type={modalData.type} show={modalIsVisible} onHide={setModalIsVisible}></ModalUC>
            <ModalUC modalText={errors?.message} show={errorIsVisible} onHide={setErrorIsVisible} type={'danger'}></ModalUC>

            <h1>Пиячок в</h1>
            <div>
                    <h2>{restaurant?.name}</h2>
                    <div className={css.Event}>
                        <h3>Мета зустрічі: {purpose}</h3>
                        <p>Дата: {date?.slice(0, 10)}</p>
                        <p>Час: {time}</p>
                        <p>Інша інформація: {otherInformation}</p>
                        <p>Ініціатор: {user?.name}</p>
                    </div>
            </div>
            <div className={css.CreateAnsw} onClick={answerClick}>Додайте відповідь</div>
            {stateForm &&
                <div>
                    <form onSubmit={handleSubmit(submit)}>
                        <textarea rows="5" cols="50" placeholder={'напишіть відповідь'} {...register('answer')}> </textarea>
                        <br/>
                        <button>Відповісти</button>
                        <button onClick={()=>setStateForm(false)}>Згорнути</button>
                    </form>
                </div>}
            <div>
                {eventAnswers &&
                    eventAnswers.map(answer => <EventAnswerCard key={answer._id} answ={answer}/>)}
            </div>



        </div>
    );
};

export {UserEvent}
