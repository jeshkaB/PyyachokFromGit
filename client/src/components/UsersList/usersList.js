import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";

import {userActions} from "../../redux";
import {paginationLimits} from "../../constants/paginationLimits";

import {UserCard} from "../UserCard/UserCard";
import {PaginationUC} from "../PaginationUC/PaginationUC";

const UsersList = () => {

    const {users} = useSelector(state => state.user) || []
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(userActions.getAll())
    }, [dispatch])
    const usersManagersFirst = [...users].sort((a, b) => b.role.length - a.role.length)

    const [usersOnPage, setUsersOnPage] = useState(usersManagersFirst.slice(0, paginationLimits.usersLimit))

    return (
        <div style={{margin: 20}}>
            <div>
                {users && usersOnPage.map(user => <UserCard key={user._id} user={user}/>)}
            </div>
            <PaginationUC entitiesList={usersManagersFirst}
                          setEntitiesOnPage={setUsersOnPage}
                          limit={paginationLimits.usersLimit}/>
        </div>
    );
};
export {UsersList}
