import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {userActions} from "../../redux";
import {UserCard} from "../UserCard/UserCard";


const UsersList = () => {

    const {users} = useSelector(state => state.user)
    const dispatch = useDispatch()

    useEffect(()=> {
        dispatch(userActions.getAll())
    }, [dispatch])
    const usersManagersFirst = [...users].sort((a,b) => b.role.length - a.role.length)

    return (
        <div style={{margin: 20}}>
            <div>
                {users && usersManagersFirst.map (user=> <UserCard key={user._id} user={user}/>)}
            </div>
        </div>
    );
};

export {UsersList}
