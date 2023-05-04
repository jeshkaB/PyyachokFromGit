/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';

import {userActions} from '../redux';

import {User, UserUpdateDelete} from '../components';

const UserPage = () => {
    const dispatch = useDispatch();
    const {id} = useParams();
    const {user} = useSelector(state => state.user);

    useEffect(() => {
        dispatch(userActions.getById(id));
    }, [dispatch]);


    return (
        <div>
            <div>
                <User/>
            </div>
            <div>
                <UserUpdateDelete user={user}/>
            </div>

        </div>
    );
};

export {UserPage};
