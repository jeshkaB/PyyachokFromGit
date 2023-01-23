import API_URL from "../../config";
import {useLocation, useNavigate} from 'react-router-dom'
import './newsCardStyle.css'
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {restaurantActions} from "../../redux";



const NewsCard = ({news}) => {
    const {_id, title, content, newsImage, category} = news;


    const {restaurants} = useSelector(state => state.restaurant)
    const restId = news.restaurant;
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(restaurantActions.getAll())
    }, [restaurants])

    const rest = restaurants.find(item => item._id === restId)

    if (location.pathname === '/home')
        return (
            <div className={'NewsCard'} onClick={() => navigate(`../news/${_id}`)}>
                <h2>{title}</h2>
                <h3> від {rest.name}</h3>
                <div>{category}</div>
                <img width={150} height={150} src={API_URL + newsImage} alt={'зображення у новині'}/>
            </div>)

    else if (location.pathname === '/news')
        return (
            <div className={'NewsCard1'} onClick={() => navigate(`${_id}`)}>
                <h2>{title}</h2>
                {/*<h3> від {rest.name}</h3>*/}
                <div>{category}</div>
                <div>{content}</div>
                <img width={250} height={250} src={API_URL + newsImage} alt={'зображення у новині'}/>
            </div>
        );
};

export {NewsCard};
