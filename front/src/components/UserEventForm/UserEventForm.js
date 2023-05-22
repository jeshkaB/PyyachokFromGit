/* eslint-disable react-hooks/exhaustive-deps */
import {useDispatch, useSelector} from 'react-redux';
import {useForm} from 'react-hook-form';
import {useNavigate, useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import moment from 'moment';

import {restaurantActions, userEventActions} from '../../redux';
import {regex} from '../../constants';
import {Dropdown} from 'react-bootstrap';
import {ModalUC} from '../ModalUC/ModalUC';

const UserEventForm = ({setStateForm}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {register, handleSubmit} = useForm();

    const {errors} = useSelector(state => state.userEvent);
    const {restaurants} = useSelector(state => state.restaurant);

    useEffect(() => {
        dispatch(restaurantActions.getAll());
    }, []);

    const [selectedRest, setSelectedRest] = useState({});
    const [errorsMessage, setErrorsMessage] = useState(false);
    const [errorsIsVisible, setErrorsIsVisible] = useState(false);

    const {id: restId} = useParams();// якщо виклик форми не зі сторінки ресторану (restId в Params не існує), то запит ресторану через випадаюче меню
    let restIdForCreate;
    if (restId) restIdForCreate = restId;
    else restIdForCreate = selectedRest._id;

    const minDate = moment(new Date()).format('YYYY-MM-DD');
    const maxDate = moment(new Date().setMonth(new Date().getMonth() + 1)).format('YYYY-MM-DD');
    const regexTime = regex.time;
    
    const submit = async (data) => {
        if (JSON.stringify(selectedRest) === '{}') {
            setErrorsMessage('Ви не обрали заклад!');
            setErrorsIsVisible(true);
        } else if (!regexTime.test(data.time)) {
            setErrorsMessage('Час повинен бути у форматі HH:MM');
            setErrorsIsVisible(true);
        } else {
            let response;
            if (data.otherInformation !== '') {
                response = await dispatch(userEventActions.create({id: restIdForCreate, eventObj: data}));
                if (!response?.error) {
                    setStateForm(false);
                    navigate(`../userEvents/${response.payload._id}`);
                } else {
                    setErrorsMessage(errors.message);
                    setErrorsIsVisible(true);
                }
            } else {
                const {otherInformation, ...rest} = data;
                response = await dispatch(userEventActions.create({id: restIdForCreate, eventObj: rest}));
                if (!response?.error) {
                    setStateForm(false);
                    navigate(`../userEvents/${response.payload._id}`);
                } else {
                    setErrorsMessage(errors.message);
                    setErrorsIsVisible(true);
                }
            }
        }
    };

            return (
                <div style={{border: 'solid 0.5px darkgrey', borderRadius: '20px', margin: '10px', padding: '10px'}}>
                    <ModalUC modalText={errorsMessage} show={errorsIsVisible} onHide={setErrorsIsVisible}
                             type={'danger'}></ModalUC>

                    {!restId && restaurants &&
                        <Dropdown>
                            <Dropdown.Toggle
                                variant={'outline-secondary'}>{selectedRest.name || 'Оберіть заклад'}</Dropdown.Toggle>
                            <Dropdown.Menu>
                                {restaurants.map(rest =>
                                    <Dropdown.Item key={rest._id}
                                                   onClick={() => setSelectedRest(rest)}>{rest.name}</Dropdown.Item>
                                )}
                            </Dropdown.Menu>
                        </Dropdown>}
                    <p style={{color: 'royalblue'}}>*Ви можете створити подію не раніше ніж за місяць до її
                        проведення!</p>
                    <form onSubmit={handleSubmit(submit)}>
                        <label> Оберіть дату <input type="date" min={minDate} max={maxDate}
                                                    required={true} {...register('date')}/></label>
                        <br/>
                        <label> Оберіть час <input type="text" required={true}
                                                   placeholder={'формат часу 18:00'} {...register('time')}/></label>
                        <br/>
                        <label> Мета зустрічі <textarea required={true} {...register('purpose')}></textarea></label>
                        <br/>
                        <label> Додаткова інформація <textarea {...register('otherInformation')}></textarea></label>
                        <br/>
                        <button> Опублікувати подію</button>
                    </form>

                </div>
            );
        };

        export {UserEventForm};
