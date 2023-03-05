import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {topCategoryActions} from "../../redux";
import {useForm} from "react-hook-form";

const TopCategoriesList = () => {
    const dispatch = useDispatch();
    const {register, handleSubmit} = useForm()
    const [stateUpdate, setStateUpdate] = useState(false);
    const [currentCategory, setCurrentCategory] = useState({});
    const {topCategories} = useSelector(state => state.topCategory);

    useEffect(()=> {
        dispatch(topCategoryActions.getAll())
    }, []);

    const clickUpdate = (categ)=>{
        setStateUpdate(true);
        setCurrentCategory(categ)
    }
    const submitUpdate = async (data)=> {
        const {error} = await dispatch(topCategoryActions.updateById({id:currentCategory._id, categObj: data}))
        if (!error) {
            setStateUpdate(false)
        }
    }

    const clickDelete = async (categId)=>{
        await dispatch(topCategoryActions.deleteById(categId))
    }

    return (
        <div>
            <h3>Всі топ-категорії</h3>
            {JSON.stringify(topCategories) === '[]' && <p>Категорій поки що немає</p>}
            {topCategories &&
                <div > {topCategories.map(categ=>
                    <div style={{display:'flex', margin:'5px'}} key={categ._id}>
                        <h4>- {categ.title}</h4>
                        <button style={{margin:'5px'}} onClick={()=>clickUpdate(categ)}>Редагувати</button>
                        <button style={{margin:'5px'}} onClick={()=>clickDelete(categ._id)}>Видалити</button>
                        </div>)}
                    {stateUpdate && <div>
                        <form onSubmit={handleSubmit(submitUpdate)}>
                            <input defaultValue={currentCategory.title} {...register('title')}/>
                            <button> Оновити </button>
                        </form>
                    </div>}
                </div>
            }
        </div>
    );
};

export {TopCategoriesList}
