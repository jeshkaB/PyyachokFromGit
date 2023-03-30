import {UserEventList} from "../components";
import {useSelector} from "react-redux";


const UserEventsListPage = (props) => {
    // const {errors} = useSelector(state => state.userEvent)
    return (

       <div>
           <h2 style={{fontFamily: 'cursive', color: 'darkslategrey'}}>Пиячки на будь-який смак</h2>
           <UserEventList/>
           {/*{errors &&*/}
           {/*<h2 className={'errors'}> {errors.message} </h2>}*/}
       </div>
    );
}

export {UserEventsListPage}
