import {useLocation} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {useState} from 'react';

import {roles} from '../../constants';
import {CommentForm} from '../CommentForm/commentForm';

const Comment = ({comment, restaurants}) => {

    const location = useLocation();
    const [stateForm, setStateForm] = useState(false);
    const {role} = useSelector(state => state.auth);
    const {comment:body, bill, user:{name}} = comment;
    const date = comment.createdAt.slice(0, 10);

    let restaurant = {};
    if (restaurants) restaurant = restaurants.find(rest => rest._id === comment.restaurant);

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
                    </div>
                </div>
            </div>
        );

    } else {
        return (
            <div style={{margin: 20}}>
                <div>
                    <h5> {body} </h5>
                    {!!bill && bill !==0 &&
                        <p> чек {bill} грн. </p>}
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <div>{name}, {date}</div>
                    </div>
                </div>
                <hr/>
                {role && role.includes(roles.SUPER_ADMIN) &&
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
export {Comment};
