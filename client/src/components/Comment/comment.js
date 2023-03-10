import {useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import {useState} from "react";
import {CommentForm} from "../CommentForm/commentForm";
import {roles} from "../../constants";

const Comment = ({comment, restaurants}) => {

    const location = useLocation();
    const {role} = useSelector(state => state.auth);
    const [stateForm, setStateForm] = useState(false);
    // let stateIsForAccount = false;
    // if (location.pathname === '/myAccount') stateIsForAccount = true;

    const date = comment.createdAt.slice(0, 10)

    let restaurant = {}
    if (restaurants) restaurant = restaurants.find(rest => rest._id === comment.restaurant)

    if (location.pathname === '/myAccount') {
        return (
            <div style={{margin: 20}}>
                <div>
                    <h4> {restaurant.name} </h4>
                    <h5> чек {comment.bill} грн. </h5>
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'left'}}>
                        <div>{comment.comment}</div>
                        <div style={{marginLeft: 20}}>{date}</div>
                        {/*формат дати в БД "2023-01-22T18:52:44.368Z"*/}</div>
                </div>
            </div>
        )

    } else {
        return (
            <div style={{margin: 20}}>
                <div>
                    <h3> {comment.comment} </h3>
                    <h4> чек {comment.bill} грн. </h4>
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <div>{comment.user.name}</div>
                        <div>{date}</div>
                    </div>
                </div>
                {role.includes(roles.SUPER_ADMIN) &&
                    <div>
                        <button onClick={()=>setStateForm(true)}> Редагувати </button>
                        {stateForm &&
                            <div>
                                <CommentForm setStateForm={setStateForm} comment={comment}/>
                                <button onClick={()=>setStateForm(false)}> Відмінити </button>
                            </div>}
                    </div>}
            </div>
        );
    }
};
export {Comment}
