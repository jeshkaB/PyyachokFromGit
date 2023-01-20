// import {useSelector} from "react-redux";
// import {useEffect} from "react";
// import {restaurantActions} from "../../redux";


const Restaurant = ({restaurant}) => {
    const {name, place, averageBill, hours, email, webSite} = restaurant;



return (
    <div>
        <h1>{name}</h1>
        <div> Адреса: {place}</div>
        <div> Середній чек:{averageBill} грн.</div>
        <div> Режим роботи: {hours}</div>
        <div> Email:{email} </div>
        <div> Сайт: {webSite}</div>


    </div>
)
};

export {Restaurant};
