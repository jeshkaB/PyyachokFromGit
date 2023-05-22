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
        else if  (data.password.length < 8) {
            setErrorsMessage ('Пароль повинен мати довжину не менше 8 символів');
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
                <input type='text' placeholder={'ім’я'} {...register('name')}/>
                <input type='text' placeholder={'email'} {...register('email')}/>
                <input type='text' placeholder={'пароль'} {...register('password')}/>
                {!isManager ?
                    <button>Зареєструватись</button>
                    :
                    <button>Зареєструватись як менеджер закладу</button>}

            </form>

        </div>
    );
};

export {RegisterForm};
