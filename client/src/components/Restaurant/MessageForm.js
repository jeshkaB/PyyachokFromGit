import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";

import {restaurantActions} from "../../redux";

const MessageForm = ({restId, userId, setStateMessageForm}) => {
    const {register, handleSubmit} = useForm()
    const dispatch = useDispatch();

    const submit = async (data) => {
        const {error} = await dispatch(restaurantActions.sendMessage({restId, userId, text:data}))
        if (!error) {
            alert('Ваше повідомлення відправлено')
            setStateMessageForm(false)
        }
    }
        return (
            <div>
                <form onSubmit={handleSubmit(submit)}>
                    <textarea rows="5" cols="50" placeholder={'напишіть повідомлення'} {...register('text')}></textarea>
                    <br/>
                    <button>Відправити</button>
                </form>

            </div>
        );

}
export {MessageForm}
