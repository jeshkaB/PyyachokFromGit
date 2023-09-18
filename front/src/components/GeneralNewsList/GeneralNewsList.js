import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useLocation, useNavigate} from 'react-router-dom';

import {Button} from 'react-bootstrap';

import css from '../GeneralNewsList/GeneralNewsList.module.css';
import {generalNewsActions} from '../../redux';
import {GeneralNewsCard} from '../GeneralNewsCard/GeneralNewsCard';

const GeneralNewsList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const {newsAll} = useSelector(state => state.generalNews);
    useEffect(() => {
        dispatch(generalNewsActions.getAll());
    }, [dispatch]);

    let newsForCard = [];
    let isHome = false;
    if (location.pathname === '/home') {
        newsForCard = newsAll?.slice(0, 9); // для домашньої сторінки 9 новин
        isHome = true;
    }
    else newsForCard = newsAll;

    return (<div className={location.pathname === '/home' ? css.NewsOnHome : css.NewsListInList}>
            {/*<h4>Новини</h4>*/}
            {location.pathname === '/home' && <Button variant="outline-secondary" onClick={() => navigate('/generalNews')}>Всі новини </Button>}
                <div className={location.pathname === '/home' ? css.NewsListOnHome : css.NewsListInList} >{newsForCard.map(news => <GeneralNewsCard key={news._id} news={news} isHome={isHome}/>)}</div>
            </div>
        );

};
export {GeneralNewsList};
