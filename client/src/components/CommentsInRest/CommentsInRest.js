import {useLocation, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";

import {commentActions} from "../../redux";
import {Comment} from "../Comment/comment";
import {CommentForm} from "../CommentForm/commentForm";
import {ModalUC} from "../ModalUC/ModalUC";

import css from './CommentsInRest.module.css'


const CommentsInRest = () => {
    const location = useLocation();
    const dispatch = useDispatch();

    const {id} = useParams();// айдішка ресторану
    const {comments} = useSelector(state => state.comment);
    const {isAuth} = useSelector(state => state.auth);
    const [stateForm, setStateForm] = useState(false);
    const [modalIsVisible, setModalIsVisible] = useState(false)

    const commentsInRest = comments?.filter(item => item.restaurant === id)
    const commentsFirst5 = commentsInRest?.slice(0, 5) //в API посортовані по даті створення

    const [stateChangeComment, setStateChangeComment] = useState(false);

    useEffect(() => {
        dispatch(commentActions.getAll())
    }, [stateChangeComment])

    const commentClick = () => {
        if (isAuth) setStateForm(true)
        else setModalIsVisible(true)
    }
    let commentsForRender = commentsFirst5
    if (location.pathname === `/restaurants/${id}/comments`)
        commentsForRender = commentsInRest

    return (
        <div>
            <ModalUC modalText={'Увійдіть або зареєструйтеся'} show={modalIsVisible}
                     onHide={setModalIsVisible}></ModalUC>

            {(!comments || JSON.stringify(commentsInRest) === '[]') &&
                <p style={{color: 'darkgray'}}>Відгуків поки що немає</p>}
            <div className={css.CreateCom} onClick={commentClick}>Написати відгук</div>
            {stateForm &&
                <div>
                    <button onClick={() => setStateForm(false)}>Відмінити</button>
                    <CommentForm setStateForm={setStateForm}/>
                </div>}
            <div>
                {commentsForRender.map(comment => <Comment key={comment._id} comment={comment}
                                                        stateChangeComment={stateChangeComment}
                                                        setStateChangeComment={setStateChangeComment}/>)}
            </div>


        </div>
    );

}


export {CommentsInRest}
