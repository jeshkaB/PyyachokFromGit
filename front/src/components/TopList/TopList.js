/* eslint-disable react-hooks/exhaustive-deps */
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';

import {topCategoryActions} from '../../redux';
import {TopCard} from '../TopCard/TopCard';

import css from '../TopList/TopList.module.css';

const TopList = () => {
    const dispatch = useDispatch();
    const {topCategories} = useSelector(state => state.topCategory);

    useEffect(() => {
        dispatch(topCategoryActions.getAll());
    }, []);

    return (
            <div className={css.Top}>
                {topCategories?.map(categ =><TopCard key={categ._id} categ={categ}/>)}
            </div>

    );
};

export {TopList};
