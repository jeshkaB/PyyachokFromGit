import API_URL from "../../config";
import {useLocation, useNavigate} from 'react-router-dom'
import './newsCardStyle.css'
import {Card, CardGroup, CardImg} from "react-bootstrap";
import CardHeader from "react-bootstrap/CardHeader";
import {StarsRating} from "../StarsRating/starsRating";


const NewsCard = ({news}) => {
    const {_id, title, content, newsImage, category, restaurant, createdAt} = news;
    const navigate = useNavigate();
    const location = useLocation();

    switch (location.pathname) {
        case '/home':
            return (
                <div className={'NewsCard'} onClick={() => navigate(`../news/${_id}`)}>
                    <h4>{title}</h4>
                    <h4> від {restaurant.name}</h4>
                    <div>{category}, {createdAt.slice(0,10)}</div>
                    {newsImage && <img width={120} src={API_URL + newsImage} alt={'зображення у новині'}/>}
                </div>);
            break

        case '/news':
            return (
                <div className={'NewsCard'} onClick={() => navigate(`${_id}`)}>
                    <h4>{title}</h4>
                    <h4> від {restaurant.name}</h4>
                    <div>{category}, {createdAt.slice(0,10)}</div>
                    <div>{content}</div>
                    {newsImage && <img width={250} src={API_URL + newsImage} alt={'зображення у новині'}/>}
                </div>);
            break
        case `/restaurants/${restaurant._id}`:
            return (
                // <div className={'NewsCard'} onClick={() => navigate(`../news/${_id}` )}>
                //     <h4>{title}</h4>
                //     <div>{category}, {createdAt.slice(0,10)}</div>
                //     <div>{content}</div>
                //     {newsImage && <img width={120} src={API_URL + newsImage} alt={'зображення у новині'}/>}
                // </div>);

            <Card onClick={() => navigate(`../news/${_id}`)}>
                {newsImage && <CardImg width={120} src={API_URL + newsImage} alt={'зображення у новині'}/>}
                <CardHeader>{title}</CardHeader>
                <CardGroup>{content} </CardGroup>
                <CardGroup>{category}, {createdAt.slice(0,10)} </CardGroup>

            </Card>)

            break
        case `/restaurantsForAdmin/${restaurant._id}`:
            return (
                <div className={'NewsCard'} onClick={() => navigate(`../restaurantsForAdmin/${restaurant._id}/newsForAdmin/${_id}`)}>
                    <h4>{title}</h4>
                    <div>{category}, {createdAt.slice(0,10)}</div>
                    <div>{content}</div>
                    {newsImage && <img width={120} src={API_URL + newsImage} alt={'зображення у новині'}/>}
                </div>);
            break
        case '/superAdmin':
            return (
                <div className={'NewsCard'} onClick={() => navigate(`../restaurantsForAdmin/${restaurant._id}/newsForAdmin/${_id}`)}>
                    <h4>{title}</h4>
                    <h4> від {restaurant.name}</h4>
                    <div>{category}, {createdAt.slice(0,10)}</div>
                    <div>{content}</div>
                    {newsImage && <img width={120} src={API_URL + newsImage} alt={'зображення у новині'}/>}
                </div>);
            break
    }
}


export {NewsCard};
