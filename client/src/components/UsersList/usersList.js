import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";

import {userActions} from "../../redux";
import {paginationLimits} from "../../constants/paginationLimits";

import {UserCard} from "../UserCard/UserCard";
import {PaginationUC} from "../PaginationUC/PaginationUC";
import {UsersSearchForm} from "./UsersSearchForm";

import css from './UsersList.module.css'


const UsersList = () => {

    const {users} = useSelector(state => state.user) || []
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(userActions.getAll())
    }, [dispatch])
    const usersManagersFirst = [...users].sort((a, b) => b.role.length - a.role.length)


    const [usersOnPage, setUsersOnPage] = useState(usersManagersFirst.slice(0, paginationLimits.usersLimit))
    const [searchParams, setSearchParams] = useSearchParams();

    const searchQuery = searchParams.get('userEmail')
    const usersFound = users.filter(user => user.email.includes(searchQuery))
    console.log(searchQuery)

    return (
        <div>
            <UsersSearchForm setSearchParams={setSearchParams}/>
            {(searchQuery && JSON.stringify(searchQuery)!=='')
                ?
                <div>
                    <button onClick={()=>setSearchParams('')}>Скинути пошук</button>
                    <div className={css.List}>
                        {usersFound.map(user => <UserCard key={user._id} user={user}/>)}
                    </div>
                </div>
                :
                <div>
                    <div className={css.List}>
                        {users && usersOnPage.map(user => <UserCard key={user._id} user={user}/>)}
                    </div>
                    <PaginationUC entitiesList={usersManagersFirst}
                                  setEntitiesOnPage={setUsersOnPage}
                                  limit={paginationLimits.usersLimit}/>
                </div>}
        </div>
    );
};
export {UsersList}
