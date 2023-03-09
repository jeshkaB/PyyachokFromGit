import React, {useEffect, useState} from 'react';
import {MyComments, MyMarks, MyUserEvents, User, UserUpdateDelete} from "../components";
import {useDispatch, useSelector} from "react-redux";

import {userActions} from "../redux";
import {useLocation, useParams} from "react-router-dom";
import {useList} from "react-firebase-hooks/database";

const UserPage = () => {
    const dispatch = useDispatch();
    const {id} = useParams();
    const {user} = useSelector(state => state.user);

    const [stateEditing, setStateEditing] = useState(false);
    useEffect(() => {
        dispatch(userActions.getById(id))
    }, [dispatch])
    // const {state:user} = useLocation()

    return (
        <div>
            <div>
                <User user={user}/>
            </div>
            <div style={{border:'solid 1px '}}>
                <h3 >Редагування користувача </h3>
                <UserUpdateDelete user={user}/>
            </div>

        </div>
    );
};

export {UserPage}
