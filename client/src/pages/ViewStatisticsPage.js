import {useForm} from 'react-hook-form';
import {useState} from 'react';

import {ViewStatistics} from '../components/ViewStatistics/ViewStatistics';

const ViewStatisticsPage = () => {
    const {register, handleSubmit} = useForm();
    const [period, setPeriod] = useState({});

    const submit = (data) => {
        setPeriod(data);
    };

        return (
            <div>
                <form onSubmit={handleSubmit(submit)}>
                    <input type='date' placeholder={'з'} required={true} {...register('from')}/>
                    <input type='date' placeholder={'по'} required={true} {...register('until')}/>
                    <button>Показати</button>
                </form>
                <button style={{width:370, marginTop:5}} onClick={()=>setPeriod({})}>Показати за весь період</button>
                <ViewStatistics period={period} />
            </div>
        );
};
export {ViewStatisticsPage};
