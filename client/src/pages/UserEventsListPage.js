import {UserEventList} from "../components";
import {useSelector} from "react-redux";


const UserEventsListPage = (props) => {
    const {errors} = useSelector(state => state.userEvent)
    return (

       <div>
           <h1 style={{fontFamily: 'cursive', color: 'blue'}}>ПИЯЧКИ</h1>
           <UserEventList/>
           {errors &&
           <h3 className={'errors'}> {errors.message} </h3>}
       </div>
    );
}

export {UserEventsListPage}
