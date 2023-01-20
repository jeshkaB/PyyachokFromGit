
const RestaurantCard = ({restaurant}) => {

const {name,place,averageBill,} = restaurant;

    return (
        <div>
            <h1>{name}</h1>
            <div> Адреса: {place}</div>
            <div> Середній чек:{averageBill} грн.</div>
            <div> Рейтінг </div>

        </div>
    );
};

export {RestaurantCard};
