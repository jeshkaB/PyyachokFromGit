/* eslint-disable react-hooks/exhaustive-deps */
import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';

import {topCategoryActions} from '../../redux';

import css from './TopCategoriesList.module.css';

const TopCategoriesList = () => {
    const dispatch = useDispatch();
    const {register, handleSubmit} = useForm();
    const [stateUpdate, setStateUpdate] = useState(false);
    const [currentCategory, setCurrentCategory] = useState({});
    const {topCategories} = useSelector(state => state.topCategory);

    useEffect(()=> {
        dispatch(topCategoryActions.getAll());
    }, []);
    const clickUpdate = (categ)=>{
        setCurrentCategory(categ);
        setStateUpdate(true);
    };
    const submitUpdate = async (data)=> {
        const {error} = await dispatch(topCategoryActions.updateById({id:currentCategory._id, categObj: data}));
        if (!error) {
            setStateUpdate(false);
        }
    };

    const clickDelete = async (categId)=>{
        await dispatch(topCategoryActions.deleteById(categId));
    };

    return (
        <div>
            <h3>Всі топ-категорії</h3>
            {JSON.stringify(topCategories) === '[]' && <p>Категорій поки що немає</p>}
            {topCategories &&
                <div> {topCategories.map(categ=>
                    <div className={css.Hole} key={categ._id}>
                        <h5 className={css.Title}> {categ.title}</h5>
                        <button className={css.Button} onClick={()=>clickUpdate(categ)}>Редагувати</button>
                        <button className={css.Button} onClick={()=>clickDelete(categ._id)}>Видалити</button>
                        </div>)}
                    {stateUpdate && <div>
                        <form onSubmit={handleSubmit(submitUpdate)}>
                            <input style={{width:500}} defaultValue={currentCategory.title} {...register('title')}/>
                            <button className={css.Button}>  Оновити </button>
                            <button className={css.Button} onClick={()=> setStateUpdate(false)}>Відмінити</button>
                        </form>
                    </div>}
                </div>
            }
        </div>
    );
};

export {TopCategoriesList};
