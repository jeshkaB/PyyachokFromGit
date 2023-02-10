import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {restaurantActions, userEventActions} from "../../redux";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Dropdown} from "react-bootstrap";


const UserEventForm = () => {
    const dispatch = useDispatch();
    const {register, handleSubmit} = useForm()

    const {errors} = useSelector(state => state.userEvent);

    const {restaurants} = useSelector(state => state.restaurant)
    useEffect(() => {
        dispatch(restaurantActions.getAll())
    }, [dispatch])

    const [selectedRest, setSelectedRest] = useState({})

    const {id: restId} = useParams();// якщо виклик форми не зі сторінки ресторану (restId в Params не існує), то запит ресторану через випадаюче меню
    let restIdForCreate;
    if (restId) restIdForCreate = restId
    else restIdForCreate = selectedRest._id;

    const submit = async (data) => {
        await dispatch(userEventActions.create({id: restIdForCreate, eventObj: data}));
        dispatch(userEventActions.setStateForm(false));
    }

    return (
        <div>
            {!restId && restaurants &&
                <Dropdown>
                    <Dropdown.Toggle>{selectedRest.name || "Оберіть заклад"}</Dropdown.Toggle>
                    <Dropdown.Menu>
                        {restaurants.map(rest =>
                            <Dropdown.Item key={rest._id} onClick={() => setSelectedRest(rest)}>{rest.name}</Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </Dropdown>}
            <form onSubmit={handleSubmit(submit)}>
                <label> Оберіть дату <input type="text" required={true}
                                            placeholder={'формат дати 2022-12-31'} {...register('date')}/></label>
                <br/>
                <label> Оберіть час <input type="text" required={true} {...register('time')}/></label>
                <br/>
                <label> Мета зустрічі <input type="text" required={true} {...register('purpose')}/></label>
                <br/>
                <label> Додаткова інформація <input type="text" {...register('otherInformation')}/></label>
                <br/>
                <button> Опублікувати подію</button>
            </form>

        </div>
    );
};

export {UserEventForm}
