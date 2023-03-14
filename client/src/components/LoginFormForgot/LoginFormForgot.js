import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

import {Button} from "react-bootstrap";
import {useState} from "react";
import {authService} from "../../services";


const LoginFormForgot = () => {
    const {register, handleSubmit} = useForm()
    const [stateForgot, setStateForgot] = useState(false);
    const [stateForgotDone, setStateForgotDone] = useState(false);

    let errorMessage = null
    const submitForgot = async (data) => {
         const {error,payload} = await authService.forgotPasswordRequest(data)
            if (!error) {
                setStateForgot(false);
                setStateForgotDone(true)}
            else errorMessage = payload.message
         }

    return (
        <div>
            <div>
                Забули пароль?
                <Button onClick={() => setStateForgot(true)}>Так</Button>
            </div>
            {errorMessage && <h5 style={{color:'red'}}>{errorMessage}</h5>}
            {stateForgotDone && <h4>Перевірте пошту. Вам на пошту був відправлений лист з посиланням на сторінку відновлення паролю</h4>}
            {stateForgot &&
                <div>
                    <h4> Вкажіть свій email і вам на пошту буде відправлений лист з посиланням на сторінку відновлення паролю</h4>
                    <form onSubmit={handleSubmit(submitForgot)}>
                        <input type='text' placeholder={'email'} {...register('email')}/>
                        <button>Відправити</button>
                    </form>
                </div>}


        </div>
    )
}


export {LoginFormForgot};