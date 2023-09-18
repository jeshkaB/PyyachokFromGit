/* eslint-disable react-hooks/exhaustive-deps */
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';

import API_URL from '../../config';
import {newsActions} from '../../redux';

import css from './News.module.css';

const News = () => {
    const dispatch = useDispatch();
    const {id} = useParams();
    const {newsOne} = useSelector(state => state.news);

    useEffect(() => {
        dispatch(newsActions.getById(id));
    }, [dispatch]);

    const {title, content, newsImage, category, restaurant, createdAt} = newsOne;

    return ( <div>
        <h2 style={{textAlign: 'center'}}>{title}</h2>
            <div className={css.News}>
        <div>
            {JSON.stringify(newsOne) !== '{}' &&
                <h3> від {restaurant.name}</h3>}
            {newsImage && <img width={300} src={API_URL + newsImage} alt={'зображення у новині'}/>}
        </div>
        <div className={css.Body}>
            <div>{category},</div>
            <div>опубліковано {createdAt?.slice(0,10)}</div>
            <hr/>
            <div>{content}</div>
        </div>
    </div>
    </div>

    );
};

export {News};
