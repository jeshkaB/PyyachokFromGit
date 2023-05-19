import {useState} from 'react';

import {Dropdown} from 'react-bootstrap';
import {categoriesForRestSort} from '../../constants';


const RestaurantsSort = ({setSearchParams, searchParams}) => {

    const {categoriesSort} = categoriesForRestSort;
    const [currentCateg, setCurrentCateg] = useState('');
    
    const click = (categ) => {
        setSearchParams (searchParams => {
            searchParams.set('sort', categ.key);
            searchParams.set('sortOrder', `${categ.sortOrder}`);
            return searchParams;
        });
        setCurrentCateg(categ.name);
    };

    return (
        <div>
            <Dropdown>
                <Dropdown.Toggle variant="outline-secondary">{currentCateg || 'Сортувати по'}</Dropdown.Toggle>
                <Dropdown.Menu>
                    {categoriesSort.map(categ =>
                        <Dropdown.Item key={categ.key} onClick={() => click(categ)}>{categ.name}</Dropdown.Item>
                    )}
                </Dropdown.Menu>
            </Dropdown>
        </div>

    );
};

export {RestaurantsSort};
