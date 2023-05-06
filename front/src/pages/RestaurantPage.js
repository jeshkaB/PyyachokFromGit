import {useSelector} from 'react-redux';
import {useState} from 'react';

import {CommentsInRest, MarksInRest, MessageForm, ModalUC, NewsList, Restaurant,} from '../components';
import {Link, useParams} from 'react-router-dom';

import css from './RestaurantPage.module.css';

const RestaurantPage = () => {
    const {id} = useParams();
    const [stateMessageForm, setStateMessageForm] = useState(false);
    const {isAuth, userId} = useSelector(state => state.auth);
    const [modalIsVisible, setModalIsVisible] = useState(false);

    const messageClick = () => {
        if (isAuth) setStateMessageForm(true);
        else
            setModalIsVisible(true);
    };
    return (
        <div className={css.HolePage}>
            <ModalUC modalText={'Увійдіть або зареєструйтеся'} show={modalIsVisible}
                     onHide={setModalIsVisible}></ModalUC>

            <div className={css.RestBlock}>
                <div className={css.ToRest}> <Link className={css.Link} to={'/restaurants'}> До всіх закладів </Link></div>
                <div className={'Rest'}><Restaurant/></div>
                <div className={css.Comments}>
                    <div className={css.ToComments}>
                        <Link className={css.Link} to={'comments'}>Подивитись всі відгуки</Link>
                    </div>
                    <CommentsInRest/>
                </div>
                <div className={css.Comments}>
                    <div className={css.ToComments}>
                        <Link className={css.Link} to={'marks'}>Подивитись всі оцінки</Link>
                    </div>
                    <MarksInRest/>
                </div>
            </div>

            <div className={css.NewsBlock}>
                <div className={css.Message}>
                    <div className={css.ButMes} onClick={messageClick}>Написати менеджеру закладу</div>
                    {stateMessageForm &&
                        <div>
                            <MessageForm restId={id} userId={userId} setStateMessageForm={setStateMessageForm}/>
                            <button onClick={() => setStateMessageForm(false)}>Згорнути</button>
                        </div>}
                </div>
                <h2>Новини</h2>
                <div className={css.News}><NewsList restId={id}/></div>
            </div>

        </div>
    );
};

export {RestaurantPage};
