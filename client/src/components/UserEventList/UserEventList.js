import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {userEventActions} from "../../redux";
import {UserEventCard} from "../UserEventCard/UserEventCard";
import {UserEventForm} from "../UserEventForm/UserEventForm";

const UserEventList = () => {
    const dispatch = useDispatch();
    const {userEvents} = useSelector(state => state.userEvent);
    const {stateForm} = useSelector(state => state.userEvent);
    const {isAuth} = useSelector(state => state.auth);

    useEffect(()=> {
        dispatch(userEventActions.getAll())
    },[dispatch])

    const clickCreateEvent = ()=> {
        if (isAuth) dispatch(userEventActions.setStateForm(true))
        else alert ('Увійдіть або зареєструйтеся')
    }
    return (
        <div>
            {userEvents ?
                <div style={{border:'solid 1px gray'}}>
                    {userEvents.map(event => <UserEventCard key={event._id} event={event}/>)}
                </div> :
            <div> Подій поки що немає</div>}
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
};

export {UserEventList}
