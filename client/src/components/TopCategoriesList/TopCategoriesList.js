import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {topCategoryActions} from "../../redux";
import {Col} from "react-bootstrap";
import {useForm} from "react-hook-form";

const TopCategoriesList = () => {
    const dispatch = useDispatch();
    const {register, handleSubmit} = useForm()
    const [stateUpdate, setStateUpdate] = useState(false);
    const [stateDelete, setStateDelete] = useState(false);
    const [currentCategory, setCurrentCategory] = useState({});
    const {topCategories} = useSelector(state => state.topCategory);
    useEffect(()=> {
        dispatch(topCategoryActions.getAll())
    }, [stateDelete]);

    const clickUpdate = (categ)=>{
        setStateUpdate(true);
        setCurrentCategory(categ)

    }
    const submitUpdate = async (data)=> {
        const {error,payload:{title}={}} = await dispatch(topCategoryActions.updateById({id:currentCategory._id, categObj: data}))
    }

    const clickDelete = async (categId)=>{
        const {error} = await dispatch(topCategoryActions.deleteById(categId))
        if (!error) setStateDelete(true)
    }

    return (
        <div>
            <h3>Всі категорії</h3>
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
