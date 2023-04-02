import {Dropdown} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {topCategoryActions} from "../../redux";



const CategoryDropdown = ({restId, categoriesForSelection,setCategoriesForSelection}) => {
    const dispatch = useDispatch();

     const clickCategory = async (categId)=> {
         setCategoriesForSelection (categoriesForSelection.filter(categ => categ._id !== categId));
         await dispatch (topCategoryActions.addRestaurantInCategory({categId, restId}))
     }

    return (<div>
            <div>
                <Dropdown>
                    <Dropdown.Toggle variant={"outline-secondary"}>Додати в топ-категорію</Dropdown.Toggle>
                    <Dropdown.Menu>
                        {categoriesForSelection && categoriesForSelection.map(categ =>
                            <Dropdown.Item key={categ._id}
                                           onClick={() => clickCategory(categ._id)}>{categ.title}</Dropdown.Item>)}
                    </Dropdown.Menu>
                </Dropdown>
            </div>

        </div>
    )
}

export {CategoryDropdown};

