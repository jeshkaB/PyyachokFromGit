import {Dropdown} from "react-bootstrap";

import {categoriesForRestSort} from "../../constants";
import css from './RestaurantsList.module.css'


const RestaurantsSort = ({selectedCatSort, setSelectedCatSort}) => {

    const {categoriesSort} = categoriesForRestSort;

    return (
        <div>
            <Dropdown>
                <Dropdown.Toggle variant="outline-secondary">{selectedCatSort || "Сортувати по"}</Dropdown.Toggle>
                <Dropdown.Menu>
                    {categoriesSort.map(categ =>
                        <Dropdown.Item key={categ.key} onClick={() => setSelectedCatSort(categ.name)}>{categ.name}</Dropdown.Item>
                    )}
                </Dropdown.Menu>
            </Dropdown>
        </div>

    )
}


export {RestaurantsSort}
