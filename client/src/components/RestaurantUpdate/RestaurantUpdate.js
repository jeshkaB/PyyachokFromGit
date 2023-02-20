import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {restaurantActions} from "../../redux";
import {useNavigate} from "react-router-dom";



const RestaurantUpdate= ({restaurant}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {errors} = useSelector(state => state.restaurant)
    const {register, handleSubmit} = useForm()

    const {userId} = useSelector(state => state.auth)
    const [stateUpdate, setStateUpdate] = useState(false)
    const {_id,name,place,hours,phone,averageBill,email,webSite,tags} = restaurant

    const submit = async (data) => {
        const formData = new FormData();
        formData.append('name', data.name);
        data.mainImage[0] && formData.append('mainImage', data.mainImage[0]);
        formData.append('place', data.place);
        formData.append('hours', data.hours);
        formData.append('phone', data.phone);
        formData.append('averageBill', data.averageBill);
        formData.append('email', data.email);
        data.webSite && formData.append('webSite', data.webSite);
        data.tags && formData.append('tags', data.tags);
        // formData.append('categories', data.categories);
        await dispatch(restaurantActions.updateById({id:_id, restObj: formData}))
        setStateUpdate(false)
        if (!errors) alert('Дані успішно оновлено')
    }

    return (
        <div>
            <h3 style={{cursor:'pointer'}} onClick={()=>setStateUpdate(true)}> Оновити дані закладу</h3>
            {stateUpdate &&
                <div style={{border: 'solid'}}>
                    <form onSubmit={handleSubmit(submit)}>
                        <p style={{color: "orange"}}>Поля, позначені *, обов’язкові для заповнення!</p>
                        <label>Назва* <input required={true} defaultValue={name} {...register('name')}/></label>
                        <br/>
                        <label>Зображення* <input type="file" accept="image/png, image/jpeg" {...register('mainImage')}/></label>
                        <br/>
                        <label>Адреса* <input required={true} defaultValue={place}  {...register('place')}/></label>
                        <br/>
                        <label>Режим роботи* <input  required={true} defaultValue={hours} {...register('hours')}/></label>
                        <br/>
                        <label>Середній чек* <input type="number" required={true} defaultValue={averageBill}  {...register('averageBill')}/></label>
                        <br/>
                        <label>Телефон* <input required={true} defaultValue={phone} {...register('phone')}/></label>
                        <br/>
                        <label>Email* <input  required={true} defaultValue={email}  {...register('email')}/></label>
                        <br/>
                        <label>Сайт <input defaultValue={webSite} {...register('webSite')}/></label>
                        <br/>
                        <label>Теги <input defaultValue={tags} {...register('tags')}/></label>
                        <br/>
                        <button>Оновити</button>
                    </form>
                    <button onClick={() => setStateUpdate(false)}> Відмінити</button>
                </div>
            }

        </div>
    );
}

export {RestaurantUpdate}
