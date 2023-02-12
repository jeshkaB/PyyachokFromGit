import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {authActions} from "../../redux";
import {roles} from "../../constants"

const RegisterForm = ({isManager}) => {
    const {register, handleSubmit} = useForm()
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submit = async (data) => {//дата приходить с форми у вигляді: {name: 'qwer', email: 'qwer@i.ua', password: 'qwer123'}
        let res;
        if (!isManager)
            res = await dispatch(authActions.register({user: data}))
        else
            res = await dispatch(authActions.register({user: {...data, role: [roles.USER, roles.REST_ADMIN]}}))
        //  при неуспішному виконанні цей запит повератє: {error} = {message: 'Rejected'}, payload:{message: 'Email is already exist'}

        if (!res.error) {
            navigate('../login')
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit(submit)}>
                <input type='text' placeholder={'ім’я'} {...register('name')}/>
                <input type='text' placeholder={'email'} {...register('email')}/>
                <input type='text' placeholder={'пароль'} {...register('password')}/>
                {!isManager ?
                    <button>Зареєструватись</button>
                    :
                    <button>Зареєструватись як менеджер закладу</button>}

            </form>

        </div>
    )
}


export {RegisterForm};
