import {UserEventList} from '../components';

const UserEventsListPage = (props) => {
    return (

       <div style={{margin:20}}>
           <h2 style={{fontFamily: 'cursive', color: 'darkslategrey'}}>Пиячки на будь-який смак</h2>
           <UserEventList/>

       </div>
    );
};

export {UserEventsListPage};
