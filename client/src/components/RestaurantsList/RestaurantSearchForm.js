import {useState} from "react";

import {Button, Col, Form, Row} from "react-bootstrap";
import css from './RestaurantsList.module.css'

const RestaurantSearchForm = ({searchQuery, setSearchParams}) => {

    const [search, setSearch] = useState(searchQuery)

    const submit = (e) => {
        e.preventDefault();
        const query = e.target.search.value;
        setSearchParams({restName: query});
    }

    return (
        // <div className={css.Search}>
        //     <Form>
        //         <Form.Group className="mb-3">
        //             {/*<Form.Label>Email address</Form.Label>*/}
        //             <Form.Control type="search"
        //                           placeholder="пошук по найменуванню"
        //                           value={search}
        //                           onChange={e=> setSearch(e.target.value)} />
        //         </Form.Group>
        //         <Button onSubmit={submit} variant="outline-secondary" type="submit">
        //             Знайти
        //         </Button>
        //         </Form>
        // </div>

    <div >
        <form style={{display:'flex'}} onSubmit={submit}>
            <input style={{ width:'300px'}}
                   type="search"
                   name="search"
                   placeholder="пошук по найменуванню закладу"
                   value={search}
                   onChange={e=> setSearch(e.target.value)}
            />
            <button type="submit">Search</button>
        </form>
    </div>
    );
}
export {RestaurantSearchForm}
