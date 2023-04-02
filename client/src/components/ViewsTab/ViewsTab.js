import {Table} from "react-bootstrap";

const ViewsTab = ({title, array}) => {

    return (
        <div>
            <h4 style={{textAlign:'center'}}>{title}</h4>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Найменування закладу</th>
                    <th>Кількість переглядів за період</th>
                </tr>
                </thead>
                <tbody>
                {array.map(item =>
                    <tr key={item.restId}>
                        <td>{item.restaurant}</td>
                        <td>{item.value}</td>
                    </tr>)}
                </tbody>
            </Table>
        </div>
    );
};

export {ViewsTab}
