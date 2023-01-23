import {useSelector} from "react-redux";

const Comment = ({comment}) => {


    return (
        <div style={{margin: 20}}>
            <div>
                <h3> {comment.comment} </h3>
                <div> {comment.createdAt.slice(0, 10)}</div>{/*формат дати в БД "2023-01-22T18:52:44.368Z"*/}
            </div>
        </div>
    );
};

export {Comment}
