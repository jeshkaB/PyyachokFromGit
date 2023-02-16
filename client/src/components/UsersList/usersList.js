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

    // if (JSON.stringify(users)!=='[]')
    //     users.sort((a,b)=> a.name.localeCompare(b.name))

    return (
        <div style={{margin: 20}}>
            <div>
                {users && users.map (user=> <UserCard key={user._id} user={user}/>)}
            </div>
        </div>
    );
};

export {UsersList}
