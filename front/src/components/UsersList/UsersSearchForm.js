import {Form} from 'react-bootstrap';
import css from '../RestaurantsList/RestaurantsList.module.css';

const UsersSearchForm = ({setSearchParams}) => {

    const submit = (e) => {
        e.preventDefault();
        const query = e.target.search.value;
        setSearchParams({userEmail: query});
    };

    return (
        <div className={css.Search}>
            <Form onSubmit={submit} >
                <Form.Group className="mb-3">
                    <Form.Control type="search"
                                  name="search"
                                  placeholder="пошук по email"/>
                </Form.Group>
                <button>Знайти</button>
                </Form>
        </div>

    );
};
export {UsersSearchForm};
