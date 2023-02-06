import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {restaurantActions, userEventActions} from "../../redux";
import {UserEventForm} from "../UserEventForm/UserEventForm";
import {useParams} from "react-router-dom";

const UserEventsInRest = () => {
    const {id} = useParams();

    const {restaurant} = useSelector(state => state.restaurant);
    const {userEvents: userEventsIds, name, _id} = restaurant;
    const {userEvents} = useSelector(state => state.userEvent);
    const dispatch = useDispatch();
    console.log(id)
    useEffect(() => {
        dispatch(userEventActions.getAll())
    }, [dispatch]);

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

    const [stateForm, setStateForm] = useState(false)

    return (
        <div>
            <h1>Пиячок в {name}</h1>
            <div>
                {userEventsInRest.length >= 1 &&
                    <div>{userEventsInRest.map(event =>
                        <div key={event._id}>
                            <p>{event.date.slice(0, 10)}</p>
                            <p>{event.purpose}</p>
                        </div>)}
                    </div>}
                {userEventsInRest.length < 1 &&
                    <h3>Подій поки що немає</h3>}
            </div>
            <div>
                <h3 onClick={() => setStateForm(true)}> Створити свою подію</h3>
                {stateForm &&
                    <UserEventForm restId={_id}/>}
            </div>
        </div>
    );
}

export {UserEventsInRest}
