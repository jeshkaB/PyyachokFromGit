import {MarksCard} from "../MarksCard/MarksCard";

const MarksList = ({markIds}) => {//це масив айдішок

    return (
        <div>
            {markIds &&
                markIds.map(markId=><MarksCard key={markId} markId={markId}/>)}
        </div>
    );
};

export {MarksList}
