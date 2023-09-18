
import {StarsRating} from '../StarsRating/starsRating';

const MarksCard = ({mark}) => {
    const date = mark.createdAt.slice(0, 10);

    return (
        <div style={{marginLeft:20}}>
            {mark && <div>
                <StarsRating rating={mark.mark}/>
                <p>{mark.user?.name}, {date}</p>
                <hr/>
            </div>
            }

        </div>
    );
};

export {MarksCard};
