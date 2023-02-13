import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {newsActions, restaurantActions} from "../../redux";
import {useNavigate} from "react-router-dom";
import {Dropdown} from "react-bootstrap";
import {categoriesOfNews} from "../../constants";



const NewsUpdate = ({news}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {errors} = useSelector(state => state.news)
    const {register, handleSubmit} = useForm()
    const {_id, title, content, category} = news

    const [stateUpdate, setStateUpdate] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState('')

    const categories = categoriesOfNews.categories
    const submit = async (data) => {
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('content', data.content);
        if (data.newsImage[0]) formData.append('newsImage', data.newsImage[0]);
        formData.append('category', selectedCategory || category);

        await dispatch(newsActions.updateById({id: _id, newsObj: formData}))
        setStateUpdate(false)
        // if (!errors) navigate(`/news/${_id}`)
    }

    return (
        <div>
            <h3 style={{cursor: "pointer"}} onClick={() => setStateUpdate(true)}> Редагувати новину </h3>
            {stateUpdate &&
                <div style={{border: 'solid'}}>
                    <Dropdown>
                        <Dropdown.Toggle>{selectedCategory || category}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {categories.map(categ =>
                                <Dropdown.Item key={categ} onClick={() => setSelectedCategory(categ)}>{categ}</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <form onSubmit={handleSubmit(submit)}>
                        <p style={{color: "orange"}}>Поля, позначені *, обов’язкові для заповнення!</p>
                        <label>Заголовок* <input  required={true} defaultValue={title} {...register('title')}/></label>
                        <br/>
                        <label>Зміст* <input required={true} defaultValue={content} {...register('content')}/></label>
                        <br/>
                        <label>Зображення* <input type="file" accept="image/png, image/jpeg" {...register('newsImage')}/></label>
                        <br/>
                        <button>Оновити</button>
                    </form>
                    <button onClick={() => setStateUpdate(false)}> Відмінити</button>
                </div>
            }

        </div>
    );
}

export {NewsUpdate}
