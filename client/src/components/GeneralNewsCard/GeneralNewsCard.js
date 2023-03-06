import API_URL from "../../config";
import {useNavigate} from 'react-router-dom'


const GeneralNewsCard = ({news}) => {
    const {_id, title, content, newsImage, category, createdAt} = news;
    const navigate = useNavigate();

    return (
        <div style={{height:250, width: 200}} onClick={() => navigate(`../generalNews/${_id}`)}>
            <h4>{title}</h4>
            <div>{category}, {createdAt.slice(0, 10)}</div>
            {/*<div>{content}</div>*/}
            {newsImage && <img width={150} src={API_URL + newsImage} alt={'зображення у новині'}/>}
        </div>)
}

export {GeneralNewsCard};
