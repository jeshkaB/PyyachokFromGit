import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

import {News} from "../components";

import css from './NewsPage.module.css';

const NewsPage = (props) => {
const {errors} = useSelector(state => state.news)

    return (
        <div>
            {errors &&
                <h3 className={'errors'}> {errors.message} </h3>}
            <div className={css.ToList}>
                <Link className={css.Link} to={'/news'}> Перейти до всіх новин </Link>
            </div>
            <div><News/></div>
        </div>
    );
}

export {NewsPage}
