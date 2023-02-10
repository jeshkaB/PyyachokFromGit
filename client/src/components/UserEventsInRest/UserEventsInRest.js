import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {restaurantActions, userEventActions} from "../../redux";
import {UserEventForm} from "../UserEventForm/UserEventForm";
import {useNavigate, useParams} from "react-router-dom";


const UserEventsInRest = () => {
    const {id} = useParams();
    const {isAuth} = useSelector(state => state.auth);
    const {restaurant} = useSelector(state => state.restaurant);
    const {userEvents: userEventsIds, name, _id} = restaurant;
    const {userEvents} = useSelector(state => state.userEvent);

    const {stateForm} = useSelector(state => state.userEvent);

    const dispatch = useDispatch();
    const navigate = useNavigate();


    useEffect(() => {
        dispatch(userEventActions.getAll())
    }, [stateForm]);

    useEffect(() => {
        dispatch(restaurantActions.getById(id))
    }, [dispatch]);

    let userEventsInRest = [];
    if (userEventsIds && userEvents) {
        userEventsIds.forEach(eventId => {
            userEvents.forEach(event => {
                if (event._id === eventId) userEventsInRest.push(event);
            });
        })
    }
    const clickCreateEvent = ()=> {
        if (isAuth) dispatch(userEventActions.setStateForm(true))
        else alert ('Увійдіть або зареєструйтеся')
    }

//TODO подія створюється, але у списку подій відображається тільки після перезавантаження сторінки. State перезаписується і відображається напряму, без усіх моїх маніпуляцій
    return (
        <div>
            <h1>Пиячок в {name}</h1>
            <div>
                {userEventsInRest.length >= 1 &&
                    <div style={{cursor:"pointer"}}>{userEventsInRest.map(event =>
                        <div style={{border: 'solid grey 1px', margin: 2}} key={event._id} onClick={() => navigate(`../UserEvents/${event._id}`)}>
                            <p>{event.date.slice(0, 10)}</p>
                            <h3>{event.purpose}</h3>
                        </div>)}
                    </div>}
                {userEventsInRest.length < 1 &&
                    <h3>Подій поки що немає</h3>}
            </div>
            <div style={{cursor:"pointer"}}>
                <h3 onClick={() => clickCreateEvent()}> Створити свою подію</h3>
                {stateForm &&
                    <div>
                        <UserEventForm/>
                        <button onClick={()=>dispatch(userEventActions.setStateForm(false))}>Згорнути</button>
                    </div>}
            </div>
        </div>
    );
}

export {UserEventsInRest}
