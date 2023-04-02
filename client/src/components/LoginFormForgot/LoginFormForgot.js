import {useForm} from "react-hook-form";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {ModalUC} from "../ModalUC/ModalUC";
import {authActions} from "../../redux";

const LoginFormForgot = () => {
    const {register, handleSubmit} = useForm()
    const dispatch = useDispatch()
    const {errors} = useSelector(state => state.auth)

    const [stateForgot, setStateForgot] = useState(false);
    const [errorIsVisible, setErrorIsVisible] = useState(false)
    const [modalIsVisible, setModalIsVisible] = useState(false)

    const submitForgot = async (data) => {
        const {error} = await dispatch(authActions.forgotPasswordRequest(data))
        if (!error) {
            setStateForgot(false);
            setModalIsVisible(true)
        }else setErrorIsVisible(true)
    }

    return (
        <div style={{marginLeft: '20px'}}>
            <ModalUC modalText={errors?.message} show={errorIsVisible} onHide={setErrorIsVisible} type={'danger'}></ModalUC>
            <ModalUC modalText={'Перевірте пошту. Вам на пошту був відправлений лист з посиланням на сторінку відновлення паролю'}
                     show={modalIsVisible}
                     onHide={setModalIsVisible}
                     type={'success'}></ModalUC>
            <div >
                Забули пароль?
                <button style={{margin: '5px'}} onClick={() => setStateForgot(true)}>Так</button>
            </div>
            {stateForgot &&
                <div>
                    <h4> Вкажіть свій email і вам на пошту буде відправлений лист з посиланням на сторінку відновлення
                        паролю</h4>
                    <form onSubmit={handleSubmit(submitForgot)}>
                        <input type='text' placeholder={'email'} {...register('email')}/>
                        <button>Відправити</button>
                        <button style={{margin: '5px'}} onClick={()=>setStateForgot(false)}>Відмінити</button>
                    </form>
                </div>}
        </div>
    )
}


export {LoginFormForgot};
