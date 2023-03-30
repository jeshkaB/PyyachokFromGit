import {useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {CommentForm} from "../CommentForm/commentForm";
import {roles} from "../../constants";
import {commentActions} from "../../redux";

const Comment = ({comment, restaurants, stateChangeComment, setStateChangeComment}) => {

    const location = useLocation();
    const [stateForm, setStateForm] = useState(false);
    const {role} = useSelector(state => state.auth);
    const {comment:body, bill, user:{name}} = comment;
    const date = comment.createdAt.slice(0, 10)

    let restaurant = {}
    if (restaurants) restaurant = restaurants.find(rest => rest._id === comment.restaurant)

    if (location.pathname === '/myAccount') {
        return (
            <div style={{margin: 20}}>
                <div>
                    <h4> {restaurant.name} </h4>
                    {!!bill && bill!==0 &&
                        <h5> чек {bill} грн. </h5>}
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'left'}}>
                        <div>{body}</div>
                        <div style={{marginLeft: 20}}>{date}</div>
                        {/*формат дати в БД "2023-01-22T18:52:44.368Z"*/}</div>
                </div>
            </div>
        )

    } else {
        return (
            <div style={{margin: 20}}>
                <div>
                    <h5> {body} </h5>
                    {!!bill && bill !==0 &&
                        <p> чек {bill} грн. </p>}
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <div>{name}</div>
                        <div>{date}</div>

                    </div>
                </div>
                <hr/>
                {role && role.includes(roles.SUPER_ADMIN) &&
                    <div>
                        <button onClick={()=>setStateForm(true)}> Редагувати </button>
                        {stateForm &&
                            <div>
                                <CommentForm setStateForm={setStateForm} comment={comment} stateChangeComment={stateChangeComment} setStateChangeComment={setStateChangeComment}/>
                                <button onClick={()=>setStateForm(false)}> Відмінити </button>
                            </div>}
                    </div>}
            </div>
        );
    }
};
export {Comment}
