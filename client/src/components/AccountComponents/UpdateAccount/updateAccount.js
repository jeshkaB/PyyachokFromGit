import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {userActions} from "../../../redux";
import {useState} from "react";


const UpdateAccount = ({user}) => {

    const {reset, register, handleSubmit, setValue} = useForm()
    const {stateOfUpdating} = useSelector(state => state.user)
    const {_id, name} = user;
    const dispatch = useDispatch();

    const updateUser = () => {
        dispatch(userActions.setStateOfUpdating(true))
    }

    // const submit = async (data) => {
    //     const formData = new FormData();
    //     formData.append('avatar', data.avatar[0])
    //     formData.append('name', data.name)
    //     await dispatch(userActions.updateById({id: _id, userObj: formData}))
    // }
    const [stateUpdPassword, setstateUpdPassword] = useState(false)
    const updatePassword = ()=> {
        setstateUpdPassword(true)
    }
    const submitPass = async (data) =>{
        console.log(data)
        await dispatch(userActions.changePassword({id:_id, passObj: data}))

    }

    return (
        <div>
            <p style={{cursor: "pointer"}} onClick={()=>updateUser()}>Оновити особисті дані</p>
            <p style={{cursor: "pointer"}} onClick={()=>updatePassword()}>Змінити пароль</p>
            {/*{stateOfUpdating &&*/}
            {/*    <div style={{border: 'solid'}}>*/}
            {/*        <form onSubmit={handleSubmit(submit)}>*/}
            {/*            <label>Ім'я   <input type="text" defaultValue={name} {...register('name')}/></label>*/}
            {/*            <br/>*/}
            {/*            <label>Аватарка   <input type="file" {...register('avatar')}/></label>*/}
            {/*            <br/>*/}
            {/*            <button>Оновити</button>*/}
            {/*        </form>*/}
            {/*    </div>*/}
            {/*}*/}
            {stateUpdPassword &&
                <div style={{border: 'solid'}}>
                    <form onSubmit={handleSubmit(submitPass)}>
                        <label> Старий пароль    <input type="password" required={true}{...register('oldPassword')}/></label>
                        <br/>
                        <label> Новий пароль     <input type="password" required={true}{...register('newPassword')}/></label>
                        <br/>
                        <button>Змінити</button>
                    </form>
                </div>
            }
        </div>
    );
};

export {UpdateAccount}
