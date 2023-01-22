import {News} from "../components";
import {Link} from "react-router-dom";


const NewsPage = (props) => {
    return (
        <div>
            <Link to={'/news'}> Перейти до списку новин </Link>
            <div><News/></div>
        </div>
    );
}

export {NewsPage}
