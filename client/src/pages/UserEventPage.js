
import {UserEvent} from "../components";
import {useSelector} from "react-redux";

const UserEventPage = () => {
    const {errors} = useSelector(state => state.userEvent)

    return (
        <div>
            {errors &&
                <h3 className={'errors'}> {errors.message} </h3>}
            <UserEvent/>
        </div>
    );
}
export {UserEventPage}
