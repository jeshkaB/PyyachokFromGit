import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {generalNewsActions} from "../../redux";
import {GeneralNewsCard} from "../GeneralNewsCard/GeneralNewsCard";

const GeneralNewsList = () => {
    const dispatch = useDispatch();
    const {newsAll} = useSelector(state => state.generalNews);

    useEffect(() => {
        dispatch(generalNewsActions.getAll())
    }, [dispatch])

    return (<div>
                {JSON.stringify(newsAll)==='[]' && <h4> Новин поки що немає </h4> }
                <div style={{display: 'flex'}}>{newsAll.map(news => <GeneralNewsCard key={news._id} news={news}/>)}</div>
            </div>
        );

}
export {GeneralNewsList};
