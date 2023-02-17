import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {useState} from 'react'
import {restaurantActions, userActions} from "../../redux";
import {useNavigate} from "react-router-dom";

const UserUpdateDelete = ({user}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {register, handleSubmit} = useForm()
    const {_id, name} = user;
    const [stateUpd, setStateUpd] = useState(false)
    const [confirmDelete, setConfirmDelete] = useState(false)

    const submit = async (data) => {
        const formData = new FormData();
        formData.append('name', data.name)
        if (data.avatar[0])
            formData.append('avatar', data.avatar[0])

        await dispatch(userActions.updateById({id: _id, userObj: formData}))
        setStateUpd(false)
        alert('Дані успішно змінено')
    }
    const clickDelete = async ()=> {
        const {error} = await dispatch(userActions.deleteById(_id));
        if (!error) navigate(-1)
    }

    return (
        <div>
            <h3 style={{cursor: "pointer"}} onClick={() => setStateUpd(true)}>Оновити особисті дані</h3>
            {stateUpd &&
                <div style={{border: 'solid'}}>
                    <form onSubmit={handleSubmit(submit)}>
                        <label>Ім'я <input type="text" defaultValue={name} {...register('name')}/></label>
                        <br/>
                        <label>Аватарка <input type="file" {...register('avatar')}/></label>
                        <br/>
                        <button>Оновити</button>
                    </form>
                    <button onClick={() => setStateUpd(false)}> Відмінити</button>
                </div>
            }
                <div>
                <h3 style={{cursor: 'pointer', fontSize: '20px', color: 'orange'}}
                    onClick={() => setConfirmDelete(true)}> Видалити користувача</h3>
                {confirmDelete &&
                    <div>
                        <p style={{color: 'red'}}> Ви упевнені що хочете видалити користувача?</p>
                        <button onClick={clickDelete}>Так</button>
                        <button onClick={() => setConfirmDelete(false)}>Ні</button>
                    </div>}
            </div>
        </div>
    );
};


export {UserUpdateDelete}
