import {useState} from "react";
import {useDispatch} from "react-redux";
import {useForm} from "react-hook-form";

import {topCategoryActions} from "../redux";

import {RestaurantsListForTop, TopCategoriesList} from "../components";

import css from './TopPageForAdmin.module.css'

const TopPageForAdmin = () => {
    const dispatch = useDispatch()
    const {register,handleSubmit} = useForm()
    const [stateForm, setStateForm] = useState(false)
    const [stateRestList, setStateRestList] = useState(false)
    const submit = async (data)=> {
        const {error} = await dispatch(topCategoryActions.create({categObj:data}));
        if (!error) {
            setStateForm(false)
        }
    }

    return (
        <div className={css.Hole}>
            <div className={css.Block}>
                <TopCategoriesList/>
                <div className={css.To} onClick={() => setStateForm(true)}> Додати Топ-категорію </div>
                {stateForm &&
                    <div>
                        <form onSubmit={handleSubmit(submit)}>
                            Введіть назву топ-категорії <input style={{width:500}} {...register('title')}/>
                            <button>Створити</button>
                            <button style={{marginLeft:5}} onClick={()=> setStateForm(false)}>Відмінити</button>
                        </form>
                    </div>}
            </div>
            <div className={css.To} onClick={() => setStateRestList(true)}> Заклади в ТОП </div>
            {stateRestList &&
                <div>
                    <button style={{marginBottom:10}} onClick={() => setStateRestList(false)}> Згорнути список закладів </button>
                    <div className={css.Block}>
                        <RestaurantsListForTop/>
                    </div>
            </div>}
        </div>
    );
}

export {TopPageForAdmin};
