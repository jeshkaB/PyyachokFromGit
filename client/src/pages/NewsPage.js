import {News} from "../components";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";


const NewsPage = (props) => {
const {errors} = useSelector(state => state.news)

    return (
        <div>
            {errors &&
                <h3 className={'errors'}> {errors.message} </h3>}
            <Link to={'/news'}> Перейти до списку новин </Link>
            <div><News/></div>
        </div>
    );
}

export {NewsPage}
