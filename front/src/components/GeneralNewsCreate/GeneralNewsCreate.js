import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {useForm} from 'react-hook-form';
import {useState} from 'react';

import {generalNewsActions} from '../../redux';
import {categoriesOfNews} from '../../constants';
import {Dropdown} from 'react-bootstrap';

import css from '../NewsCreate/NewsCreate.module.css';
import {ModalUC} from '../ModalUC/ModalUC';

const GeneralNewsCreate = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {errors} = useSelector(state => state.generalNews);
    const {register, handleSubmit} = useForm();

    const [stateCreate, setStateCreate] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [errorIsVisible, setErrorIsVisible] = useState(false);
    const [modalIsVisible, setModalIsVisible] = useState(false);
    const categories = categoriesOfNews.categories;
    const submit = async (data) => {
        if (!selectedCategory) return setModalIsVisible(true);
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('content', data.content);
        if (data.newsImage[0]) formData.append('newsImage', data.newsImage[0]);
        formData.append('category', selectedCategory);
        const {error,payload} = await dispatch(generalNewsActions.create({newsObj: formData}));
        if (!error && payload._id) {
            // setStateCreate(false);
            navigate(`../generalNews/${payload._id}`);
        } else setErrorIsVisible(true);
    };

    return (
        <div>
            <ModalUC modalText={errors?.message} show={errorIsVisible} onHide={setErrorIsVisible} type={'danger'}></ModalUC>
            <ModalUC modalText={'Оберіть категорію'} show={modalIsVisible} onHide={setModalIsVisible} type={'danger'}></ModalUC>
            <div className={css.To} onClick={() => setStateCreate(true)}> Створити новину </div>
            {stateCreate &&
                <div className={css.Form}>
                    <Dropdown>
                        <Dropdown.Toggle variant={'outline-secondary'} >{selectedCategory || 'Оберіть категорію новини'}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {categories.map(categ =>
                                <Dropdown.Item key={categ} onClick={() => setSelectedCategory(categ)}>{categ}</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <form onSubmit={handleSubmit(submit)}>
                        <p style={{color: 'royalblue'}}>Поля, позначені *, обов’язкові для заповнення!</p>
                        <label>Заголовок* <textarea rows="2" cols="60" required={true} {...register('title')}></textarea></label>
                        <br/>
                        <label>Зміст/текст* <textarea rows="5" cols="60" required={true} {...register('content')}></textarea></label>
                        <br/>
                        <label>Зображення <input type="file" accept="image/png, image/jpeg" {...register('newsImage')}/></label>
                        <br/>
                        <button>Створити</button>
                    </form>
                    <button style={{marginTop:5}} onClick={() => setStateCreate(false)}> Відмінити</button>
                </div>
            }

        </div>
    );
};

export {GeneralNewsCreate};
