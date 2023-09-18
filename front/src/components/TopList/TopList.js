/* eslint-disable react-hooks/exhaustive-deps */
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';

import {topCategoryActions} from '../../redux';
import {TopCard} from '../TopCard/TopCard';

import css from '../TopList/TopList.module.css';
import topListImage from './rest.JPG';

const TopList = () => {
    const dispatch = useDispatch();
    const {topCategories} = useSelector(state => state.topCategory);

    useEffect(() => {
        dispatch(topCategoryActions.getAll());
    }, []);

    return (
            <div className={css.Top}>
                <img style={{width:'100%', maxheight:'300px'}} src={topListImage} alt={'ресторан'}/>
                <h2 className={css.Title}>Топ закладів</h2>
                <div className={css.CardBlock}>{topCategories?.map(categ =><TopCard key={categ._id} categ={categ}/>)}</div>
            </div>

    );
};

export {TopList};
