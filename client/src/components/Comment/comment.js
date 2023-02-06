import {useLocation} from "react-router-dom";

const Comment = ({comment, restaurants}) => {

    const location = useLocation();
    let stateIsForAccount = false;
    if (location.pathname === '/myAccount') stateIsForAccount = true;

    const date = comment.createdAt.slice(0, 10)

    let restaurant = {}
    if (restaurants) restaurant = restaurants.find(rest => rest._id === comment.restaurant)

    if (!stateIsForAccount) {
        return (
            <div style={{margin: 20}}>
                <div>
                    <h3> {comment.comment} </h3>
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <div>{comment.user.name}</div>
                        <div>{date}</div>
                        {/*формат дати в БД "2023-01-22T18:52:44.368Z"*/}</div>
                </div>
            </div>
        )

    } else {
        return (
            <div style={{margin: 20}}>
                <div>
                    <h4> {restaurant.name} </h4>
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'left'}}>
                        <div>{comment.comment}</div>
                        <div style={{marginLeft: 20}}>{date}</div>
                        {/*формат дати в БД "2023-01-22T18:52:44.368Z"*/}</div>
                </div>
            </div>
        );

    }
};
export {Comment}
