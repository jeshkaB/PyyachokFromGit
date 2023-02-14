import {CommentsInRest, MarksInRest, NewsList, Restaurant} from "../components";
import {Link, useParams} from "react-router-dom";
import './RestaurantPageStyle.css'
import {useSelector} from "react-redux";


const RestaurantPage = (props) => {
    const {id} = useParams()
    const {errors} = useSelector(state => state.restaurant)

    return (
        <div className={'HolePage'}>
            {errors &&
                <h3 className={'errors'}> {errors.message} </h3>}
            <div className={'RestBlock'}>
                <Link to={'/restaurants'}> Перейти до списку закладів </Link>
                <div className={'Rest'}><Restaurant/></div>
                <div className={'Comments'}>
                    <Link to={'comments'}><h3>Всі відгуки</h3></Link>
                    <CommentsInRest/>
                </div>
                <div className={'Marks'}>
                    <Link to={'marks'}><h3>Оцінки</h3></Link>
                    <MarksInRest/>
                </div>

            </div>
            <div>

                <div className={'News'}><NewsList restId={id}/></div>

            </div>


        </div>
    );
}

export {RestaurantPage};
