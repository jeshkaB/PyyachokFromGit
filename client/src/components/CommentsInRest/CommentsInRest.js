import {useLocation, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {commentActions} from "../../redux";
import {Comment} from "../Comment/comment";
import {CommentForm} from "../CommentForm/commentForm";


const CommentsInRest = () => {
    const location = useLocation();
    const dispatch = useDispatch();

    const {id} = useParams();// айдішка ресторану
    const {comments} = useSelector(state => state.comment);
    const {isAuth} = useSelector(state => state.auth);
    const [stateForm, setStateForm] = useState(false);

    useEffect(() => {
        dispatch(commentActions.getAll())
    }, [dispatch])

    const commentsInRest = comments.filter(item => item.restaurant === id)
    const commentsFirst5 = commentsInRest.slice(0,5);//в API посортовані по даті створення

    const commentClick = () => {
        if (isAuth) setStateForm(true)
        else alert('Увійдіть або зареєструйтеся')
    }

    switch (location.pathname) {
        case `/restaurants/${id}`:
            return (
                <div>
                    {!commentsFirst5 && <h2>Відгуків поки що немає</h2>}
                    <div style={{border: 'solid', width: '50%'}}>
                        {commentsFirst5.map(comment => <Comment key={comment._id} comment={comment}/>)}
                    </div>
                    <h4 style={{cursor: "pointer"}} onClick={commentClick}>Написати відгук</h4>
                    {stateForm && <CommentForm/>}
                </div>
            );
            break

        case `/restaurants/${id}/comments`:
            return (
                <div>
                    {JSON.stringify(commentsInRest) !== '{}' && <h2>Відгуків поки що немає</h2>}
                    <h4 style={{cursor: "pointer"}} onClick={commentClick}>Написати відгук</h4>
                    {stateForm && <CommentForm/>}
                    <div style={{border: 'solid', width: '50%'}}>
                        {commentsInRest.map(comment => <Comment key={comment._id} comment={comment}/>)}
                    </div>
                </div>
            );
            break
    }
};

export {CommentsInRest}
