import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";

import {restaurantActions, userEventActions} from "../../redux";
import {Dropdown} from "react-bootstrap";
import {ModalUC} from "../ModalUC/ModalUC";

const UserEventForm = ({setStateForm}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {register, handleSubmit} = useForm()

    const {errors} = useSelector(state => state.userEvent);
    const {restaurants} = useSelector(state => state.restaurant)

    useEffect(() => {
        dispatch(restaurantActions.getAll())
    }, [])

    const [selectedRest, setSelectedRest] = useState({})
    const [errorsIsVisible, setErrorsIsVisible] = useState(false)

    const {id: restId} = useParams();// якщо виклик форми не зі сторінки ресторану (restId в Params не існує), то запит ресторану через випадаюче меню
    let restIdForCreate;
    if (restId) restIdForCreate = restId
    else restIdForCreate = selectedRest._id;

    const submit = async (data) => {
        let response
        if (data.otherInformation !== '')
        response = await dispatch(userEventActions.create({id: restIdForCreate, eventObj: data}));
        else {
            const {otherInformation, ...rest} = data;
            response = await dispatch(userEventActions.create({id: restIdForCreate, eventObj: rest}))
        }

        if (!response?.error) {
            setStateForm(false)
            navigate(`../userEvents/${response.payload._id}`)
        }
        else setErrorsIsVisible(true)
    }

    return (
        <div style={{border:'solid 0.5px darkgrey', borderRadius:'20px', margin: '10px', padding: '10px'} }>
            <ModalUC modalText={errors?.message} show={errorsIsVisible} onHide={setErrorsIsVisible} type={'danger'}></ModalUC>

            {!restId && restaurants &&
                <Dropdown>
                    <Dropdown.Toggle variant={"outline-secondary"}>{selectedRest.name || "Оберіть заклад"}</Dropdown.Toggle>
                    <Dropdown.Menu>
                        {restaurants.map(rest =>
                            <Dropdown.Item key={rest._id} onClick={() => setSelectedRest(rest)}>{rest.name}</Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </Dropdown>}
            <p style={{color: 'royalblue'}}>*Ви можете створити подію не раніше ніж за місяць до її проведення!</p>
            <form onSubmit={handleSubmit(submit)}>
                <label> Оберіть дату <input type="text" required={true}
                                            placeholder={'формат дати 2022-12-31'} {...register('date')}/></label>
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

export {UserEventForm}
