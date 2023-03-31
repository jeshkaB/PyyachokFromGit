import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {useState} from 'react'
import {useNavigate} from "react-router-dom";

import {userActions} from "../../redux";
import {ModalUC} from "../ModalUC/ModalUC";

import css from './UserUpdate&Delete.module.css'


const UserUpdateDelete = ({user}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {register, handleSubmit} = useForm()
    const {_id, name} = user;
    const [stateUpd, setStateUpd] = useState(false)
    const [confirmDelete, setConfirmDelete] = useState(false)
    const [modalIsVisible, setModalIsVisible] = useState(false)



    const submit = async (data) => {
        const formData = new FormData();
        formData.append('name', data.name)
        if (data.avatar[0])
            formData.append('avatar', data.avatar[0])

        await dispatch(userActions.updateById({id: _id, userObj: formData}))
        setStateUpd(false)
        setModalIsVisible(true)
    }
    const clickDelete = async ()=> {
        const {error} = await dispatch(userActions.deleteById(_id));
        if (!error) navigate(-1)
    }

    return (
        <div className={css.Hole}>
            <ModalUC modalText={'Увійдіть або зареєструйтеся'} show={modalIsVisible} onHide={setModalIsVisible}></ModalUC>
            <h3>Редагування користувача </h3>
            <div className={css.To} onClick={() => setStateUpd(true)}>Оновити особисті дані</div>
            {stateUpd &&
                <div style={{border: 'solid'}}>
                    <form onSubmit={handleSubmit(submit)}>
                        <label>Ім'я <input type="text" defaultValue={name} {...register('name')}/></label>
                        <br/>
                        <label>Аватарка <input type="file" {...register('avatar')}/></label>
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


export {UserUpdateDelete}
