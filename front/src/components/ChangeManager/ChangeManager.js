/* eslint-disable react-hooks/exhaustive-deps */
import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useState} from 'react';

import {Dropdown} from 'react-bootstrap';
import {roles} from '../../constants';
import {restaurantActions, userActions} from '../../redux';

import css from './ChangeManager.module.css';


const ChangeManager = ({restId}) => {
    const dispatch = useDispatch();
    const {users} = useSelector(state => state.user);
        useEffect(() => {
        dispatch(userActions.getAll());
    }, [dispatch]);

    const {restaurant} = useSelector(state => state.restaurant);
    useEffect(() => {
        dispatch(restaurantActions.getById(restId));
    }, [dispatch]);

    const [selectedManager, setSelectedManager] = useState({});
    const [stateConfirm, setStateConfirm] = useState(false);

    const currentManager = users.find(user => user._id === restaurant.user);
    const managers = users.filter(user => user.role.includes(roles.REST_ADMIN) && user._id !== restaurant.user);
    const notManagers = users.filter(user => !user.role.includes(roles.REST_ADMIN) && !user.role.includes(roles.SUPER_ADMIN));


    const clickSelectedManager = (manager) => {
        setSelectedManager(manager);
        setStateConfirm(true);
    };

    const changeManager = async () => {
        const {error} = await dispatch(restaurantActions.changeRestAdmin({restId, userId: selectedManager._id}));

        if (!error) {
            setStateConfirm(false);
            setSelectedManager({});
        }
    };

    return (
        <div className={css.Hole}>
            <div>
                <h3>Адміністрування закладу</h3>
                {currentManager &&
                    <div>
                        Чинний адміністратор -
                        <h5 className={css.Name}>{currentManager.name} ({currentManager.email})</h5>

                    </div>}
                <h5>Вибрати нового адміністартора закладу:</h5>
                <Dropdown>
                    <Dropdown.Toggle variant={'outline-secondary'}>{'з адміністарторів закладів '}</Dropdown.Toggle>
                    <Dropdown.Menu>
                        {managers.map(manager =>
                            <Dropdown.Item key={manager._id}
                                           onClick={() => clickSelectedManager(manager)}>{manager.name}</Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown>
                    <Dropdown.Toggle variant={'outline-secondary'}>{'зі звичайних користувачів'}</Dropdown.Toggle>
                    <Dropdown.Menu>
                        {notManagers.map(user =>
                            <Dropdown.Item key={user._id}
                                           onClick={() => clickSelectedManager(user)}>{user.name}</Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            {stateConfirm &&
                <div className={css.Conf}>
                    <div> Ви впевнені, що хочете призначити
                        <h5 style={{margin:0}}>{selectedManager.name} ({selectedManager.email})</h5>
                        адміністратором закладу?
                    </div>
                    <button onClick={changeManager}>Підтвердити</button>
                    <button style={{marginLeft:5}} onClick={() => setStateConfirm(false)}>Відмінити</button>
                </div>}

        </div>
    );
};

export {ChangeManager};
