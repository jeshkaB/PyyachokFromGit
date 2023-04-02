import {useNavigate} from 'react-router-dom'

import API_URL from "../../config";
import css from '../GeneralNewsCard/GeneralNewsCard.module.css'

const GeneralNewsCard = ({news, isHome}) => {
    const {_id, title, content, newsImage, category, createdAt} = news;
    const navigate = useNavigate();

        return (
            <div className={isHome ? css.HoleOnHome : css.HoleInList} onClick={() => navigate(`../generalNews/${_id}`)}>
                <h4>{title}</h4>
                <div>{category}, </div>
                <div>опубліковано {createdAt.slice(0, 10)}</div>
                {newsImage && <img height={100} src={API_URL + newsImage} alt={'зображення у новині'}/>}
                {!isHome && <div>{content}</div>}
            </div>)
 }

export {GeneralNewsCard};
