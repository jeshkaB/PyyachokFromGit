import {useForm} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import {useState} from 'react';
import {useLocation} from 'react-router-dom';

import {generalNewsActions, newsActions} from '../../redux';
import {Dropdown} from 'react-bootstrap';
import {acceptedFileTypes, categoriesOfNews} from '../../constants';

import css from './NewsUpdate.module.css';
import {ModalUC} from '../ModalUC/ModalUC';

const NewsUpdate = ({news}) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const {register, handleSubmit} = useForm();
    const {_id, title, content, category} = news;
    const {errors} = useSelector(state=>state.news);

    const [stateUpdate, setStateUpdate] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [errorIsVisible, setErrorIsVisible] = useState(false);
    const [errorsMessage, setErrorsMessage] = useState(false);
    const {acceptedImageTypes} = acceptedFileTypes;

    const categories = categoriesOfNews.categories;
    const submit = async (data) => {
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('content', data.content);
        if (data.newsImage[0]) {
            if (acceptedImageTypes.includes(data.newsImage[0].type))
                formData.append('newsImage', data.newsImage[0]);
            else {
                setErrorsMessage('Виберіть файл типу "jpg"/"jpeg"');
                setErrorIsVisible(true);
            }
        }
        formData.append('category', selectedCategory || category);
        if (location.pathname===`/generalNews/${_id}`) {
            const {error} = await dispatch(generalNewsActions.updateById({id: _id, newsObj: formData}));
            if (!error)
                setStateUpdate(false);
            else {
                setErrorsMessage(errors?.message);
                setErrorIsVisible(true);
            }
        }
        else {
            const {error} = await dispatch(newsActions.updateById({id: _id, newsObj: formData}));
            if (!error)
                setStateUpdate(false);
            else {
                setErrorsMessage(errors?.message);
                setErrorIsVisible(true);
            }
        }
    };
    return (
        <div>
            <ModalUC modalText={errorsMessage} show={errorIsVisible} onHide={setErrorIsVisible} type={'danger'}></ModalUC>

            <div className={css.To} onClick={() => setStateUpdate(true)}> Редагувати новину </div>
            {stateUpdate &&
                <div className={css.Form}>
                    <Dropdown>
                        <Dropdown.Toggle variant={'outline-secondary'}>{selectedCategory || category}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {categories.map(categ =>
                                <Dropdown.Item key={categ} onClick={() => setSelectedCategory(categ)}>{categ}</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <form onSubmit={handleSubmit(submit)}>
                        <p style={{color: 'royalblue'}}>Поля, позначені *, обов’язкові для заповнення!</p>
                        <label>Заголовок* <textarea rows="2" cols="60" required={true} defaultValue={title} {...register('title')}></textarea></label>
                        <br/>
                        <label>Зміст/текст* <textarea rows="5" cols="60" required={true} defaultValue={content} {...register('content')}></textarea></label>
                        <br/>
                        <label>Зображення* <input type="file" accept="image/png, image/jpeg" {...register('newsImage')}/></label>
                        <br/>
                        <button style={{marginBottom:5}}>Оновити</button>
                    </form>
                    <button onClick={() => setStateUpdate(false)}> Відмінити</button>
                </div>
            }

        </div>
    );
};

export {NewsUpdate};
