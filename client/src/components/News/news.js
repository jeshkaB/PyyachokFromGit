import API_URL from "../../config";
import {useParams} from 'react-router-dom'
import './newsStyle.css'
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {newsActions} from "../../redux";

const News = () => {
    const dispatch = useDispatch();
    const {id} = useParams();
    const {newsOne} = useSelector(state => state.news);

    useEffect(() => {
        dispatch(newsActions.getById(id))
    }, [dispatch])

    const {title, content, newsImage, category, restaurant} = newsOne

    return (
        <div>
            <div className={'News'}>
                <h2>{title}</h2>
                {JSON.stringify(newsOne) !== '{}' &&
                    <h3> від {restaurant.name}</h3>}
                <div>{category}</div>
                <div>{content}</div>
                {newsImage && <img width={300} src={API_URL + newsImage} alt={'зображення у новині'}/>}
            </div>
        </div>
    );
};

export {News};
