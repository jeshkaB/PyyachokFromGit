import API_URL from "../../config";
import './restCardStyle.css'

const RestaurantCard = ({restaurant}) => {

const {name,place,averageBill,mainImage} = restaurant;

    return (
        <div className={'restCard'}>
            <h1>{name}</h1>
            <img width={300} height={300} src={API_URL+mainImage} alt={'зображення закладу'}/>
            <div> Адреса: {place}</div>
            <div> Середній чек:{averageBill} грн.</div>
            <div> Рейтінг </div>

        </div>
    );
};

export {RestaurantCard};
