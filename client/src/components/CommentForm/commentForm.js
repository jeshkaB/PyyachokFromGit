import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {commentActions} from "../../redux";
import './commentForm.css'
//TODO недороблено
const CommentForm = () => {
        const {register, handleSubmit} = useForm()
        const dispatch = useDispatch();
        const navigate = useNavigate();

        const visible = 'noVisible'

        const submit = async (data) => {
            const {error} = await dispatch(commentActions.create({commentObj: data}))
            if (!error) {
                const visible = 'visible'
            }
        }
        const goBack = () => navigate(-1)

        return (
            <div>
                <form onSubmit={handleSubmit(submit)}>
                    <input type='text' placeholder={'ваш відгук'} {...register('comment')}/>
                    <button>Відправити</button>
                </form>
                <div className={`${visible}`}>
                    <h2> Дякуємо за ваш відгук!</h2>
                    {/*<button onClick={goBack()}> Перейти на попередню сторінку</button>*/}
                </div>
            </div>
        );
    }
;

export {CommentForm};
