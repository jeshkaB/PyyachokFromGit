import API_URL from "../../config";
import {useNavigate} from 'react-router-dom'


const GeneralNewsCard = ({news}) => {
    const {_id, title, content, newsImage, category, createdAt} = news;
    const navigate = useNavigate();

    return (
        <div onClick={() => navigate(`../generalNews/${_id}`)}>
            <h2>{title}</h2>
            <div>{category}, {createdAt.slice(0, 10)}</div>
            <div>{content}</div>
            {newsImage && <img width={150} src={API_URL + newsImage} alt={'зображення у новині'}/>}
        </div>)
}

export {GeneralNewsCard};
