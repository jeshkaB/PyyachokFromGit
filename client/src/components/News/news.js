import API_URL from "../../config";
import {useParams} from 'react-router-dom'
import './newsStyle.css'
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {newsActions} from "../../redux";


const News = () => {
    const {newsOne} = useSelector(state => state.news)
    const {id} = useParams()

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(newsActions.getById(id))
}, [id])


    const {title, content, newsImage, category} = newsOne;


        return (
            <div className={'News'} >
                <h2>{title}</h2>
                {/*<h3> від {rest.name}</h3>*/}
                <div>{category}</div>
                <div>{content}</div>
                <img width={300} src={API_URL + newsImage} alt={'зображення у новині'}/>
            </div>
        );
};

export {News};
