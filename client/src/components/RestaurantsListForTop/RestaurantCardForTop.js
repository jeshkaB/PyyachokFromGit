import {CategoryCheckbox} from "./-CategoryCheckbox";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {topCategoryActions} from "../../redux";
import button from "bootstrap/js/src/button";
import {CategoryDropdown} from "./CategoryDropdown";

const RestaurantCardForTop = ({restaurant}) => {
    const dispatch = useDispatch();
    const {_id, name, place, topCategories: categoriesIdsInRest} = restaurant;
    const {topCategories} = useSelector(state => state.topCategory)

    useEffect(() => {
        dispatch(topCategoryActions.getAll())
    }, [])

    let categoriesNotInRest = [];
     topCategories.forEach(categ => {
         if (!categoriesIdsInRest.includes(categ._id))
             categoriesNotInRest.push(categ)
     })

    const [categoriesForSelection, setCategoriesForSelection] = useState(categoriesNotInRest)

    let categoriesInRest = [];
    topCategories.forEach(categ =>
        categoriesIdsInRest.forEach(categId => {
            if (categId === categ._id)
                categoriesInRest.push(categ)
        }))

    const removeFromTop = async (categId) => {
        const returnedCategory = topCategories.find(categ=>categ._id === categId)
        setCategoriesForSelection (
            categoriesForSelection.includes(returnedCategory) ? categoriesForSelection: [...categoriesForSelection,returnedCategory]);
        await dispatch(topCategoryActions.removeRestaurantInCategory({categId, restId: _id}));

    }

    return (
        <div style={{display: 'flex'}}>
            <div>
                <h4>{name}</h4>
                <p>{place}</p>
            </div>
            <div style={{flexDirection: 'column'}}>
                <div style={{flexDirection: 'row'}}>
                    {JSON.stringify(categoriesInRest) !== '[]' && categoriesInRest.map(categ =>
                        <div key={categ._id}>
                            <p style={{cursor: 'pointer', color: 'violet'}}>{categ.title} </p>
                            <button onClick={() => removeFromTop(categ._id)}>Видалити з топ</button>
                        </div>)}
                </div>
                <CategoryDropdown categoriesForSelection={categoriesForSelection} setCategoriesForSelection={setCategoriesForSelection} restId={_id}/>
            </div>

        </div>
    );
};

export {RestaurantCardForTop};
