import {useForm} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import {useState} from 'react';

import {restaurantActions} from '../../redux';

import css from './RestaurantUpdate.module.css';
import {ModalUC} from '../ModalUC/ModalUC';
import {acceptedFileTypes, regex} from '../../constants';


const RestaurantUpdate = ({restaurant}) => {
    const dispatch = useDispatch();
    const {errors} = useSelector(state => state.restaurant);

    const {
        _id,
        name,
        place,
        hours,
        phone,
        averageBill,
        email,
        webSite,
        tags,
        coordinates: [longitude, latitude] = []
    } = restaurant;

    const {phone: phoneRegex, email: emailRegex, webSite: webSiteRegex} = regex;

    const [stateUpdate, setStateUpdate] = useState(false);
    const [errorIsVisible, setErrorIsVisible] = useState(false);
    const [modalIsVisible, setModalIsVisible] = useState(false);
    const [errorsMessage, setErrorsMessage] = useState(false);

    const {acceptedImageTypes} = acceptedFileTypes;

    const {register, handleSubmit, formState:{errors: inputErrors}} = useForm({mode: 'onBlur'});
    const submit = async (data) => {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('place', data.place);
        formData.append('hours', data.hours);
        formData.append('phone', data.phone);
        formData.append('averageBill', data.averageBill);
        formData.append('email', data.email);
        formData.append('coordinates', data.longitude);
        formData.append('coordinates', data.latitude);
        if (data.mainImage[0]) {
            if (acceptedImageTypes.includes(data.mainImage[0].type)) {
                formData.append('mainImage', data.mainImage[0]);
            } else {
                setErrorsMessage('Виберіть файл типу "jpg"/"jpeg');
                setErrorIsVisible(true);
            }
        }
        data.webSite && formData.append('webSite', data.webSite);
        data.tags && formData.append('tags', data.tags);
        const {error} = await dispatch(restaurantActions.updateById({id: _id, restObj: formData}));
        if (!error) setModalIsVisible(true);
        else {
            setErrorsMessage(errors?.message);
            setErrorIsVisible(true);
        }
    };

    return (
        <div>
            <ModalUC modalText={errorsMessage} show={errorIsVisible} onHide={setErrorIsVisible}
                     type={'danger'}></ModalUC>
            <ModalUC modalText={'Дані успішно оновлено'} show={modalIsVisible} onHide={setModalIsVisible}
                     type={'success'} executingFunction={setStateUpdate} funcValue={false}></ModalUC>

            <div className={css.To} onClick={() => setStateUpdate(true)}> Оновити дані закладу</div>
            {stateUpdate &&
                <div className={css.Form}>
                    <form onSubmit={handleSubmit(submit)}>
                        <p style={{color: 'royalblue'}}>Поля, позначені *, обов’язкові для заповнення!</p>
                        <label>Назва* <input defaultValue={name} {...register('name', {
                            required: 'поле обов’язкове до заповнення',
                            maxLength: {
                                value:20,
                                message: 'максимальна довжина - 20 символів'
                            }}
                        )}
                        />
                        </label>
                        <div style={{color:'red'}}> {inputErrors?.name && <p> {inputErrors.name.message || Error}</p>}</div>
                        <br/>
                        <label>Зображення* <input type="file"
                                                  accept=".jpg, .jpeg" {...register('mainImage')}/></label>
                        <br/>
                        <label>Адреса* <input defaultValue={place}  {...register('place', {
                            required: 'поле обов’язкове до заповнення'})}/>
                        </label>
                        <br/>
                        <label>Координати в форматі lat lng*
                            <input defaultValue={latitude} {...register('latitude', {
                                required: 'поле обов’язкове до заповнення',
                                min: {
                                    value: 50.1,
                                    message: 'мінімальна широта (latitude) - 50.1'
                                },
                                max: {
                                    value: 50.7,
                                    message: 'максимальна широта (latitude) - 50.7'
                                },
                            })}/>
                            <div style={{color:'red'}}> {inputErrors?.latitude && <p> {inputErrors.latitude.message || Error}</p>}</div>
                            <input defaultValue={longitude} {...register('longitude', {
                                required: 'поле обов’язкове до заповнення',
                                min: {
                                    value: 30.0,
                                    message: 'мінімальна довгота (llongitude) - 30.0'
                                },
                                max: {
                                    value: 31.0,
                                    message: 'максимальна довгота (longitude) - 31.0'
                                },
                            })}/>
                            <div style={{color:'red'}}> {inputErrors?.longitude && <p> {inputErrors.longitude.message || Error}</p>}</div>
                        </label>
                        <br/>
                        <label>Режим роботи* <input
                            defaultValue={hours} {...register('hours', {required: 'поле обов’язкове до заповнення'})}/></label>
                        <br/>
                        <label>Середній чек* <input type="number"
                                                    defaultValue={averageBill}  {...register('averageBill', {
                            valueAsNumber: 'тут повинно бути число'
                        })}
                        />
                        </label>
                        <div style={{color:'red'}}> {inputErrors?.hours && <p> {inputErrors.hours.message || Error}</p>}</div>
                        <br/>
                        <label>Телефон* <input defaultValue={phone} {...register('phone', {
                            required: 'поле обов’язкове до заповнення',
                            pattern: {
                                value: phoneRegex,
                                message: 'невірний формат номеру (має бути +380XXXXXXXXX)'
                            }
                        })}
                        />
                        </label>
                        <div style={{color:'red'}}> {inputErrors?.phone && <p> {inputErrors.phone.message || Error}</p>}</div>
                        <br/>
                        <label>Email* <input defaultValue={email}  {...register('email', {
                            required: 'поле обов’язкове до заповнення',
                            pattern: {
                                value: emailRegex,
                                message: 'невірний email'
                            }
                        })}
                        />
                        </label>
                        <div style={{color:'red'}}> {inputErrors?.email && <p> {inputErrors.email.message || Error}</p>}</div>
                        <br/>
                        <label>Сайт <input defaultValue={webSite} {...register('webSite', {
                            pattern: {
                                value: webSiteRegex,
                                message: 'невірна назва сайту'
                            }
                        })}
                        />
                        </label>
                        <div style={{color:'red'}}> {inputErrors?.webSite && <p> {inputErrors.webSite.message || Error}</p>}</div>
                        <br/>
                        <label>Теги <input defaultValue={tags} {...register('tags')}/></label>
                        <br/>
                        <button>Оновити</button>
                    </form>
                    <button style={{marginTop: 5}} onClick={() => setStateUpdate(false)}> Відмінити</button>
                </div>
            }

        </div>
    );
};

export {RestaurantUpdate};
