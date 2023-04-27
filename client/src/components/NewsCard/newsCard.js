import {useLocation, useNavigate} from 'react-router-dom';

import API_URL from '../../config';

import css from './newsCardStyle.module.css';

const NewsCard = ({news}) => {
    const {_id, title, content, newsImage, category, restaurant, createdAt} = news;
    const navigate = useNavigate();
    const location = useLocation();

    switch (location.pathname) {
        case '/home':
            return (
                <div className={css.Card} onClick={() => navigate(`../news/${_id}`)}>
                    <h4>{title}</h4>
                    <h4> від {restaurant.name}</h4>
                    <div>{category}, {createdAt.slice(0,10)}</div>
                    {newsImage && <img width={120} src={API_URL + newsImage} alt={'зображення у новині'}/>}
                </div>);
        case '/news':
            return (
                <div className={css.Card} onClick={() => navigate(`${_id}`)}>
                    <h4>{title}</h4>
                    <h4> від {restaurant.name}</h4>
                    <div>{category}, {createdAt.slice(0,10)}</div>
                    <div>{content}</div>
                    {newsImage && <img width={250} src={API_URL + newsImage} alt={'зображення у новині'}/>}
                </div>);
        case `/restaurants/${restaurant._id}`:
            return (
                <div className={css.Card} onClick={() => navigate(`../news/${_id}` )}>
                    <h4>{title}</h4>
                    <div>{category}, {createdAt.slice(0,10)}</div>
                    <div>{content}</div>
                    {newsImage && <img width={200} src={API_URL + newsImage} alt={'зображення у новині'}/>}
                </div>);
        case `/restaurantsForAdmin/${restaurant._id}`:
            return (
                <div className={css.Card} onClick={() => navigate(`../restaurantsForAdmin/${restaurant._id}/newsForAdmin/${_id}`)}>
                    <h4>{title}</h4>
                    <div>{category}, {createdAt.slice(0,10)}</div>
                    <div>{content}</div>
                    {newsImage && <img width={200} src={API_URL + newsImage} alt={'зображення у новині'}/>}
                </div>);
        case '/superAdmin':
            return (
                <div className={css.Card} onClick={() => navigate(`../restaurantsForAdmin/${restaurant._id}/newsForAdmin/${_id}`)}>
                    <h4>{title}</h4>
                    <h4> від {restaurant.name}</h4>
                    <div>{category}, {createdAt.slice(0,10)}</div>
                    <div>{content}</div>
                    {newsImage && <img width={200} src={API_URL + newsImage} alt={'зображення у новині'}/>}
                </div>);
        default:
            break;
    }
};


export {NewsCard};
