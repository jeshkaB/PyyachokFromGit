import {useForm} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import {useState} from 'react';

import {restaurantActions} from '../../redux';

import css from './RestaurantUpdate.module.css';
import {ModalUC} from '../ModalUC/ModalUC';


const RestaurantUpdate= ({restaurant}) => {
    const dispatch = useDispatch();
    const {errors} = useSelector(state => state.restaurant);
    const {register, handleSubmit} = useForm();
    const {_id,name,place,hours,phone,averageBill,email,webSite,tags, coordinates:[longitude, latitude]=[]} = restaurant;

    const [stateUpdate, setStateUpdate] = useState(false);
    const [errorIsVisible, setErrorIsVisible] = useState(false);
    const [modalIsVisible, setModalIsVisible] = useState(false);

    const submit = async (data) => {
        const formData = new FormData();
        formData.append('name', data.name);
        data.mainImage[0] && formData.append('mainImage', data.mainImage[0]);
        formData.append('place', data.place);
        formData.append('hours', data.hours);
        formData.append('phone', data.phone);
        formData.append('averageBill', data.averageBill);
        formData.append('email', data.email);
        formData.append('coordinates', data.longitude);
        formData.append('coordinates', data.latitude);
        data.webSite && formData.append('webSite', data.webSite);
        data.tags && formData.append('tags', data.tags);
        const {error} = await dispatch(restaurantActions.updateById({id:_id, restObj: formData}));
        if (!error) setModalIsVisible(true);
        else setErrorIsVisible(true);
    };

    return (
        <div>
            <ModalUC modalText={errors?.message} show={errorIsVisible} onHide={setErrorIsVisible} type={'danger'}></ModalUC>
            <ModalUC modalText={'Дані успішно оновлено'} show={modalIsVisible} onHide={setModalIsVisible} type={'success'} executingFunction={setStateUpdate} funcValue={false}></ModalUC>

            <div className={css.To} onClick={()=>setStateUpdate(true)}> Оновити дані закладу</div>
            {stateUpdate &&
                <div className={css.Form}>
                    <form onSubmit={handleSubmit(submit)}>
                        <p style={{color: 'royalblue'}}>Поля, позначені *, обов’язкові для заповнення!</p>
                        <label>Назва* <input required={true} defaultValue={name} {...register('name')}/></label>
                        <br/>
                        <label>Зображення* <input type="file" accept="image/png, image/jpeg" {...register('mainImage')}/></label>
                        <br/>
                        <label>Адреса* <input required={true} defaultValue={place}  {...register('place')}/></label>
                        <br/>
                        <label>Координати в форматі lng lat*
                            <input required={true} defaultValue={longitude}  {...register('longitude')}/>
                            <input required={true} defaultValue={latitude}  {...register('latitude')}/>
                        </label>
                        <br/>
                        <label>Режим роботи* <input  required={true} defaultValue={hours} {...register('hours')}/></label>
                        <br/>
                        <label>Середній чек* <input type="number" required={true} defaultValue={averageBill}  {...register('averageBill')}/></label>
                        <br/>
                        <label>Телефон* <input required={true} defaultValue={phone} {...register('phone')}/></label>
                        <br/>
                        <label>Email* <input  required={true} defaultValue={email}  {...register('email')}/></label>
                        <br/>
                        <label>Сайт <input defaultValue={webSite} {...register('webSite')}/></label>
                        <br/>
                        <label>Теги <input defaultValue={tags} {...register('tags')}/></label>
                        <br/>
                        <button>Оновити</button>
                    </form>
                    <button style={{marginTop:5}} onClick={() => setStateUpdate(false)}> Відмінити</button>
                </div>
            }

        </div>
    );
};

export {RestaurantUpdate};
