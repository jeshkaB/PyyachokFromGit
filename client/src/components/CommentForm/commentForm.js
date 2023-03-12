import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {commentActions} from "../../redux";
import './commentForm.css'


const CommentForm = ({setStateForm, comment, stateChangeComment, setStateChangeComment}) => {
        const {register, handleSubmit} = useForm()
        const dispatch = useDispatch();

        const {errors} = useSelector(state => state.comment)
        const {id: idForCreate} = useParams();


        const submit = async (data) => {
            const {bill} = data;
            if (bill === '') data = {...data, bill: 0}

            let res = {}
            if (comment) {
                res = await dispatch(commentActions.updateById({id: comment._id, commentObj: data}))
                if (!res.error) {
                    setStateChangeComment(!stateChangeComment)
                    setStateForm(false)
                }
            } else {
                res = await dispatch(commentActions.create({id: idForCreate, commentObj: data}))
                if (!res.error)
                    setStateForm(false)
            }
        }
        return (
            <div>
                <div>
                    {errors !== null &&
                        <h2> {errors.message} </h2>}

                    <form onSubmit={handleSubmit(submit)}>
                        {comment ? <input type='text' defaultValue={comment.comment} {...register('comment')}/>
                            :
                            <input type='text' placeholder={'ваш відгук'} {...register('comment')}/>}
                        <br/>
                        {comment ? <input type='number' defaultValue={comment.bill} {...register('bill')}/>
                            :
                            <input type='number' placeholder={'сума чеку'} {...register('bill')}/>}
                        <button>Відправити</button>
                    </form>


                </div>
            </div>
        );
    }
export {CommentForm};
