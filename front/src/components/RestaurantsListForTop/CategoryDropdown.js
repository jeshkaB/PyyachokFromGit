import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import {Dropdown} from 'react-bootstrap';

import {topCategoryActions} from '../../redux';

const CategoryDropdown = ({restId}) => {
    const {topCategories, stateChangeTop} = useSelector(state => state.topCategory);
    const dispatch = useDispatch();
    const [categoriesForSelection, setCategoriesForSelection] = useState([])

    useEffect(() => {
        dispatch(topCategoryActions.getAll());
    }, [stateChangeTop]);


useEffect(()=> {
    let categoriesNotInRest = [];
    topCategories.forEach(categ => {
        if (!categ.restaurants.includes(restId))
            categoriesNotInRest.push(categ);
    });
    setCategoriesForSelection(categoriesNotInRest);
},[topCategories])

     const clickCategory = async (categId)=> {
         // setCategoriesForSelection (categoriesForSelection.filter(categ => categ._id !== categId));
         await dispatch (topCategoryActions.addRestaurantInCategory({categId, restId}));
     };
    return (<div>
            <div>
                <Dropdown>
                    <Dropdown.Toggle variant={'outline-secondary'}>Додати в топ-категорію</Dropdown.Toggle>
                    <Dropdown.Menu>
                        {categoriesForSelection && categoriesForSelection.map(categ =>
                            <Dropdown.Item key={categ._id}
                                           onClick={() => clickCategory(categ._id)}>{categ.title}</Dropdown.Item>)}
                    </Dropdown.Menu>
                </Dropdown>
            </div>

        </div>
    );
};

export {CategoryDropdown};

