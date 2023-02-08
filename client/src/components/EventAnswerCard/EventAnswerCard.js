import {useDispatch, useSelector} from "react-redux";

import {eventAnswerActions, userActions} from "../../redux";
import {useEffect} from "react";

const EventAnswerCard = ({answ}) => {
//TODO Не оновлюється список відповідей після створення нової, намає перерендерингу (тому що populate?)
//TODO Розібратися - коли я сюди в пропсах передаю айдішку відповіді і тут роблю запит getBuId, нічого не виходить, бо остання відповідь рендериться у всіх картках

 return (

        <div>
             {JSON.stringify(answ) !== '{}' &&
                <div>
                    <h3>{answ.answer}</h3>
                    <p>{answ.user.name}</p>
                    <p>{answ.createdAt.slice(0, 10)}</p>
                </div>}
        </div>
    );
};

export {EventAnswerCard}
