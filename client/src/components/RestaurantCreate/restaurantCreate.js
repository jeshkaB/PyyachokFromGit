import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";

import {restaurantActions} from "../../redux";

import {ModalUC} from "../ModalUC/ModalUC";
import css  from '../RestaurantUpdate/RestaurantUpdate.module.css'


const RestaurantCreate = () => {
    const dispatch = useDispatch();
    const {errors} = useSelector(state => state.restaurant)
    const {register, handleSubmit} = useForm()

    const [stateCreate, setStateCreate] = useState(false)
    const [modalIsVisible, setModalIsVisible] = useState(false)
    const [errorIsVisible, setErrorIsVisible] = useState(false)

    const submit = async (data) => {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('mainImage', data.mainImage[0]);
        formData.append('place', data.place);
        formData.append('hours', data.hours);
        formData.append('phone', data.phone);
        formData.append('averageBill', data.averageBill);
        formData.append('email', data.email);
        formData.append('coordinates', data.longitude);
        formData.append('coordinates', data.latitude);
        data.webSite && formData.append('webSite', data.webSite);
        data.tags && formData.append('tags', data.tags);
        const {error} = await dispatch(restaurantActions.create({restObj: formData}))
        if (!error) {
            setStateCreate(false)
            setModalIsVisible(true)}
        else setErrorIsVisible(true)
    }

    return (
        <div>
            <ModalUC modalText={'Заклад успішно створено, очікує модерацію'} show={modalIsVisible} onHide={setModalIsVisible}></ModalUC>
            <ModalUC modalText={errors?.message} show={errorIsVisible} onHide={setErrorIsVisible} type={'danger'}></ModalUC>

            <h3 className={css.To} onClick={() => setStateCreate(true)}> Створити заклад </h3>
            {stateCreate &&
                <div className={css.Form}>
                    <form onSubmit={handleSubmit(submit)}>
                        <p style={{color: "royalblue"}}>Поля, позначені *, обов’язкові для заповнення!</p>
                        <label>Назва* <input  required={true} {...register('name')}/></label>
                        <br/>
                        <label>Зображення* <input type="file" accept="image/png, image/jpeg" required={true} {...register('mainImage')}/></label>
                        <br/>
                        <label>Адреса* <input required={true} {...register('place')}/></label>
                        <br/>
                        <label>Координати в форматі lng lat*
                            <input required={true}  {...register('longitude')}/>
                            <input required={true}  {...register('latitude')}/>
                        </label>
                        <br/>
                        <label>Режим роботи* <input  required={true} {...register('hours')}/></label>
                        <br/>
                        <label>Середній чек* <input type="number" required={true} {...register('averageBill')}/></label>
                        <br/>
                        <label>Телефон* <input required={true} {...register('phone')}/></label>
                        <br/>
                        <label>Email* <input  required={true} {...register('email')}/></label>
                        <br/>
                        <label>Сайт <input {...register('webSite')}/></label>
                        <br/>
                        <label>Теги <input {...register('tags')}/></label>
                        <br/>
                        <button>Створити</button>
                    </form>
                    <button style={{marginTop:5}} onClick={() => setStateCreate(false)}> Відмінити</button>
                </div>
            }

        </div>
    );
}

export {RestaurantCreate}
