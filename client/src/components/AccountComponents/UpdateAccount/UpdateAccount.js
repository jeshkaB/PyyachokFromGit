import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

import {authActions, userActions} from "../../../redux";

import css from './UpdateAccount.module.css'
import {ModalUC} from "../../ModalUC/ModalUC";

const UpdateAccount = ({user}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {register, handleSubmit} = useForm({mode:'all'})
    const {_id, name} = user;
    const {errors} = useSelector(state => state.user)

    const [stateUpd, setStateUpd] = useState(false)
    const [modalIsVisible, setModalIsVisible] = useState(false)
     const [errorIsVisible, setErrorIsVisible] = useState(false)



    const submit = async (data) => {
        const formData = new FormData();
        formData.append('name', data.name)
        if (data.avatar[0])
            formData.append('avatar', data.avatar[0])
        const {error} = await dispatch(userActions.updateById({id: _id, userObj: formData}))
        if (!error) {
            setStateUpd(false)
            setModalIsVisible(true)
        }
        else setErrorIsVisible(true)
    }

    const [stateUpdPassword, setStateUpdPassword] = useState(false)
    const submitPass = async (data) => {
        const {error:userError} = await dispatch(userActions.changePassword({id: _id, passObj: data}))
        setStateUpdPassword(false);
        let resAuth
        if (!userError) resAuth = await dispatch(authActions.logoutFromEverywhere())
        if (!userError && !resAuth.error) alert('Пароль успішно змінено, авторизуйтесь з новим паролем')
        navigate('../login')
    }

    return (
        <div>
            <ModalUC modalText={'Дані успішно оновлено'} show={modalIsVisible} onHide={setModalIsVisible} type={'success'}></ModalUC>
            <ModalUC modalText={errors?.message} show={errorIsVisible} onHide={setErrorIsVisible} type={'danger'}></ModalUC>

            <div className={css.To} onClick={() => setStateUpd(true)}>Оновити особисті дані</div>
            <div className={css.To} onClick={() => setStateUpdPassword(true)}>Змінити пароль</div>
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
