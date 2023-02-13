
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {newsActions} from "../../redux";
import API_URL from "../../config";
import {NewsUpdate} from "../NewsUpdate/NewsUpdate";

const NewsForAdmin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {newsId} = useParams();
    const {newsOne} = useSelector(state => state.news);
    const [confirmDelete, setConfirmDelete]=useState(false);

    useEffect(() => {
        dispatch(newsActions.getById(newsId))
    }, [dispatch])

    const {title, content, newsImage, category, restaurant} = newsOne
    const clickDelete = async ()=> {
        const {error} = await dispatch(newsActions.deleteById(newsId));
        if (!error) navigate(-1)
    }

    return (
        <div>
            <div className={'News'}>
                <h2>{title}</h2>
                <div>{category}</div>
                <div>{content}</div>
                {newsImage && <img width={300} src={API_URL + newsImage} alt={'зображення у новині'}/>}
            </div>
             <div>
                    <div>
                        <NewsUpdate news={newsOne}/>
                    </div>
                    <div>
                        <h3 style={{cursor: "pointer", fontSize: '20px', color: 'orange'}} onClick={() => setConfirmDelete(true)}> Видалити новину </h3>
                        {confirmDelete &&
                            <div>
                                <p style={{color: 'red'}}> Ви упевнені що хочете видалити цю новину?</p>
                                <button onClick={clickDelete}>Так</button>
                                <button onClick={() => setConfirmDelete(false)}>Ні</button>
                            </div>}
                    </div>
                </div>
        </div>


    );
};

export {NewsForAdmin}
