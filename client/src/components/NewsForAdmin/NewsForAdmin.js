import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {newsActions} from "../../redux";
import API_URL from "../../config";

import {NewsUpdate} from "../NewsUpdate/NewsUpdate";

import css from './NewsForAdmin.module.css'

const NewsForAdmin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {newsId} = useParams();
    const {newsOne} = useSelector(state => state.news);
    const [confirmDelete, setConfirmDelete] = useState(false);

    useEffect(() => {
        dispatch(newsActions.getById(newsId))
    }, [dispatch])

    const {title, content, newsImage, category, createdAt} = newsOne
    const clickDelete = async () => {
        const {error} = await dispatch(newsActions.deleteById(newsId));
        if (!error) navigate(-1)
    }

    return (
        <div>
            <div className={css.Header}>
                <div><h2>{title}</h2></div>
                <div>
                    <NewsUpdate news={newsOne}/>
                </div>
                <div>
                    <div className={css.Del} onClick={() => setConfirmDelete(true)}> Видалити новину</div>
                    {confirmDelete &&
                        <div>
                            <p style={{color: 'red'}}> Ви упевнені що хочете видалити цю новину?</p>
                            <button style={{marginRight:5}} onClick={clickDelete}>Так</button>
                            <button onClick={() => setConfirmDelete(false)}>Ні</button>
                        </div>}
                </div>
            </div>

            <div className={css.News}>
                <div>
                    {newsImage && <img width={300} src={API_URL + newsImage} alt={'зображення у новині'}/>}
                </div>
                <div className={css.Body}>
                    <p style={{marginBottom:0}}>{category},</p>
                    <p> oпубліковано {createdAt?.slice(0,10)}</p>
                    <hr/>
                    <p>{content}</p>
                </div>
            </div>
        </div>
    )
};

export {NewsForAdmin}
