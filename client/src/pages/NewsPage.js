import {Link} from 'react-router-dom';

import {News} from '../components';

import css from './NewsPage.module.css';

const NewsPage = (props) => {

    return (
        <div>
            <div className={css.ToList}>
                <Link className={css.Link} to={'/news'}> Перейти до всіх новин </Link>
            </div>
            <div><News/></div>
        </div>
    );
};

export {NewsPage};
