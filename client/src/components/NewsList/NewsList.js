import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import {newsActions} from "../../redux";

import {NewsCard} from "../NewsCard/newsCard";

const NewsList = ({restId}) => {
    const {newsAll} = useSelector(state => state.news);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(newsActions.getAll())
    }, [dispatch])

    if (restId) {
        const newsOfRest = newsAll.filter(item => item.restaurant._id === restId)
        return (
            <div>
                {JSON.stringify(newsAll)==='[]' && <h4> Новин поки що немає </h4> }
                <div className={'NewsCards'}>{newsOfRest.map(news => <NewsCard key={news._id} news={news}/>)}</div>
            </div>
        )
    } else
        return (
            <div>
                {JSON.stringify(newsAll)==='{}' && <h4> Новин поки що немає </h4> }
                <div className={'NewsCards'}>{newsAll.map(news => <NewsCard key={news._id} news={news}/>)}</div>
            </div>
        );

}
export {NewsList};
