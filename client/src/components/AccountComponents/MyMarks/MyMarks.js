import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {markActions} from "../../../redux";
import {MyMarksCard} from "./MyMarksCard";


const MyMarks = ({user}) => {
    const {_id} = user;
    const {marks} = useSelector(state => state.mark);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(markActions.getAll())
    }, [dispatch]);

    let myMarks=[]
    if (marks) myMarks = marks.filter(mark=>mark.user?._id ===_id)

    const [stateMarks, setStateMarks] = useState(false)

    return (
        <div>
            <h3 style={{cursor: "pointer"}} onClick={()=>setStateMarks(true)}>Мої оцінки</h3>
            {stateMarks &&
                <div>
                    <button onClick={()=>setStateMarks(false)}>Згорнути</button>
                    {myMarks.map(mark=><MyMarksCard key = {mark._id} mark={mark}/>)}
                </div>}

        </div>
    );
};

export {MyMarks}
