import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {MyUserEvent} from "./MyUserEvent";
import {userEventActions} from "../../../redux";


const MyUserEvents = ({user}) => {
    const {_id} = user;
    const {userEvents} = useSelector(state => state.userEvent);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(userEventActions.getAll())
    }, [dispatch]);

    let myEvents;
    if (userEvents) myEvents = userEvents.filter(event => event.user === _id);
    const [stateEvents, setStateEvents] = useState(false);


    return (
        <div>
            <h3 style={{cursor: "pointer"}} onClick={() => setStateEvents(true)}>Мої події</h3>
            {stateEvents && myEvents &&
                <div>
                    {myEvents.map(event => <MyUserEvent key={event._id} event={event}/>)}
                    <button onClick={() => setStateEvents(false)}>Згорнути</button>
                </div>}

        </div>
    );
};

export {MyUserEvents}
