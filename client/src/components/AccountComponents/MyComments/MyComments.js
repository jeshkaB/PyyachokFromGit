import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {commentActions} from "../../../redux";
import {Comment} from "../../Comment/comment";


const MyComments = ({user,restaurants}) => {
    const {_id} = user;
    const {comments} = useSelector(state => state.comment);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(commentActions.getAll())
    }, [dispatch]);

    let myComments = [];
    if (comments) myComments = comments.filter(com => com.user?._id === _id); // в коментарях user - populate
    const [stateComments, setStateComments] = useState(false);


    return (
        <div>
            <h3 style={{cursor: "pointer"}} onClick={() => setStateComments(true)}>Мої коментарі</h3>
            {stateComments &&
                <div>
                    {myComments.map(com => <Comment key={com._id} comment={com} restaurants={restaurants}/>)}
                    <button onClick={() => setStateComments(false)}>Згорнути</button>
                </div>}

        </div>
    );
};

export {MyComments}
