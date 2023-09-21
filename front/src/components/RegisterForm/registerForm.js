import {useForm} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {useState} from 'react';

import {authActions} from '../../redux';
import {regex} from '../../constants';
import {ModalUC} from '../ModalUC/ModalUC';

const RegisterForm = ({isManager}) => {
    const {register, handleSubmit} = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {errors} = useSelector(state => state.auth);

    const [errorIsVisible, setErrorIsVisible] = useState(false);
    const [errorsMessage, setErrorsMessage] = useState(false);
    const regexPassword = regex.password;
    const regexEmail = regex.email;

    const submit = async (data) => {//дата приходить с форми у вигляді: {name: 'qwer', email: 'qwer@i.ua', password: 'qwer123'}
        if (!regexEmail.test(data.email)) {
            setErrorsMessage('Некоректний email');
            setErrorIsVisible(true);
        }
        else if (!regexPassword.test(data.password)) {
            setErrorsMessage('Пароль повинен містити тільки латинські літери і цифри');
            setErrorIsVisible(true);
        }
         else {
             const {error} = await dispatch(authActions.register({user: data, isManager}));

                if (error) {
                    setErrorsMessage(errors.message);
                    setErrorIsVisible(true);
                }
                else navigate('../login');
        }
    };

    return (
        <div>
            <ModalUC modalText={errorsMessage} show={errorIsVisible} onHide={setErrorIsVisible} type={'danger'}></ModalUC>
            <p style={{color: 'royalblue'}}>Пароль повинен містити тільки латинські літери і цифри і мати довжину не менше 8 символів</p>
            <form onSubmit={handleSubmit(submit)}>
                <input type='text' placeholder={'ім’я'} {...register('name', {
                    minLength: {value:3, message: 'Ім’я повинно містити не менше 3х символів'},
                    maxLength: {value:20, message: 'Ім’я повинно містити не більше 20ти символів'}})}/>
                <input type='text' placeholder={'email'} {...register('email')}/>
                <input type='password' placeholder={'пароль'} {...register('password', {
                    minLength: {value:8, message: 'Пароль повинен мати довжину не менше 8 символів'}})}/>
                {!isManager ?
                    <button>Зареєструватись</button>
                    :
                    <button>Зареєструватись як менеджер закладу</button>}

            </form>

        </div>
    );
};

export {RegisterForm};
