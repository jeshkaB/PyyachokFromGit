import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {eventAnswerActions, restaurantActions, userActions, userEventActions} from "../../redux";
import {EventAnswerCard} from "../EventAnswerCard/EventAnswerCard";
import {useForm} from "react-hook-form";


const UserEvent = () => {
    const dispatch = useDispatch();
    const {register, handleSubmit} = useForm();
    const {id} = useParams();
    const {isAuth} = useSelector(state => state.auth)

    const {userEvent} = useSelector(state => state.userEvent)
    useEffect(() => {
        dispatch(userEventActions.getById(id))
    }, []);
    const {_id, date, time, purpose, otherInformation, restaurant: restId, user: userId, eventAnswers} = userEvent//TODO хоча в події розширений юзер (populate), чомусь на клієнті отримується тільки айді

    const {restaurant} = useSelector(state => state.restaurant)
    useEffect(() => {
        dispatch(restaurantActions.getById(restId))
    }, [dispatch]);

    const {user} = useSelector(state => state.user)
    useEffect(() => {
        dispatch(userActions.getById(userId))
    }, [dispatch]);


    const [stateForm, setStateForm] = useState(false)

    const submit = async (data) => {
        await dispatch(eventAnswerActions.create({id: _id, answObj: data}))
        setStateForm(false)

    }
    const answerClick = () => {
        if (isAuth)
            setStateForm(true)
        else alert('Увійдіть або зареєструйтеся')
    }

    return (
        <div>
            <h1 style={{fontFamily: 'cursive', color: 'blue'}}>ПИЯЧОК</h1>
            <div style={{background: "lightgray"}}>
                {JSON.stringify(restaurant) !== '{}' &&
                    <h2>{restaurant.name}</h2>}
                {JSON.stringify(userEvent) !== '{}' &&
                    <div>
                        <h3>Мета зустрічі: {purpose}</h3>
                        <p>Дата: {date.slice(0, 10)}</p>
                        <p>Час: {time}</p>
                        <p>Інша інформація: {otherInformation}</p>
                    </div>}
                {user && <p>Ініціатор: {user.name}</p>}
            </div>
            <div style={{border: "solid gray 1px", margin: 2}}>
                {eventAnswers &&
                    eventAnswers.map(answer => <EventAnswerCard key={answer._id} answ={answer}/>)}
            </div>
            <h4 style={{cursor: "pointer"}} onClick={() => answerClick()}>Додайте відповідь</h4>
            {stateForm &&
                <div>
                    <form onSubmit={handleSubmit(submit)}>
                        <input type={'text'} placeholder={'напишіть відповідь'} {...register('answer')} />
                        <button>Відповісти</button>
                    </form>

                </div>}

        </div>
    );
};

export {UserEvent}
