/* eslint-disable react-hooks/exhaustive-deps */
import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';

import {restaurantActions, userEventActions} from '../../redux';
import {UserEventForm} from '../UserEventForm/UserEventForm';
import {ModalUC} from '../ModalUC/ModalUC';

import css from './UserEventsInRest.module.css';


const UserEventsInRest = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {id} = useParams();
    const {isAuth} = useSelector(state => state.auth);
    const {restaurant} = useSelector(state => state.restaurant);
    const {userEvents: userEventsIds, name} = restaurant;
    const {userEvents, warningMessage} = useSelector(state => state.userEvent);

    const [stateForm, setStateForm] = useState(false);
    const [modalIsVisible, setModalIsVisible] = useState(false);

    useEffect(() => {
        dispatch(userEventActions.getAll());
    }, []);

    useEffect(() => {
        dispatch(restaurantActions.getById(id));
    }, []);

    let userEventsInRest = [];
    if (userEventsIds && userEvents) {
        userEventsIds.forEach(eventId => {
            userEvents.forEach(event => {
                if (event._id === eventId) userEventsInRest.push(event);
            });
        });
    }

    const clickCreateEvent = ()=> {
        if (isAuth) setStateForm(true);
        else setModalIsVisible(true);
    };
     const onHide = (value)=> dispatch(userEventActions.setWarningMessage(value));

    return (
        <div>
            <ModalUC modalText={'Адміністрація закликає вас бути обережними і не зустрічатися з незнайомими людьми в незнайомих місцях'} show={warningMessage}
                     onHide={onHide} type={'warning'}></ModalUC>
            <ModalUC modalText={'Увійдіть або зареєструйтеся'} show={modalIsVisible} onHide={setModalIsVisible}></ModalUC>

            <h1>Пиячок в {name}</h1>
            <div>
                {JSON.stringify(userEventsInRest)!== '[]' ?
                    <div className={css.Event}>{userEventsInRest.map(event =>
                        <div key={event._id} onClick={() => navigate(`../UserEvents/${event._id}`)}>
                            <h3>{event.purpose}</h3>
                            <p>{event.date.slice(0, 10)}</p>
                        </div>)}
                    </div>
                :
                    <p style={{color:'darkgray'}}>Подій поки що немає</p>}

            </div>
            <div className={css.CreateEvent}>
                <p onClick={() => clickCreateEvent()}> Створити свою подію</p>

                {stateForm &&
                    <div>
                        <UserEventForm setStateForm={setStateForm}/>
                        <button onClick={()=>setStateForm(false)}>Згорнути</button>
                    </div>}
            </div>
        </div>
    );
};

export {UserEventsInRest};
