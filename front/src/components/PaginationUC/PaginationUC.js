/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useState} from 'react';

import {Pagination} from 'react-bootstrap';

const PaginationUC = ({entitiesList, setEntitiesOnPage, limit}) => {
    const [currentPage, setPage] = useState(1);
    const numberPages = Math.ceil(entitiesList.length / limit);

    const pages = [];
    for (let i = 0; i < numberPages; i++) {
        pages.push(i + 1);
    }
    const entitiesListJson = JSON.stringify(entitiesList);
    useEffect(() => {
        setEntitiesOnPage(entitiesList.slice(currentPage * limit - limit, limit * currentPage));
    }, [currentPage, entitiesListJson]);

    return (
            <div>
            <Pagination >
                {pages.map(page =>
                    <Pagination.Item
                        key={page}
                        active={currentPage===page}
                        onClick={() => setPage(page)}>
                        {page}
                    </Pagination.Item>)}
            </Pagination>
        </div>
    );
};



export {PaginationUC};
