import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {newsActions, restaurantActions} from "../../redux";
import {useNavigate} from "react-router-dom";
import {Dropdown} from "react-bootstrap";
import {categoriesOfNews} from "../../constants";



const NewsCreate = ({restId}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {errors} = useSelector(state => state.news)
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

        const {_id} = await dispatch(newsActions.create({id: restId, newsObj: formData}))
        setStateCreate(false)
        // if (!errors) navigate(`/news/${_id}`)
    }

    return (
        <div>
            <h3 style={{cursor: "pointer"}} onClick={() => setStateCreate(true)}> Створити новину </h3>
            {stateCreate &&
                <div style={{border: 'solid'}}>
                    <Dropdown>
                        <Dropdown.Toggle>{selectedCategory || "Оберіть категорію новини"}</Dropdown.Toggle>
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

export {NewsCreate}
