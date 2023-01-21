import API_URL from "../../config";

import './newsCardStyle.css'
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {restaurantActions} from "../../redux";


const NewsCard = ({news}) => {
    const {title, content, newsImage, category} = news;


    const {restaurants} = useSelector(state => state.restaurant)
    const restId = news.restaurant;

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(restaurantActions.getAll())
    }, [])

    const rest = restaurants.find(item => item._id === restId)
    console.log(restaurants)
    console.log(rest)
    return (
        <div className={'NewsCard'}>
            <h2>{title}</h2>
            <h3> від {rest.name}</h3>
            <div>{category}</div>
            {/*<div>{content}</div>*/}
            <img width={150} height={150} src={API_URL + newsImage} alt={'зображення у новині'}/>
        </div>
    );
};

export {NewsCard};
