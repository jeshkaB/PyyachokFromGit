import {useForm} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {useState} from 'react';

import {authActions} from '../../redux';
import {ModalUC} from '../ModalUC/ModalUC';

const LoginForm = () => {
    const {register, handleSubmit} = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {errors} = useSelector(state => state.auth);

    const [errorIsVisible, setErrorIsVisible] = useState(false);

    const submit = async (data) => {//дата приходить с форми у вигляді: {name: 'qwer', email: 'qwer@i.ua', password: 'qwer123'}
        const {error} = await dispatch(authActions.login({user: data}));//  при неуспішному виконанні: error = {message: 'Rejected'}, payload:{message: 'Email is already exist'}
        if (!error) {
            navigate('../home');
        } else setErrorIsVisible(true);
    };

    return (
        <div style={{margin: '20px'}}>
            <ModalUC modalText={errors?.message} show={errorIsVisible} onHide={setErrorIsVisible}
                     type={'danger'}></ModalUC>

            <form onSubmit={handleSubmit(submit)}>
                <input type='text' placeholder={'email'} {...register('email')}/>
                <input type='text' placeholder={'пароль'} {...register('password')}/>
                <button>Увійти</button>
            </form>
        </div>
    );
};


export {LoginForm};
