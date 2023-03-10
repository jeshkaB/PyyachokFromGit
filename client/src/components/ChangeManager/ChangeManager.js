import {useParams} from "react-router-dom";

import {Dropdown, Modal} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {restaurantActions, userActions} from "../../redux";
import {roles} from "../../constants";
import {UserCard} from "../UserCard/UserCard";

const ChangeManager = ({restId}) => {
    const dispatch = useDispatch();
    const {users} = useSelector(state => state.user);
    useEffect(() => {
        dispatch(userActions.getAll())
    }, [])
    const {restaurant} = useSelector(state => state.restaurant);
    useEffect(() => {
        dispatch(restaurantActions.getById(restId))
    }, []);
    const [selectedManager, setSelectedManager] = useState({});

    const [stateConfirm, setStateConfirm] = useState(false);
    const managers = users.filter(user => user.role.includes(roles.REST_ADMIN) && user._id !== restaurant.user)
    const notManagers = users.filter(user => !user.role.includes(roles.REST_ADMIN) && !user.role.includes(roles.SUPER_ADMIN))
    const currentManager = users.find(user => user._id === restaurant.user)

    const clickSelectedManager = (manager) => {
        setSelectedManager(manager);
        setStateConfirm(true);
    }

    const changeManager = async () => {
        const {error, data} = await dispatch(restaurantActions.changeRestAdmin({restId, userId: selectedManager._id}))

        if (!error) {
            setStateConfirm(false);
            setSelectedManager({});
        }
    }

    return (
        <div>

            <div>
                {currentManager && <div>Наразі адміністратор закладу <h5>{currentManager.name}</h5></div>}
                <h3>Вибрати нового адміністартора закладу:</h3>
                <Dropdown>
                    <Dropdown.Toggle>{selectedManager.name || "з адміністарторів закладів "}</Dropdown.Toggle>
                    <Dropdown.Menu>
                        {managers.map(manager =>
                            <Dropdown.Item key={manager._id}
                                           onClick={() => clickSelectedManager(manager)}>{manager.name}</Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown>
                    <Dropdown.Toggle>{selectedManager.name || "зі звичайних користувачів"}</Dropdown.Toggle>
                    <Dropdown.Menu>
                        {notManagers.map(manager =>
                            <Dropdown.Item key={manager._id}
                                           onClick={() => clickSelectedManager(manager)}>{manager.name}</Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            {stateConfirm &&
                <div>
                    <div> Ви впевнені, що хочете призначити <h5>{selectedManager.name}</h5> адміністратором закладу?
                    </div>
                    <button onClick={changeManager}>Підтвердити</button>
                    <button onClick={() => setStateConfirm(false)}>Відмінити</button>
                </div>}

        </div>
    );
};

export {ChangeManager}
