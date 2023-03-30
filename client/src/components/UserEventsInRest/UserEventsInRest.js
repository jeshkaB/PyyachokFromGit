import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

import {restaurantActions, userEventActions} from "../../redux";
import {UserEventForm} from "../UserEventForm/UserEventForm";
import {ModalUC} from "../ModalUC/ModalUC";

import css from './UserEventsInRest.module.css'


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

    const [modalIsVisible, setModalIsVisible] = useState(false)

    const clickCreateEvent = ()=> {
        if (isAuth) dispatch(userEventActions.setStateForm(true))
        else setModalIsVisible(true)
    }

//TODO подія створюється, але у списку подій відображається тільки після перезавантаження сторінки. State перезаписується і відображається напряму, без усіх моїх маніпуляцій
    return (
        <div>
            <ModalUC modalText={'Увійдіть або зареєструйтеся'} show={modalIsVisible} onHide={setModalIsVisible}></ModalUC>
            <h1>Пиячок в {name}</h1>
            <div>
                {JSON.stringify(userEventsInRest)!== '[]' ?
                    <div style={{cursor:"pointer"}}>{userEventsInRest.map(event =>
                        <div style={{border: 'solid grey 1px', margin: 2}} key={event._id} onClick={() => navigate(`../UserEvents/${event._id}`)}>
                            <p>{event.date.slice(0, 10)}</p>
                            <h3>{event.purpose}</h3>
                        </div>)}
                    </div>
                :
                    <p style={{color:'darkgray'}}>Подій поки що немає</p>}

            </div>
            <div className={css.CreateEvent}>
                <p onClick={() => clickCreateEvent()}> Створити свою подію</p>

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
