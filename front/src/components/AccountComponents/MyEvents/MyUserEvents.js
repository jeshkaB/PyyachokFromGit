import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useState} from 'react';

import {userEventActions} from '../../../redux';

import {MyUserEvent} from './MyUserEvent';

import css from '../MyMarks/MyMarks.module.css';

const MyUserEvents = ({user}) => {
    const {_id} = user;
    const {userEvents} = useSelector(state => state.userEvent);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(userEventActions.getAll());
    }, [dispatch]);

    let myEvents;
    if (userEvents) myEvents = userEvents.filter(event => event.user === _id);
    const [stateEvents, setStateEvents] = useState(false);


    return (
        <div>
            <div className={css.To} onClick={() => setStateEvents(true)}>Мої події</div>
            {stateEvents && myEvents &&
                <div>
                    <button onClick={() => setStateEvents(false)}>Згорнути</button>
                    {myEvents.map(event => <MyUserEvent key={event._id} event={event}/>)}
                </div>}

        </div>
    );
};

export {MyUserEvents};
