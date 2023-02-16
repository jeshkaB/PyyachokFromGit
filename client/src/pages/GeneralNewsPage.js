import {GeneralNews} from "../components";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";


const GeneralNewsPage = () => {
const {errors} = useSelector(state => state.generalNews)

    return (
        <div>
            {errors &&
                <h3 className={'errors'}> {errors.message} </h3>}
            <Link to={'/generalNews'}> Перейти до списку загальних новин </Link>
            <div><GeneralNews/></div>
        </div>
    );
}

export {GeneralNewsPage}
