import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {commentActions} from "../../redux";
import './commentForm.css'
import {useState} from "react";


const CommentForm = () => {
        const {register, handleSubmit, reset} = useForm()
        const dispatch = useDispatch();

        const {errors} = useSelector(state => state.comment)
        const {id} = useParams();
        const [stateSuccess, setStateSuccess]=useState(false)

        const submit = async (data) => {
            const {error} = await dispatch(commentActions.create({id, commentObj: data}))
            if (!error) setStateSuccess(true)
            // reset()
        }
        return (
            <div>
                <div>
                    {errors !== null &&
                        <h2> {errors.message} </h2>}

                    <form onSubmit={handleSubmit(submit)}>
                        <input type='text' placeholder={'ваш відгук'} {...register('comment')}/>
                        <button>Відправити</button>
                    </form>
                    {stateSuccess &&
                        <h2> Дякуємо за ваш відгук!</h2>}

                </div>
            </div>
        );
    }
;

export {CommentForm};
