import {useNavigate} from 'react-router-dom';

const UserEventCard = ({event}) => {
    const navigate = useNavigate();
    const {date,purpose,restaurant} = event;

    return (
        <div style={{cursor:'pointer'}} onClick={()=>navigate(`../UserEvents/${event._id}`)}>
            <h3>{purpose}</h3>
            <p>в {restaurant.name}</p>
            <p>{date.slice(0, 10)}</p>
            <hr/>
        </div>
    );
};

export {UserEventCard};
