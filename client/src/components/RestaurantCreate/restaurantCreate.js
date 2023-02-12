import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {restaurantActions} from "../../redux";
import {useNavigate} from "react-router-dom";



const RestaurantCreate = ({userId}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {errors} = useSelector(state => state.restaurant)
    const {register, handleSubmit} = useForm()


    const [stateCreate, setStateCreate] = useState(false)

    const submit = async (data) => {

        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('mainImage', data.mainImage[0]);
        formData.append('place', data.place);
        formData.append('hours', data.hours);
        formData.append('phone', data.phone);
        formData.append('averageBill', data.averageBill);
        formData.append('email', data.email);
        formData.append('webSite', data.webSite);
        formData.append('tags', data.tags);
        // formData.append('categories', data.categories);
        const {_id} = await dispatch(restaurantActions.create({restObj: formData}))
        setStateCreate(false)
        if (!errors) alert('Заклад успішно створено, очікує модерацію')
    }

    return (
        <div>
            <h3 style={{cursor: "pointer"}} onClick={() => setStateCreate(true)}> Створити заклад </h3>
            {stateCreate &&
                <div style={{border: 'solid'}}>
                    <form onSubmit={handleSubmit(submit)}>
                        <p style={{color: "orange"}}>Поля, позначені *, обов’язкові для заповнення!</p>
                        <label>Назва* <input  required={true} {...register('name')}/></label>
                        <br/>
                        <label>Зображення* <input type="file" accept="image/png, image/jpeg" required={true} {...register('mainImage')}/></label>
                        <br/>
                        <label>Адреса* <input required={true} {...register('place')}/></label>
                        <br/>
                        <label>Режим роботи* <input  required={true} {...register('hours')}/></label>
                        <br/>
                        <label>Середній чек* <input type="number" required={true} {...register('averageBill')}/></label>
                        <br/>
                        <label>Телефон* <input required={true} {...register('phone')}/></label>
                        <br/>
                        <label>Email* <input  required={true} {...register('email')}/></label>
                        <br/>
                        <label>Сайт <input {...register('webSite')}/></label>
                        <br/>
                        <label>Теги <input {...register('tags')}/></label>
                        <br/>
                        {/*<label>Категорії {...register('categories')}/></label>*/}
                        {/*<br/>*/}
                        <button>Створити</button>
                    </form>
                    <button onClick={() => setStateCreate(false)}> Відмінити</button>
                </div>
            }

        </div>
    );
}

export {RestaurantCreate}
