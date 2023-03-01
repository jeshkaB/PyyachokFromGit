import {useState} from "react";
import {TopCategoriesList} from "../components";
import {useForm} from "react-hook-form";
import {topCategoryActions} from "../redux";
import {useDispatch} from "react-redux";

const TopPage = () => {
    const dispatch = useDispatch()
    const {register,handleSubmit} = useForm()
    const [stateForm, setStateForm] = useState(false)
    const submit = async (data)=> {
        const {error} = await dispatch(topCategoryActions.create({categObj:data}));
        if (!error) {
            alert('Категорію створено')
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
        </div>
    );
}

export {TopPage};
