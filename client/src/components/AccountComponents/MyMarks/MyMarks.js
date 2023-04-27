import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useState} from 'react';

import {markActions} from '../../../redux';

import {MyMarksCard} from './MyMarksCard';

import css from './MyMarks.module.css';

const MyMarks = ({user}) => {
    const {_id} = user;
    const {marks} = useSelector(state => state.mark);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(markActions.getAll());
    }, [dispatch]);

    let myMarks=[];
    if (marks) myMarks = marks.filter(mark=>mark.user?._id ===_id);

    const [stateMarks, setStateMarks] = useState(false);

    return (
        <div>
            <div className={css.To} onClick={()=>setStateMarks(true)}>Мої оцінки</div>
            {stateMarks &&
                <div>
                    <button onClick={()=>setStateMarks(false)}>Згорнути</button>
                    {myMarks.map(mark=><MyMarksCard key = {mark._id} mark={mark}/>)}
                </div>}

        </div>
    );
};

export {MyMarks};
