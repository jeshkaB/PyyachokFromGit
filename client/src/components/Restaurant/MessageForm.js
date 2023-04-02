import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";

import {restaurantActions} from "../../redux";

import {ModalUC} from "../ModalUC/ModalUC";

const MessageForm = ({restId, userId, setStateMessageForm}) => {
    const {register, handleSubmit} = useForm()
    const dispatch = useDispatch();
    const {errors} = useSelector(state => state.restaurant)

    const [modalIsVisible, setModalIsVisible] = useState(false);
    const [errorIsVisible, setErrorIsVisible] = useState(false);

    const submit = async (data) => {
        const {error} = await dispatch(restaurantActions.sendMessage({restId, userId, text:data}))
        if (!error) {
            setModalIsVisible(true)
        }
        else {
            setErrorIsVisible(true)
        }
    }
        return (
            <div>
                <ModalUC modalText={'Ваше повідомлення відправлено'} show={modalIsVisible} onHide={setModalIsVisible} type={'success'} executingFunction={setStateMessageForm} funcValue={true}></ModalUC>
                <ModalUC modalText={errors?.message} show={errorIsVisible} onHide={setErrorIsVisible} type={'danger'}></ModalUC>

                <form onSubmit={handleSubmit(submit)}>
                    <textarea rows="5" cols="50" placeholder={'напишіть повідомлення'} {...register('text')}></textarea>
                    <br/>
                    <button>Відправити</button>
                </form>

            </div>
        );

}
export {MessageForm}
