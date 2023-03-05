// import {Dropdown} from "react-bootstrap";
// import {useDispatch, useSelector} from "react-redux";
// import {topCategoryActions} from "../../redux";
//
// const CategoryDropdown = ({categories, restId}) => {
//     const dispatch = useDispatch();
//     const {topCategory} = useSelector(state => state.topCategory);
//
//     const setSelectedCateg = async (categId)=> {
//
//         await dispatch(topCategoryActions.getById(categId))
//         const {error} = await dispatch(topCategoryActions.addRestaurantInCategory({categId, restId}))
//
//     }
//     return (<div>
//             <Dropdown>
//                 <Dropdown.Toggle>{topCategory.title || "Додати в топ-категорію"}</Dropdown.Toggle>
//                 <Dropdown.Menu>
//                     {categories && categories.map(categ =>
//                         <Dropdown.Item key={categ._id} onClick={() => setSelectedCateg(categ._id)}>{categ.title}</Dropdown.Item>
//                     )}
//                 </Dropdown.Menu>
//             </Dropdown>
//         </div>
//
//     )
// }

// const allToppings = [
//     { name: "Golden Corn", checked: false },

import {useState} from "react";
import {topCategoryActions} from "../../redux";
import {useDispatch} from "react-redux";

const CategoryCheckbox = ({categories, restId}) => {
    const dispatch = useDispatch();

    const categoriesWithChecked = categories.map(categ => ({...categ, checked: false}))

    const [currentCategories, setCurrentCategories] = useState(categoriesWithChecked);
    const [stateCheckbox, setStateCheckbox] = useState(false);

    const updateCheckStatus = (index) => {
        setCurrentCategories(
            currentCategories.map((categ, currentIndex) => {
                    if (currentIndex === index)
                        return {...categ, checked: !categ.checked}
                    else return categ}))
    }

    const resetCheckStatus = () => {
        setCurrentCategories(
            currentCategories.map(categ => ({...categ, checked: false})))
    }

    const setSelectedCateg = () => {
        const categoriesForAdding = currentCategories.filter(categ => categ.checked === true );
        categoriesForAdding.map(async (categ) => {
                await dispatch(topCategoryActions.addRestaurantInCategory({categId: categ._id, restId}))
                })
                setStateCheckbox(false)}

    return (
        <div>
            <button onClick={() => setStateCheckbox(true)}>Додати в топ</button>
            {stateCheckbox &&
                <div>
                    <button onClick={() => setStateCheckbox(false)}>Згорнути</button>
                    {currentCategories.map((categ, index) => (
                        <div key={categ._id}>
                            <input
                                type="checkbox"
                                // id={`checkbox-${index}`}
                                checked={categ.checked}
                                onChange={() => updateCheckStatus(index)}
                            />
                            <label htmlFor={`checkbox-${index}`}>{categ.title}</label>
                        </div>))}

                </div>}
            <button onClick={resetCheckStatus}>Скинути</button>
            <button onClick={setSelectedCateg}>Зберігти</button>
        </div>
    )
}
export {CategoryCheckbox};

// <div>
//     <button onClick={() => setStateCheckbox(false)}>Згорнути</button>
//     {currentCategories.map((categ, index) => (
//         <div key={categ._id}>
//             <input
//                 type="checkbox"
//                 id={`checkbox-${index}`}
//                 checked={categ.checked}
//                 onChange={() => updateCheckStatus(index)}
//             />
//             <label htmlFor={`checkbox-${index}`}>{categ.title}</label>
//         </div>))}
//
// </div>}
