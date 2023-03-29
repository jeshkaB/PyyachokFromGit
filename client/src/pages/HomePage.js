import {GeneralNewsList, NewsList, RestaurantsList, TopList} from "../components";

import css from './HomePage.module.css';

const HomePage = () => {

    return (
        <div className={css.Hole}>
            <div className={css.TopList}><TopList/></div>

            <div className={css.Main}>
                <div className={css.RestList}><RestaurantsList/></div>
                <div className={css.News}><GeneralNewsList/></div>
            </div>
        </div>
    );
}

export {HomePage};
