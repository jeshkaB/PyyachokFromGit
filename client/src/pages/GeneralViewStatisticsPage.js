import {useForm} from "react-hook-form";
import {useState} from "react";

import {GeneralViewStatistics} from "../components";

const GeneralViewStatisticsPage = () => {
    const {register, handleSubmit} = useForm();
    const [period, setPeriod] = useState({});

    const submit = (data) => {
        setPeriod(data)
    }
        return (
            <div style={{margin:20}}>
                <form onSubmit={handleSubmit(submit)}>
                    <input type='date' placeholder={'з'} required={true} {...register('from')}/>
                    <input type='date' placeholder={'по'} required={true} {...register('until')}/>
                    <button>Показати</button>
                </form>
                <GeneralViewStatistics period={period} />
            </div>
        );
}
export {GeneralViewStatisticsPage}
