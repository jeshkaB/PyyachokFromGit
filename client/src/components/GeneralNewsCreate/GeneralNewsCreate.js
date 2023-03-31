import {useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {useState} from "react";

import {generalNewsActions} from "../../redux";
import {categoriesOfNews} from "../../constants";
import {Dropdown} from "react-bootstrap";

import css from '../NewsCreate/NewsCreate.module.css'

const GeneralNewsCreate = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {errors} = useSelector(state => state.generalNews)
    const {register, handleSubmit} = useForm()

    const [stateCreate, setStateCreate] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState('')

    const categories = categoriesOfNews.categories
    const submit = async (data) => {
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('content', data.content);
        if (data.newsImage[0]) formData.append('newsImage', data.newsImage[0]);
        formData.append('category', selectedCategory);

        const {payload} = await dispatch(generalNewsActions.create({newsObj: formData}))

        setStateCreate(false)
        if (!errors ?? payload._id) navigate(`../generalNews/${payload._id}`)
    }
    return (
        <div>
            <div className={css.To} onClick={() => setStateCreate(true)}> Створити новину </div>
            {stateCreate &&
                <div className={css.Form}>
                    <Dropdown>
                        <Dropdown.Toggle variant={'outline-secondary'} >{selectedCategory || "Оберіть категорію новини"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {categories.map(categ =>
                                <Dropdown.Item key={categ} onClick={() => setSelectedCategory(categ)}>{categ}</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <form onSubmit={handleSubmit(submit)}>
                        <p style={{color: "royalblue"}}>Поля, позначені *, обов’язкові для заповнення!</p>
                        <label>Заголовок* <textarea rows="2" cols="60" required={true} {...register('title')}></textarea></label>
                        <br/>
                        <label>Зміст/текст* <textarea rows="5" cols="60" required={true} {...register('content')}></textarea></label>
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
}

export {GeneralNewsCreate};
