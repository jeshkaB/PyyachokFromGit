import {set, useForm} from "react-hook-form";
import {ApiService, authService} from "../../services";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useState} from "react";
import {urls} from "../../constants";
import {useDispatch, useSelector} from "react-redux";
import {authActions} from "../../redux";

const ForgotPasswordForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [searchParams, setSearchParams] = useSearchParams();
    const {register, handleSubmit} = useForm();
    const {errors} = useSelector(state => state.auth);
    const [stateError, setStateError] = useState(null);
    const actionToken = searchParams.get('token')

        const submit = async ({password, repeatPassword}) => {
            setStateError(null)
            if (password !== repeatPassword)
            return setStateError('Введені паролі не співпадають')
            const {error} = await dispatch(authActions.forgotPasswordNewPassword({password, actionToken}))
            if (!error) navigate('../login')
        }

    return (
        <div>
            <h3> Будь ласка, встановіть новий пароль і увійдіть на сайт під новим паролем</h3>
            <form onSubmit={handleSubmit(submit)}>
                <input type={"password"} placeholder={'введіть пароль'} {...register('password')}/>
                <input type={"password"} placeholder={'повторіть пароль'} {...register('repeatPassword')}/>
                <button>Підтвердити</button>
            </form>
            {stateError && <h5 style={{color: 'red'}}>{stateError}</h5>}
            {errors && <h5 style={{color: 'red'}}>{errors.message}</h5>}
        </div>
    );
}

export {ForgotPasswordForm}
