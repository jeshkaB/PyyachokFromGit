import {useForm} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

import {userActions} from '../../redux';
import {ModalUC} from '../ModalUC/ModalUC';

import css from './UserUpdate&Delete.module.css';
import {acceptedFileTypes} from "../../constants";


const UserUpdateDelete = ({user}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {errors} = useSelector(state => state.user);

    const {register, handleSubmit} = useForm();
    const {_id, name} = user;
    const [stateUpd, setStateUpd] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [errorIsVisible, setErrorIsVisible] = useState(false);
    const [errorsMessage, setErrorsMessage] = useState(false);
    const [modalIsVisible, setModalIsVisible] = useState(false);

    const {acceptedImageTypes} = acceptedFileTypes;

    const submit = async (data) => {
        if (acceptedImageTypes.includes(data.avatar[0].type)) {
            const formData = new FormData();
            formData.append('name', data.name);
            if (data.avatar[0])
                formData.append('avatar', data.avatar[0]);
            const {error} = await dispatch(userActions.updateById({id: _id, userObj: formData}));
            if (!error) {
                setStateUpd(false);
                setModalIsVisible(true);
            } else {
                setErrorsMessage(errors?.message);
                setErrorIsVisible(true);
            }
        }else {
            setErrorsMessage('Виберіть файл типу "jpg"/"jpeg"');
            setErrorIsVisible(true);
        }
    };

    const clickDelete = async ()=> {
        const {error} = await dispatch(userActions.deleteById(_id));
        if (!error) navigate(-1);
    };

    return (
        <div className={css.Hole}>
            <ModalUC modalText={errorsMessage} show={errorIsVisible} onHide={setErrorIsVisible} type={'danger'}></ModalUC>
            <ModalUC modalText={'Дані успішно оновлено'} show={modalIsVisible} onHide={setModalIsVisible} type={'success'}></ModalUC>

            <h3>Редагування користувача </h3>
            <div className={css.To} onClick={() => setStateUpd(true)}>Оновити особисті дані</div>
            {stateUpd &&
                <div style={{border: 'solid'}}>
                    <form onSubmit={handleSubmit(submit)}>
                        <label>Ім'я <input type="text" defaultValue={name} {...register('name')}/></label>
                        <br/>
                        <label>Аватарка <input type="file" accept=".jpg, .jpeg" {...register('avatar')}/></label>
                        <br/>
                        <button>Оновити</button>
                    </form>
                    <button style={{marginTop:5}} onClick={() => setStateUpd(false)}> Відмінити</button>
                </div>
            }
                <div>
                <div className={css.ToDel}
                    onClick={() => setConfirmDelete(true)}> Видалити користувача</div>
                {confirmDelete &&
                    <div>
                        <p style={{color: 'red'}}> Ви упевнені що хочете видалити користувача?</p>
                        <button onClick={clickDelete}>Так</button>
                        <button style={{marginLeft:5}}onClick={() => setConfirmDelete(false)}>Ні</button>
                    </div>}
            </div>
        </div>
    );
};


export {UserUpdateDelete};
