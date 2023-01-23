import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {newsActions, restaurantActions} from "../../redux";


import './newsListStyle.css'
import {NewsCard} from "../NewsCard/newsCard";

const NewsList = ({restId}) => {

    const {newsAll} = useSelector(state => state.news);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(newsActions.getAll())
    }, [])


if (restId){
    const newsOfRest = newsAll.filter(item => item.restaurant === restId)
    return (
        <div className={'NewsCards'}>{newsOfRest.map(news => <NewsCard key={news._id} news={news}/>)}</div>
    )}
else
    return (
        <div className ={'NewsCards'}>{newsAll.map(news => <NewsCard key={news._id} news ={news}/>)}</div>
    );




}
export {NewsList};
