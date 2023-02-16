import {GeneralNewsList} from "../components";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";


const GeneralNewsListPage = () => {
const {errors} = useSelector(state => state.news)

    return (
        <div>
            {errors &&
                <h3 className={'errors'}> {errors.message} </h3>}
            <Link to={'/generalNews'}> Перейти до списку загальних новин </Link>
            <div><GeneralNewsList/></div>
        </div>
    );
}

export {GeneralNewsListPage}
