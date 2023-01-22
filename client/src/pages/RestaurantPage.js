import {Restaurant} from "../components";
import {Link, Outlet, useParams} from "react-router-dom";


const RestaurantPage = (props) => {
    const {id} = useParams()

    return (
        <div>
            <Link to={'/restaurants'}> Перейти до списку закладів </Link>
            <div>
                <div><Restaurant/></div>
            </div>
            <div>
                <div> Новини ресторану</div>
                <div>
                    <Link to={'comments'}>Відгуки</Link>
                    <Outlet/> {/*тут будуть коменти*/}
                </div>

            </div>
        </div>
    );
}

export {RestaurantPage};
