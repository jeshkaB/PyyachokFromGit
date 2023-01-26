import {useLocation, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {commentActions} from "../../redux";
import {Comment} from "../Comment/comment";
import {CommentForm} from "../CommentForm/commentForm";

const CommentsInRest = () => {

    const {id} = useParams();// айдішка ресторану
    const {comments} = useSelector(state => state.comment);
    const location = useLocation();

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(commentActions.getAll())
    }, [dispatch])

    const commentsInRest = comments.filter(item => item.restaurant === id)
    const commentsFirst5 = comments.filter(item => item.restaurant === id).slice(0,5);//в API посортовані по даті створення


    // const marksOfRestValue = [];
    // marksOfRest.forEach(marksOfRestItem => {
    //     marks.forEach(marksItem => {
    //         if (marksItem._id === marksOfRestItem) {
    //             marksOfRestValue.push(marksItem.mark);
    //         }
    //     });
    // });


    switch (location.pathname) {
        case `/restaurants/${id}`:
            return (
                <div>
                    <div style={{border: 'solid', width: '50%'}}>
                        {commentsFirst5.map(comment => <Comment key={comment._id} comment={comment}/>)}
                    </div>
                    <CommentForm/>
                </div>
            );
            break

        case `/restaurants/${id}/comments`:
            return (
                <div>
                    <div style={{border: 'solid', width: '50%'}}>
                        {commentsInRest.map(comment => <Comment key={comment._id} comment={comment}/>)}
                    </div>
                </div>
            );
            break
    }
};

export {CommentsInRest}
