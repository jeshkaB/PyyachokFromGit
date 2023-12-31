import {useForm} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

import {newsActions} from '../../redux';

import {categoriesOfNews} from '../../constants';

import css from './NewsCreate.module.css';
import {Dropdown} from 'react-bootstrap';
import {ModalUC} from '../ModalUC/ModalUC';

const NewsCreate = ({restId}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {errors} = useSelector(state => state.news);
    const {register, handleSubmit} = useForm();

    const [stateCreate, setStateCreate] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [errorIsVisible, setErrorIsVisible] = useState(false);


    const categories = categoriesOfNews.categories;
    const submit = async (data) => {
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('content', data.content);
        if (data.newsImage[0]) formData.append('newsImage', data.newsImage[0]);
        formData.append('category', selectedCategory);
        const {error, payload:{_id} } = await dispatch(newsActions.create({id: restId, newsObj: formData}));
        if (!error && _id) {
            setStateCreate(false);
            navigate(`../restaurantsForAdmin/${restId}/newsForAdmin/${_id}`);
        } else setErrorIsVisible(true);
    };

    return (
        <div>
            <ModalUC modalText={errors?.message} show={errorIsVisible} onHide={setErrorIsVisible} type={'danger'}></ModalUC>

            <div className={css.To} onClick={() => setStateCreate(true)}> Створити новину </div>
            {stateCreate &&
                <div className={css.Form}>
                    <Dropdown>
                        <Dropdown.Toggle variant={'outline-secondary'}>{selectedCategory || 'Оберіть категорію новини'}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {categories.map(categ =>
                                <Dropdown.Item key={categ} onClick={() => setSelectedCategory(categ)}>{categ}</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <form onSubmit={handleSubmit(submit)}>
                        <p style={{color: 'royalblue'}}>Поля, позначені *, обов’язкові для заповнення!</p>
                        <label>Заголовок* <textarea rows="2" cols="60" required={true} placeholder={'від 3 до 50 символів'} {...register('title')}></textarea></label>
                        <br/>
                        <label>Зміст/текст* <textarea rows="5" cols="60" required={true} placeholder={'від 100 до 2000 символів'} {...register('content')}></textarea></label>
                        <br/>
                        <label>Зображення* <input type="file" accept="image/png, image/jpeg" {...register('newsImage')}/></label>
                        <br/>
                        <button>Створити</button>
                    </form>
                    <button style={{marginTop:5}} onClick={() => setStateCreate(false)}> Відмінити</button>
                </div>
            }

        </div>
    );
};

export {NewsCreate};
