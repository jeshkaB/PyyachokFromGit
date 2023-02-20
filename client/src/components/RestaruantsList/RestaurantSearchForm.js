import {useState} from "react";

const RestaurantSearchForm = ({searchQuery, setSearchParams}) => {
    const [search, setSearch]= useState(searchQuery)

    const submit = (e) => {
        e.preventDefault();
        const query = e.target.search.value;
        setSearchParams({restName:query});
    }

    return (
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
