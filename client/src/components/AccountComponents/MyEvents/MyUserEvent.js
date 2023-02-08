import {useNavigate} from "react-router-dom";

const MyUserEvent = ({event}) => {
const navigate = useNavigate();

    return (
        <div style={{cursor:"pointer", border:"solid 1px gray"}} onClick={()=>navigate(`../UserEvents/${event._id}`)}>
           <h3>{event.purpose}</h3>
            <p> Заклад: {event.restaurant.name}</p>
            <p>Дата: {event.date.slice(0, 10)}</p>
            <p>Час: {event.time}</p>
        </div>
    );
};

export {MyUserEvent}
