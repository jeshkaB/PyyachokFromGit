import {Pagination} from 'react-bootstrap';

const PaginationUC = ({setSearchParams, searchParams, totalItems, limit}) => {
    const numberPages = Math.ceil(totalItems / limit);

    const pages = [];
    for (let i = 0; i < numberPages; i++) {
        pages.push(i + 1);
    }
    const click = (page)=>
        setSearchParams(searchParams => {
            searchParams.set('page', page);
            return searchParams;
        });

    return (
            <div>
            <Pagination>
                {pages.map(page =>
                    <Pagination.Item variant="outline-secondary"
                        key={page}
                        active={searchParams.get('page')===page}
                        onClick={() => click(page)}>
                        {page}
                    </Pagination.Item>)}
            </Pagination>
        </div>
    );
};



export {PaginationUC};
