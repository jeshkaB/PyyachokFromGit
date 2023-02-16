import API_URL from "../../config";
import {useNavigate, useParams} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {generalNewsActions} from "../../redux";
import {NewsUpdate} from "../NewsUpdate/NewsUpdate";


const GeneralNews = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams();
    const {newsOne} = useSelector(state => state.generalNews);
    const {title, content, newsImage, category} = newsOne
    const [confirmDelete, setConfirmDelete]=useState(false);

    useEffect(() => {
        dispatch(generalNewsActions.getById(id))
    }, [dispatch])

    const clickDelete = async ()=> {
        const {error} = await dispatch(generalNewsActions.deleteById(id));
        if (!error) navigate(-1)
    }

    return (
        <div>
            <div className={'News'}>
                <h2>{title}</h2>
                <div>{category}</div>
                <div>{content}</div>
                {newsImage && <img width={300} src={API_URL + newsImage} alt={'зображення у новині'}/>}
            </div>
            <div>
                <div>
                    <NewsUpdate news={newsOne}/>
                </div>
                <div>
                    <h3 style={{cursor: "pointer", fontSize: '20px', color: 'orange'}} onClick={() => setConfirmDelete(true)}> Видалити новину </h3>
                    {confirmDelete &&
                        <div>
                            <p style={{color: 'red'}}> Ви упевнені що хочете видалити цю новину?</p>
                            <button onClick={clickDelete}>Так</button>
                            <button onClick={() => setConfirmDelete(false)}>Ні</button>
                        </div>}
                </div>
            </div>
        </div>
    );
};

export {GeneralNews};
