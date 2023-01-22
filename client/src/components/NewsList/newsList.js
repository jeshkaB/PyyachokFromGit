import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {newsActions} from "../../redux";


import './newsListStyle.css'
import {NewsCard} from "../NewsCard/newsCard";

const NewsList = () => {

    const {newsAll} = useSelector(state => state.news);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(newsActions.getAll())
    }, [])

    return (

        <div className ={'NewsCards'}>{newsAll.map(news => <NewsCard key={news._id} news ={news}/>)}</div>

    );
}



export {NewsList};
