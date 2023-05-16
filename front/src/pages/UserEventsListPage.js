import {UserEventList} from '../components';

const UserEventsListPage = (props) => {
    return (

       <div style={{margin:20}}>
           <h2 style={{fontFamily: 'cursive', color: 'darkslategrey'}}>Пиячки на будь-який смак</h2>
           <p style={{fontFamily: 'cursive', color: 'darkslategrey'}}>Тут ви можете створити свою подію або приєднатися до іншої компанії </p>
           <UserEventList/>
       </div>
    );
};

export {UserEventsListPage};
