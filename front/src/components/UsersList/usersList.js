import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {useSearchParams} from 'react-router-dom';

import {userActions} from '../../redux';

import {UserCard} from '../UserCard/UserCard';
import {PaginationUC} from '../PaginationUC/PaginationUC';
import {UsersSearchForm} from './UsersSearchForm';

import css from './UsersList.module.css';

const UsersList = () => {

    const {users, totalItems, limit} = useSelector(state => state.user);
    const dispatch = useDispatch();

    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        dispatch(userActions.getUsersByParams({email: searchParams.get('userEmail'), page: searchParams.get('page')}));
    }, [searchParams]);

    return (
        <div>
            <UsersSearchForm setSearchParams={setSearchParams}/>
            {searchParams.get('userEmail') && JSON.stringify(searchParams.get('userEmail'))!=='' &&
                <div>
                    <button onClick={()=>setSearchParams('')}>Скинути пошук</button>
                </div>}
                <div>
                    <div className={css.List}>
                        {users && users.map(user => <UserCard key={user._id} user={user}/>)}
                    </div>
                </div>
            <PaginationUC setSearchParams={setSearchParams} searchParams={searchParams} totalItems={totalItems} limit={limit}/>
        </div>
    );
};
export {UsersList};
