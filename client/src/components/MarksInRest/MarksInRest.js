import {MarksCard} from "../MarksCard/MarksCard";
import {useDispatch, useSelector} from "react-redux";

import {markActions} from "../../redux";
import {useEffect, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import StarRatings from "react-star-ratings/build/star-ratings";

const MarksInRest = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams();
    const {marks} = useSelector(state => state.mark)

    useEffect(() => {
        dispatch(markActions.getAll())
    }, [dispatch])

    const {isAuth, userId} = useSelector(state => state.auth)
    const [isMarked, setIsMarked] = useState(false);
    const [rating, setRating] = useState(0)
    const [stateStars, setStateStars] = useState(false);

    const marksOfRest = marks?.filter(mark=>mark.restaurant._id===id)
    const marksFirst5 = [...marksOfRest]?.reverse().slice(0, 5);//в API посортовані від перших до останніх

    const markClick = () => {
        if (isAuth) setStateStars(true)
        else alert('Увійдіть або зареєструйтеся')
    }

    const markAlreadyExist = marksOfRest.some(mark=>mark.user._id===userId)

    const addMark = async (value)=> {
        setRating(value)
        const {error} = await dispatch(markActions.create({id, markObj: {'mark':value}}));
        if (!error) {
            setStateStars(false);
            setIsMarked(true)
            alert ('Ваша оцінка зарахована')
            navigate(`../restaurants/${id}/marks`)
        }
    }

    switch (location.pathname) {
        case `/restaurants/${id}`:
            return (
                <div>
                    {(!marks || JSON.stringify(marksFirst5) === '[]') && <h3>Оцінок поки що немає</h3>}
                    <div style={{border: 'solid', width: '50%'}}>
                        {marksFirst5.map(mark => <MarksCard key={mark._id} mark={mark}/>)}
                    </div>
                    <h4 style={{cursor: "pointer"}} onClick={markClick}>Оцінити заклад</h4>
                    {(markAlreadyExist || isMarked)  && <p>Ви вже оцінили цей заклад, змінити оцінку можна в особистому кабінеті</p>}
                    {stateStars && !markAlreadyExist && <StarRatings rating={rating} changeRating={value=>addMark(value)}/>}
                </div>
            );
            break
        case `/restaurants/${id}/marks`:

            return (
                <div>
                    {!marks || JSON.stringify(marksOfRest) === '[]' && <h3>Оцінок поки що немає</h3>}
                    {marksOfRest &&
                        marksOfRest.map(mark => <MarksCard key={mark._id} mark={mark}/>)}
                </div>
            );
            break
    }
}

export {MarksInRest}
