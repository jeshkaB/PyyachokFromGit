import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

import {userActions} from "../../../redux";
import {ModalUC} from "../../ModalUC/ModalUC";

import css from './UpdateAccount.module.css'


const UpdateAccount = ({user}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {register, handleSubmit} = useForm({mode: 'all'})
    const {_id, name} = user;
    const {errors} = useSelector(state => state.user)
    const {errors: authErrors} = useSelector(state => state.auth)

    const [stateUpd, setStateUpd] = useState(false)
    const [modalIsVisible, setModalIsVisible] = useState(false)
    const [errorIsVisible, setErrorIsVisible] = useState(false)
    const [modalData, setModalData] = useState({text: '', type: 'secondary'})


    const submit = async (data) => {
        const formData = new FormData();
        formData.append('name', data.name)
        if (data.avatar[0])
            formData.append('avatar', data.avatar[0])
        const {error} = await dispatch(userActions.updateById({id: _id, userObj: formData}))
        if (!error) {
            setStateUpd(false)
            setModalData({text: 'Двні успішно змінено', type: 'success'})
            setModalIsVisible(true)
        } else setErrorIsVisible(true)
    }

    const [stateUpdPassword, setStateUpdPassword] = useState(false)
    const submitPass = async (data) => {
        const {error} = await dispatch(userActions.changePassword({id: _id, passObj: data}))
        setStateUpdPassword(false);
        if (!error) navigate('../login')
        else setErrorIsVisible(true)
    }

    return (
        <div>
            <ModalUC modalText={modalData.text} show={modalIsVisible} onHide={setModalIsVisible}
                     type={modalData.type}></ModalUC>
            <ModalUC modalText={errors?.message || authErrors?.message} show={errorIsVisible} onHide={setErrorIsVisible}
                     type={'danger'}></ModalUC>

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
                    <button onClick={() => setStateUpd(false)}> Відмінити</button>
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
                    <button onClick={() => setStateUpdPassword(false)}> Відмінити</button>
                </div>
            }
        </div>
    );
};

export {UpdateAccount}
