import {useNavigate} from 'react-router-dom';

import {Button} from 'react-bootstrap';

import {GeneralNews} from '../components';

const GeneralNewsPage = () => {
    const navigate = useNavigate();


    return (
        <div style={{marginTop:10}}>
            <Button variant="outline-secondary" onClick={() => navigate('/generalNews')}>Всі новини </Button>
            <div><GeneralNews/></div>
        </div>
    );
};

export {GeneralNewsPage};
