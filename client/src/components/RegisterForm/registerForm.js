import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {authActions} from "../../redux";



const RegisterForm = () => {

    const {register, handleSubmit} = useForm()
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {errors} = useSelector(state => state.auth)
       const submit = async (data) => {//дата приходить с форми у вигляді: {name: 'qwer', email: 'qwer@i.ua', password: 'qwer123'}
        const {error} = await dispatch(authActions.register({user: data}))
        //  при неуспішному виконанні: error = {message: 'Rejected'}, payload:{message: 'Email is already exist'}

        if (!error) {
            navigate('../login')
        }
    }

        return (
            <div>
                <form onSubmit={handleSubmit(submit)}>
                    <input type='text' placeholder={'ім’я'} {...register('name')}/>
                    <input type='text' placeholder={'email'} {...register('email')}/>
                    <input type='text' placeholder={'пароль'} {...register('password')}/>
                    <button>Зареєструватись</button>
                </form>

            </div>
        )
    }


export {RegisterForm};
