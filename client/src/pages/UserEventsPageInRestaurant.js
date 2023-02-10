import {useSelector} from "react-redux";
import {UserEventsInRest} from "../components";

const UserEventsPageInRestaurant = () => {

    const {errors} = useSelector(state => state.userEvent)

    return (
        <div>
            <UserEventsInRest/>
            {errors &&
                <h3 className={'errors'}> {errors.message} </h3>}
        </div>
    );
}
export {UserEventsPageInRestaurant}
