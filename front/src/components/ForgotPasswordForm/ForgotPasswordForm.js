import {useForm} from 'react-hook-form';
import {useNavigate, useSearchParams} from 'react-router-dom';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {authActions} from '../../redux';
import {ModalUC} from '../ModalUC/ModalUC';

const ForgotPasswordForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // eslint-disable-next-line no-unused-vars
    const [searchParams, setSearchParams] = useSearchParams();
    const {register, handleSubmit} = useForm();
    const {errors} = useSelector(state => state.auth);
    const actionToken = searchParams.get('token');
    const [stateError, setStateError] = useState(null);
    const [errorIsVisible, setErrorIsVisible] = useState(false);
    const [modalIsVisible, setModalIsVisible] = useState(false);


    const submit = async ({password, repeatPassword}) => {
        if (password !== repeatPassword) {
            setStateError('Введені паролі не співпадають');
            setErrorIsVisible(true);
        } else {
            const {error} = await dispatch(authActions.forgotPasswordNewPassword({password, actionToken}));
            if (!error) setModalIsVisible(true);
            else {
                setStateError(errors.message);
                setErrorIsVisible(true);
            }
        }
    };

    return (
        <div>
            <ModalUC modalText={stateError} show={errorIsVisible} onHide={setErrorIsVisible} type={'danger'}></ModalUC>
            <ModalUC modalText={'Тепер можете увійти під новим паролем'} show={modalIsVisible}
                     onHide={setModalIsVisible} type={'success'}
                     executingFunction={navigate}
                     funcValue={'../login'}> </ModalUC>

            <h3> Будь ласка, встановіть новий пароль і увійдіть на сайт під новим паролем</h3>
            <form onSubmit={handleSubmit(submit)}>
                <input type={'password'} placeholder={'введіть пароль'} {...register('password')}/>
                <input type={'password'} placeholder={'повторіть пароль'} {...register('repeatPassword')}/>
                <button>Підтвердити</button>
            </form>
        </div>
    );
};

export {ForgotPasswordForm};
