import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {commentActions} from "../../redux";
import './commentForm.css'
import {useState} from "react";


const CommentForm = ({setStateForm}) => {
        const {register, handleSubmit} = useForm()
        const dispatch = useDispatch();

        const {errors} = useSelector(state => state.comment)
        const {id} = useParams();


        const submit = async (data) => {
            const {error} = await dispatch(commentActions.create({id, commentObj: data}))
            if (!error) setStateForm(false)
            // reset()
        }
        return (
            <div>
                <div>
                    {errors !== null &&
                        <h2> {errors.message} </h2>}

                    <form onSubmit={handleSubmit(submit)}>
                        <input type='text' placeholder={'ваш відгук'} {...register('comment')}/>
                        <br/>
                        <input type='number' placeholder={'сума чеку'} {...register('bill')}/>
                        <button>Відправити</button>
                    </form>


                </div>
            </div>
        );
    }
;

export {CommentForm};
