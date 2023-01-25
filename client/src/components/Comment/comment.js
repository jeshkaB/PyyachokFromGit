import {useSelector} from "react-redux";

const Comment = ({comment}) => {

const data = comment.createdAt.slice(0, 10)

    return (
        <div style={{margin: 20}}>
            <div>
                <h3> {comment.comment} </h3>
                <div style ={{display: 'flex', flexDirection:'row', justifyContent:'space-between'}}>
                    <div>{comment.user.name}</div>
                    <div>{data}</div>
                    {/*формат дати в БД "2023-01-22T18:52:44.368Z"*/}</div>
            </div>
        </div>
    );
};

export {Comment}
