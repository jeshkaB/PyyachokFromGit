import {Button, Form} from 'react-bootstrap';
import css from './RestaurantsList.module.css';

const RestaurantSearchForm = ({setSearchParams}) => {
    
    const submit = (e) => {
        e.preventDefault();
        const query = e.target.search.value;
        setSearchParams(searchParams => {
                searchParams.set('search', query);
                searchParams.delete('page');
                return searchParams;
            });
    };

    return (
        <div className={css.Search}>
            <Form onSubmit={submit} >
                <Form.Group className="mb-3">
                    <Form.Control type="search"
                                  name="search"
                                  placeholder="пошук по найменуванню"/>
                </Form.Group>
                <Button size={'sm'} variant="outline-secondary" type="submit">
                    Знайти
                </Button>
                </Form>
        </div>

    );
};
export {RestaurantSearchForm};
