import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {userEventActions} from "../../redux";


const UserEventForm = ({restId}) => {
    const {errors} = useSelector(state => state.userEvent);
    const dispatch = useDispatch();
    const {stateForm} = useSelector(state => state.userEvent)

    const {register, handleSubmit} = useForm()
    const submit = async (data) => {
        await dispatch(userEventActions.create({id: restId, eventObj: data}));
        dispatch(userEventActions.setStateForm(false));
        alert('Подія опублікована')
    }

//TODO при виборі закладу треба зробити випадаюче меню - якщо не зі сторінки ресторану
    return (
        <div>
            {errors && <h2>{errors.message}</h2>}

                <form onSubmit={handleSubmit(submit)}>
                    {/*<label>Заклад <input type="text" defaultValue={name} {...register('name')}/></label>*/}
                    {/*<br/>*/}
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
