import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";

import {userEventActions} from "../../redux";
import {UserEventCard} from "../UserEventCard/UserEventCard";
import {UserEventForm} from "../UserEventForm/UserEventForm";

import css from './UserEventList.module.css'
import {ModalUC} from "../ModalUC/ModalUC";

const UserEventList = () => {
    const dispatch = useDispatch();
    const {userEvents} = useSelector(state => state.userEvent);
    const {stateForm} = useSelector(state => state.userEvent);
    const {isAuth} = useSelector(state => state.auth);
    const [modalIsVisible, setModalIsVisible] = useState(false)


    useEffect(() => {
        dispatch(userEventActions.getAll())
    }, [dispatch])

    const clickCreateEvent = () => {
        if (isAuth) dispatch(userEventActions.setStateForm(true))
        else setModalIsVisible(true)
    }
    return (
        <div>
            <ModalUC modalText={'Увійдіть або зареєструйтеся'} show={modalIsVisible}
                     onHide={setModalIsVisible}></ModalUC>
            <div>
                <div className={css.CreateEvent} onClick={() => clickCreateEvent()}> Створити свою подію</div>
                {stateForm &&
                    <div>
                        <UserEventForm/>
                        <button onClick={() => dispatch(userEventActions.setStateForm(false))}>Згорнути</button>
                    </div>}
            </div>
            {userEvents ?
                <div style={{marginTop: '20px'}}>
                    {userEvents.map(event => <UserEventCard key={event._id} event={event}/>)}
                </div> :
                <p style={{color: 'darkgray'}}> Подій поки що немає</p>}


        </div>
    );
};

export {UserEventList}
