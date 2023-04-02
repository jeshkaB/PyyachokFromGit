import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {useState} from "react";

import {commentActions} from "../../redux";
import {ModalUC} from "../ModalUC/ModalUC";


const CommentForm = ({setStateForm, comment}) => {
    const {register, handleSubmit} = useForm()
    const dispatch = useDispatch();
    const {id: idForCreate} = useParams();
    const {errors} = useSelector(state => state.comment)
    const [errorIsVisible, setErrorIsVisible] = useState(false)


    const submit = async (data) => {
        const {bill} = data;
        if (bill === '') data = {...data, bill: 0}

        let res = {}
        if (comment) {
            res = await dispatch(commentActions.updateById({id: comment._id, commentObj: data}))
            if (!res.error) {
                setStateForm(false)
            } else setErrorIsVisible(true)
        } else {
            res = await dispatch(commentActions.create({id: idForCreate, commentObj: data}))
            if (!res.error)
                setStateForm(false)
            else setErrorIsVisible(true)
        }
    }
    return (
        <div>
            <ModalUC modalText={errors?.message} show={errorIsVisible} onHide={setErrorIsVisible}
                     type={'danger'}></ModalUC>

            <div>
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
