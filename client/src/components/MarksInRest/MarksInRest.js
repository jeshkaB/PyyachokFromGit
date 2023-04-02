import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";

import {markActions} from "../../redux";

import {MarksCard} from "../MarksCard/MarksCard";
import StarRatings from "react-star-ratings/build/star-ratings";
import {ModalUC} from "../ModalUC/ModalUC";

import css from './MarksInRest.module.css'


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
    const [modalIsVisible, setModalIsVisible] = useState(false)

    const markClick = () => {
        if (isAuth) setStateStars(true)
        else setModalIsVisible(true)
    }

    const markAlreadyExist = marksOfRest.some(mark=>mark.user?._id===userId)

    const addMark = async (value)=> {
        setRating(value)
        const {error} = await dispatch(markActions.create({id, markObj: {'mark':value}}));
        if (!error) {
            setStateStars(false);
            setIsMarked(true)
            navigate(`../restaurants/${id}/marks`)
        }
    }

    switch (location.pathname) {
        case `/restaurants/${id}`:
            return (
                <div style={{margin:20}}>
                    <ModalUC modalText={'Увійдіть або зареєструйтеся'} show={modalIsVisible} onHide={setModalIsVisible}></ModalUC>
                    {(!marks || JSON.stringify(marksFirst5) === '[]') && <p style={{color:'darkgray'}}>Оцінок поки що немає</p>}
                    {!markAlreadyExist &&
                        <div>
                        <div className={css.CreateMark} onClick={markClick}>Оцінити заклад</div>
                        {stateStars && <StarRatings rating={rating} changeRating={value => addMark(value)}/>}
                    </div>}

                    {(markAlreadyExist || isMarked)  && <p style={{color:'darkgray'}}> Ви вже оцінили цей заклад, змінити оцінку можна в особистому кабінеті</p>}
                    <div>
                        {marksFirst5.map(mark => <MarksCard key={mark._id} mark={mark}/>)}
                    </div>
                </div>
            );
            break
        case `/restaurants/${id}/marks`:

            return (
                <div>
                    {!marks || JSON.stringify(marksOfRest) === '[]' && <p style={{color:'darkgray'}} >Оцінок поки що немає</p>}
                    {marksOfRest &&
                        marksOfRest.map(mark => <MarksCard key={mark._id} mark={mark}/>)}
                </div>
            );
            break
    }
}

export {MarksInRest}
