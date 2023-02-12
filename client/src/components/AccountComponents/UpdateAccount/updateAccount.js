import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {userActions} from "../../../redux";
import {useState} from "react";


const UpdateAccount = ({user}) => {

    const {register, handleSubmit} = useForm({mode:'all'})
    const {_id, name} = user;
    const dispatch = useDispatch();

    const [stateUpd, setStateUpd] = useState(false)
    const updateUser = () => {setStateUpd(true)}

    const submit = async (data) => {
        const formData = new FormData();
        formData.append('name', data.name)
        if (data.avatar[0])
            formData.append('avatar', data.avatar[0])

        await dispatch(userActions.updateById({id: _id, userObj: formData}))
        setStateUpd(false)
        alert('Дані успішно змінено')
    }

    const [stateUpdPassword, setStateUpdPassword] = useState(false)
    const updatePassword = () => {setStateUpdPassword(true)}
    const submitPass = async (data) => {
        await dispatch(userActions.changePassword({id: _id, passObj: data}))
        setStateUpdPassword(false)
        alert('Пароль успішно змінено')
    }

    return (
        <div>
            <h3 style={{cursor: "pointer"}} onClick={() => updateUser()}>Оновити особисті дані</h3>
            <h3 style={{cursor: "pointer"}} onClick={() => updatePassword()}>Змінити пароль</h3>
            {stateUpd &&
                <div style={{border: 'solid'}}>
                    <form onSubmit={handleSubmit(submit)}>
                        <label>Ім'я <input type="text" defaultValue={name} {...register('name')}/></label>
                        <br/>
                        <label>Аватарка <input type="file" {...register('avatar')}/></label>
                        <br/>
                        <button>Оновити</button>
                    </form>
                    <button onClick={()=>setStateUpd(false)}> Відмінити </button>
                </div>
            }
            {stateUpdPassword &&
                <div style={{border: 'solid'}}>
                    <form onSubmit={handleSubmit(submitPass)}>
                        <label> Старий пароль <input type="password"
                                                     required={true}{...register('oldPassword')}/></label>
                        <br/>
                        <label> Новий пароль <input type="password"
                                                    required={true}{...register('newPassword')}/></label>
                        <br/>
                        <button>Змінити</button>
                     </form>
                    <button onClick={()=>setStateUpdPassword(false)}> Відмінити </button>
                </div>
            }
        </div>
    );
};

export {UpdateAccount}
