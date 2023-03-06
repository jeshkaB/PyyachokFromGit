import {CommentsInRest, MarksInRest, MessageForm, NewsList, Restaurant,} from "../components";
import {Link, useParams} from "react-router-dom";
import './RestaurantPageStyle.css'
import {useSelector} from "react-redux";
import {useState} from "react";


const RestaurantPage = (props) => {
    const {id} = useParams()
    const {errors} = useSelector(state => state.restaurant)
    const [stateMessageForm, setStateMessageForm] = useState(false)
    const {isAuth, userId} = useSelector(state => state.auth)

    const messageClick = ()=> {
        if (isAuth) setStateMessageForm(true)
        else alert('Увійдіть або зареєструйтеся')
    }
    return (
        <div className={'HolePage'}>
            {errors &&
                <h3 className={'errors'}> {errors.message} </h3>}
            <div className={'RestBlock'}>
                <Link to={'/restaurants'}> Перейти до списку закладів </Link>
                <div className={'Rest'}><Restaurant/></div>
                <div className={'Comments'}>
                    <Link to={'comments'}><h3>Всі відгуки</h3></Link>
                    <CommentsInRest/>
                </div>
                <div className={'Marks'}>
                    <Link to={'marks'}><h3>Оцінки</h3></Link>
                    <MarksInRest/>
                </div>
                    <div className={'Message'}>
                    <h3 style={{cursor: 'pointer'}} onClick={messageClick}>Написати менеджеру закладу</h3>
                    {stateMessageForm &&
                        <div>
                            <MessageForm restId={id} userId={userId} setStateMessageForm={setStateMessageForm}/>
                            <button onClick={() => setStateMessageForm(false)}>Згорнути</button>
                        </div>}
                </div>
            </div>
            <div>

                <div className={'News'}><NewsList restId={id}/></div>

            </div>


        </div>
    );
}

export {RestaurantPage};
