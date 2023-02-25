import {Dropdown} from "react-bootstrap";
import {categoriesForRestSort} from "../../constants";

const RestaurantsSort = ({selectedCatSort, setSelectedCatSort}) => {

    const {categoriesSort} = categoriesForRestSort;

    return (<div>
            <Dropdown>
                <Dropdown.Toggle>{selectedCatSort || "Сортувати по"}</Dropdown.Toggle>
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
