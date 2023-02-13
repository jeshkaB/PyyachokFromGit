import API_URL from "../../config";
import {useLocation, useNavigate} from 'react-router-dom'
import './newsCardStyle.css'


const NewsCard = ({news}) => {
    const {_id, title, content, newsImage, category, restaurant} = news;
    const navigate = useNavigate();
    const location = useLocation();

    switch (location.pathname) {
        case '/home':
            return (
                <div className={'NewsCard'} onClick={() => navigate(`../news/${_id}`)}>
                    <h2>{title}</h2>
                    <h3> від {restaurant.name}</h3>
                    <div>{category}</div>
                    {newsImage && <img width={150} src={API_URL + newsImage} alt={'зображення у новині'}/>}
                </div>);
            break

        case '/news':
            return (
                <div className={'NewsCard'} onClick={() => navigate(`${_id}`)}>
                    <h2>{title}</h2>
                    <h3> від {restaurant.name}</h3>
                    <div>{category}</div>
                    <div>{content}</div>
                    {newsImage && <img width={250} src={API_URL + newsImage} alt={'зображення у новині'}/>}
                </div>);
            break
        case `/restaurants/${restaurant._id}`:
            return (
                <div className={'NewsCard'} onClick={() => navigate(`../news/${_id}` )}>
                    <h2>{title}</h2>
                    <div>{category}</div>
                    <div>{content}</div>
                    {newsImage && <img width={150} src={API_URL + newsImage} alt={'зображення у новині'}/>}
                </div>);
            break
        case `/restaurantsForAdmin/${restaurant._id}`:
            return (
                <div className={'NewsCard'} onClick={() => navigate(`../restaurantsForAdmin/${restaurant._id}/newsForAdmin/${_id}`)}>
                    <h2>{title}</h2>
                    <div>{category}</div>
                    <div>{content}</div>
                    {newsImage && <img width={150} src={API_URL + newsImage} alt={'зображення у новині'}/>}
                </div>);
            break
    }
}


export {NewsCard};
