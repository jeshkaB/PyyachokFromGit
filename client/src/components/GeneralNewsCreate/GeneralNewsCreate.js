import {useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import {generalNewsActions} from "../../redux";
import {useForm} from "react-hook-form";
import {categoriesOfNews} from "../../constants";
import {Dropdown} from "react-bootstrap";
import {useState} from "react";

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
            <h3 style={{cursor: "pointer"}} onClick={() => setStateCreate(true)}> Створити загальну новину </h3>
            {stateCreate &&
                <div style={{border: 'solid'}}>
                    <Dropdown>
                        <Dropdown.Toggle >{selectedCategory || "Оберіть категорію новини"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {categories.map(categ =>
                                <Dropdown.Item key={categ} onClick={() => setSelectedCategory(categ)}>{categ}</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <form onSubmit={handleSubmit(submit)}>
                        <p style={{color: "orange"}}>Поля, позначені *, обов’язкові для заповнення!</p>
                        <label>Заголовок* <input  required={true} {...register('title')}/></label>
                        <br/>
                        <label>Зміст* <input required={true} {...register('content')}/></label>
                        <br/>
                        <label>Зображення* <input type="file" accept="image/png, image/jpeg" {...register('newsImage')}/></label>
                        <br/>
                        <button>Створити</button>
                    </form>
                    <button onClick={() => setStateCreate(false)}> Відмінити</button>
                </div>
            }

        </div>
    );
}

export {GeneralNewsCreate};
