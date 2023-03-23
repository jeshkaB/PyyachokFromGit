
import {ViewStatistics} from "../components/ViewStatistics/ViewStatistics";
import {useForm} from "react-hook-form";

import {useState} from "react";


const ViewStatisticsPage = () => {
    const {register, handleSubmit} = useForm();
    const [period, setPeriod] = useState({});

    const submit = (data) => {
        setPeriod(data)
    }
        return (
            <div>
                <form onSubmit={handleSubmit(submit)}>
                    <input type='date' placeholder={'з'} required={true} {...register('from')}/>
                    <input type='date' placeholder={'по'} required={true} {...register('until')}/>
                    <button>Показати</button>
                </form>
                <ViewStatistics period={period} />
            </div>
        );
}
export {ViewStatisticsPage}
