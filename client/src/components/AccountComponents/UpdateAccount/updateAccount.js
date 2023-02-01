import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {userActions, userReducer} from "../../../redux";
import {useEffect} from "react";

const UpdateAccount = ({user}) => {

    const {reset, register, handleSubmit, setValue} = useForm()
    const {stateOfUpdating} = useSelector(state => state.user)
    const {_id, name, password, avatar} = user;
    const dispatch = useDispatch();

    const updateUser = () => {
        dispatch(userActions.setStateOfUpdating(true))
    }


    // setValue('name', user.name)

    const submit = async (data) => {
        console.log(data)
        await dispatch(userActions.updateById({id: _id, userObj: data}))
    }

    return (
        <div>
            <p style={{cursor: "pointer"}} onClick={()=>updateUser()}>Оновити особисті дані</p>
            {/*<p style={{cursor: "pointer"}} onClick={()=>updatePassword()}>Оновити пароль</p>*/}
            {stateOfUpdating &&
                <div style={{border: 'solid'}}>
                    <form style={{display: 'inline-block'}}onSubmit={handleSubmit(submit)}>
                        <label>Ім'я   <input type="text" placeholder={name} {...register('name')}/></label>
                        <br/>
                        <label>Аватарка   <input type="file" placeholder={'додайте файл'} {...register('avatar')}/></label>
                        <br/>
                        <button>Оновити</button>
                    </form>
                </div>
            }
        </div>
    );
};

export {UpdateAccount}
