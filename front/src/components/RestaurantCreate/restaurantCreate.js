import {useForm} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import {useState} from 'react';

import {restaurantActions} from '../../redux';

import {ModalUC} from '../ModalUC/ModalUC';
import css from '../RestaurantUpdate/RestaurantUpdate.module.css';
import {acceptedFileTypes, regex} from '../../constants';


const RestaurantCreate = () => {
    const dispatch = useDispatch();
    const {errors} = useSelector(state => state.restaurant);

    const {phone: phoneRegex, email: emailRegex, webSite: webSiteRegex} = regex;

    const [stateCreate, setStateCreate] = useState(false);
    const [modalIsVisible, setModalIsVisible] = useState(false);
    const [errorIsVisible, setErrorIsVisible] = useState(false);
    const [errorsMessage, setErrorsMessage] = useState(false);

    const {acceptedImageTypes} = acceptedFileTypes;

    const {register, handleSubmit, formState: {errors: inputErrors}} = useForm({mode: 'onBlur'});
    const submit = async (data) => {
        const formData = new FormData();
        formData.append('name', data.name);
        if (acceptedImageTypes.includes(data.mainImage[0].type))
            formData.append('mainImage', data.mainImage[0]);
        else {
            setErrorsMessage('Виберіть файл типу "jpg"/"jpeg');
            setErrorIsVisible(true);
        }
        formData.append('place', data.place);
        formData.append('hours', data.hours);
        formData.append('phone', data.phone);
        formData.append('averageBill', data.averageBill);
        formData.append('email', data.email);
        formData.append('coordinates', data.longitude);
        formData.append('coordinates', data.latitude);
        data.webSite && formData.append('webSite', data.webSite);
        data.tags && formData.append('tags', data.tags);
        const {error} = await dispatch(restaurantActions.create({restObj: formData}));
        if (!error) {
            setStateCreate(false);
            setModalIsVisible(true);
        } else {
            setErrorsMessage(errors.message);
            setErrorIsVisible(true);
        }
    };

    return (
        <div>
            <ModalUC modalText={'Заклад успішно створено, очікує модерацію'} show={modalIsVisible}
                     onHide={setModalIsVisible}></ModalUC>
            <ModalUC modalText={errorsMessage} show={errorIsVisible} onHide={setErrorIsVisible}
                     type={'danger'}></ModalUC>

            <h3 className={css.To} onClick={() => setStateCreate(true)}> Створити заклад </h3>
            {stateCreate &&
                <div className={css.Form}>
                    <form onSubmit={handleSubmit(submit)}>
                        <p style={{color: 'royalblue'}}>Поля, позначені *, обов’язкові для заповнення!</p>
                        <label>Назва*
                            <input {...register('name', {
                                    maxLength: {
                                        value: 20,
                                        message: 'максимальна довжина - 20 символів'
                                    }
                                }
                            )}
                            />
                        </label>
                        <div style={{color: 'red'}}> {inputErrors?.name &&
                            <p> {inputErrors.name.message || Error}</p>}</div>
                        <br/>
                        <label>Зображення*
                            <input type="file" accept=".jpg, .jpeg" {...register('mainImage', {
                                required: 'поле обов’язкове до заповнення',
                            })}
                            />
                        </label>
                        <div style={{color: 'red'}}> {inputErrors?.mainImage &&
                            <p> {inputErrors.mainImage.message || Error}</p>}</div>
                        <br/>
                        <label>Адреса*
                            <input {...register('place', {
                                required: 'поле обов’язкове до заповнення',
                            })}
                            />
                        </label>
                        <div style={{color: 'red'}}> {inputErrors?.place &&
                            <p> {inputErrors.place.message || Error}</p>}</div>
                        <br/>
                        <label>Координати в форматі lat lng*
                            <input placeholder={'lat від 50.1 до 50.7'} {...register('latitude', {
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
                            <div style={{color: 'red'}}> {inputErrors?.latitude &&
                                <p> {inputErrors.latitude.message || Error}</p>}</div>
                            <input placeholder={' lng від 30.0 до 31.0'}  {...register('longitude', {
                                required: 'поле обов’язкове до заповнення',
                                min: {
                                    value: 30.0,
                                    message: 'мінімальна довгота (longitude) - 30.0'
                                },
                                max: {
                                    value: 31.0,
                                    message: 'максимальна довгота (longitude) - 31.0'
                                },
                            })}/>
                            <div style={{color: 'red'}}> {inputErrors?.longitude &&
                                <p> {inputErrors.longitude.message || Error}</p>}</div>

                        </label>
                        <br/>
                        <label>Режим роботи*
                            <input {...register('hours', {
                                required: 'поле обов’язкове до заповнення',
                            })}
                            />
                        </label>
                        <div style={{color: 'red'}}> {inputErrors?.hours &&
                            <p> {inputErrors.hours.message || Error}</p>}</div>
                        <br/>
                        <label>Середній чек*
                            <input type="number" {...register('averageBill', {
                                required: 'поле обов’язкове до заповнення',
                                valueAsNumber: 'тут повинно бути число'
                            })}
                            />
                        </label>
                        <br/>
                        <label>Телефон*
                            <input placeholder={'+380XXXXXXXXX'}{...register('phone', {
                                required: 'поле обов’язкове до заповнення',
                                pattern: {
                                    value: phoneRegex,
                                    message: 'невірний формат номеру (має бути +380XXXXXXXXX)'
                                }
                            })}
                            />
                        </label>
                        <div style={{color: 'red'}}> {inputErrors?.phone &&
                            <p> {inputErrors.phone.message || Error}</p>}</div>
                        <br/>
                        <label>Email*
                            <input {...register('email', {
                                required: 'поле обов’язкове до заповнення',
                                pattern: {
                                    value: emailRegex,
                                    message: 'невірний email'
                                }
                            })}
                            />
                        </label>
                        <div style={{color: 'red'}}> {inputErrors?.email &&
                            <p> {inputErrors.email.message || Error}</p>}</div>
                        <br/>
                        <label>Сайт
                            <input {...register('webSite', {
                                pattern: {
                                    value: webSiteRegex,
                                    message: 'некоректна назва сайту'
                                }
                            })}
                            />
                        </label>
                        <div style={{color: 'red'}}> {inputErrors?.webSite &&
                            <p> {inputErrors.webSite.message || Error}</p>}</div>
                        <br/>
                        <label>Теги (через кому) <input {...register('tags')}/></label>
                        <br/>
                        <button>Створити</button>
                    </form>
                    <button style={{marginTop: 5}} onClick={() => setStateCreate(false)}> Відмінити</button>
                </div>
            }

        </div>
    );
};

export {RestaurantCreate};
