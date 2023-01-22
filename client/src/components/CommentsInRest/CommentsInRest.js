import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {commentActions} from "../../redux";




const CommentsInRest = () => {

    const {id} = useParams();// айдішка ресторану
    const {comments} = useSelector(state => state.comment);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(commentActions.getAll())
    }, [])

    const commentsInRest = comments.filter(item => item.restaurant === id)

      // const marksOfRestValue = [];
    // marksOfRest.forEach(marksOfRestItem => {
    //     marks.forEach(marksItem => {
    //         if (marksItem._id === marksOfRestItem) {
    //             marksOfRestValue.push(marksItem.mark);
    //         }
    //     });
    // });
    // "2023-01-22T18:52:44.368Z"
    return (
        <div>
            <div style ={{border: 'solid', width: '50%'}}>

                {commentsInRest.map (item => <div style ={{margin: 20}}>
                    <h3> {item.comment} </h3>
                    <div> {item.createdAt.slice(0,10)}</div> {/*формат дати в БД "2023-01-22T18:52:44.368Z"*/}
                    </div>)}

            </div>

        </div>
    );
};

export {CommentsInRest}
