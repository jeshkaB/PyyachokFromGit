import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {userActions} from "../../redux";

const UsersList = () => {

    const {users} = useSelector(state => state.user)
    const dispatch = useDispatch()

    useEffect(()=> {
        dispatch(userActions.getAll())
    }, [])


    return (
        <div style={{margin: 20}}>
            <div>
                {JSON.stringify(users)}
            </div>
        </div>
    );
};

export {UsersList}
