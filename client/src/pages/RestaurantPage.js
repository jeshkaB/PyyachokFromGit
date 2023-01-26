import {CommentsInRest, NewsList, Restaurant} from "../components";
import {Link, useParams} from "react-router-dom";
import './RestaurantPageStyle.css'


const RestaurantPage = (props) => {
    const {id} = useParams()

    return (
        <div className={'HolePage'}>

            <div className={'RestBlock'}>
                <Link to={'/restaurants'}> Перейти до списку закладів </Link>
                <div className={'Rest'}><Restaurant/></div>
                <div className={'Comments'}>
                    <Link to={'comments'}><h2>Всі відгуки</h2></Link>
                    <CommentsInRest/>
                </div>

            </div>
            <div>

                <div className={'News'}><NewsList restId={id}/></div>

            </div>


        </div>
    );
}

export {RestaurantPage};
