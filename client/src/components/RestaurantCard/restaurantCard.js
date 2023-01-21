import API_URL from "../../config";

import './restCardStyle.css'
import {StarsRating} from "../StarsRating/starsRating";

const RestaurantCard = ({restaurant}) => {

const {name,place,averageBill,mainImage, marks} = restaurant;

//TODO значення в стар рейтінг
    return (
        <div className={'RestCard'}>
            <h1 className={'RestName'} >{name}</h1>
            <img width={300} height={300} src={API_URL+mainImage} alt={'зображення закладу'}/>

            <div><StarsRating marksOfRest={marks}/></div>
            <div> Адреса: {place}</div>
            <div> Середній чек:{averageBill} грн.</div>


        </div>
    );
};

export {RestaurantCard};
