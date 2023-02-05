import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {commentActions} from "../../redux";
import './commentForm.css'
import {authService} from "../../services";
//TODO недороблено
const CommentForm = () => {
        const {register, handleSubmit, reset} = useForm()
        const dispatch = useDispatch();
        const navigate = useNavigate();
        const {errors} = useSelector(state => state.comment)
        const {id} = useParams()

        const submit = async (data) => {
            const {error} = await dispatch(commentActions.create({id, commentObj: data}))
            if (!error) navigate(-1)
            reset()
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
                    {/*<div>*/}
                    {/*    <h2> Дякуємо за ваш відгук!</h2>*/}
                    {/*    /!*<button onClick={goBack()}> Перейти на попередню сторінку</button>*!/*/}
                </div>
            </div>
        );
    }
;

export {CommentForm};
