import {useState} from "react";
import {RestaurantsListForTop, TopCategoriesList} from "../components";
import {useForm} from "react-hook-form";
import {topCategoryActions} from "../redux";
import {useDispatch} from "react-redux";

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
        <div>
            <div>
                <TopCategoriesList/>
                <h3 style={{cursor: "pointer"}} onClick={() => setStateForm(true)}> Створити Топ-категорію </h3>
                {stateForm &&
                    <div>
                        <form onSubmit={handleSubmit(submit)}>
                            Введіть назву топ-категорії <input {...register('title')}/>
                            <button>Створити</button>
                        </form>
                    </div>}
            </div>
            <div>
                <h3 style={{cursor: "pointer"}} onClick={() => setStateRestList(true)}> Відкрити список закладів </h3>
                <h3 style={{cursor: "pointer"}} onClick={() => setStateRestList(false)}> Згорнути список закладів </h3>
                {stateRestList &&
                    <RestaurantsListForTop/>}
            </div>
        </div>
    );
}

export {TopPageForAdmin};
