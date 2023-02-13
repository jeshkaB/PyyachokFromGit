import {MarksCard} from "../MarksCard/MarksCard";
import {useDispatch, useSelector} from "react-redux";

import {markActions} from "../../redux";
import {useEffect} from "react";

const MarksInRest = ({markIds}) => {//це масив айдішок
    const dispatch = useDispatch()
    const {marks} = useSelector(state => state.mark)

    useEffect(()=>{
        dispatch(markActions.getAll())
    }, [dispatch])

    const marksOfRest =[];
    markIds.forEach(id=>marks.forEach(mark=>mark._id===id && marksOfRest.push(mark)))

    return (
        <div>
            {marksOfRest &&
                marksOfRest.map(mark=><MarksCard key={mark._id} mark={mark}/>)}
        </div>
    );
};

export {MarksInRest}
