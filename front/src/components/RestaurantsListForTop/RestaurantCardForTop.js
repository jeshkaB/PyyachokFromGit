/* eslint-disable react-hooks/exhaustive-deps */
import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useState} from 'react';

import {topCategoryActions} from '../../redux';

import {CategoryDropdown} from './CategoryDropdown';

import css from './RestaurantCardForTop.module.css';

const RestaurantCardForTop = ({restaurant}) => {
    const dispatch = useDispatch();
    const {_id, name, place, topCategories: categoriesIdsInRest} = restaurant;
    const {topCategories} = useSelector(state => state.topCategory);

    useEffect(() => {
        dispatch(topCategoryActions.getAll());
    }, []);

    let categoriesNotInRest = [];
    topCategories.forEach(categ => {
        if (!categoriesIdsInRest.includes(categ._id))
            categoriesNotInRest.push(categ);
    });

    const [categoriesForSelection, setCategoriesForSelection] = useState(categoriesNotInRest);

    let categoriesInRest = [];
    topCategories.forEach(categ =>
        categoriesIdsInRest.forEach(categId => {
            if (categId === categ._id)
                categoriesInRest.push(categ);
        }));

    const removeFromTop = async (categId) => {
        const returnedCategory = topCategories.find(categ => categ._id === categId);
        setCategoriesForSelection(
            categoriesForSelection.includes(returnedCategory) ? categoriesForSelection : [...categoriesForSelection, returnedCategory]);
        await dispatch(topCategoryActions.removeRestaurantInCategory({categId, restId: _id}));

    };

    return (
        <div className={css.Hole}>
            <div className={css.Title}>
                <h4>{name}</h4>
                <p>{place}</p>
            </div>

            <div className={css.IsTop}>
                {JSON.stringify(categoriesInRest) !== '[]' && categoriesInRest.map(categ =>
                    <div className={css.Del} key={categ._id}>
                        <div className={css.CatName}>{categ.title} </div>
                        <button style={{marginLeft:5}} onClick={() => removeFromTop(categ._id)}>Видалити з топ</button>
                    </div>)}
            </div>

            <div>
                <CategoryDropdown categoriesForSelection={categoriesForSelection}
                                  setCategoriesForSelection={setCategoriesForSelection} restId={_id}/>
            </div>

        </div>
    );
};

export {RestaurantCardForTop};
