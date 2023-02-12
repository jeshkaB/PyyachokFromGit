import {NewsList} from "../NewsList/newsList";
import {useParams} from "react-router-dom";
import {useState} from "react";
import {NewsCreate} from "../NewsCreate/NewsCreate";

const NewsForAdmin = () => {
    const {id} = useParams()

    return (
        <div>
            <NewsCreate restId={id}/>
            <NewsList restId={id}/>
        </div>
    );
};

export {NewsForAdmin}
