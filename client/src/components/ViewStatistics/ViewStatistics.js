import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {useParams} from "react-router-dom";

import {viewStatisticsActions} from "../../redux";
import {ChartUC} from "../ChartUC/ChartUC";

const ViewStatistics = ({period}) => {
    const dispatch = useDispatch();
    const {id} = useParams();
    const {views} = useSelector(state => state.viewStatistics)
    const {from,until} = period

    let periodForFilter
    let chartTitle
    if (JSON.stringify(period) !== '{}') {
        periodForFilter = {'from': Date.parse(from), 'until': Date.parse(until) + 1000 * 60 * 60 * 24}//Date.parse робить формат дати в мс з 1970р.
        chartTitle = `Статистика переглядів за період з ${from} по ${until}`
    }
    else
        chartTitle = 'Статистика переглядів за весь період'

    useEffect(() => {
        dispatch(viewStatisticsActions.getByRestId(id))
    }, []);

    const viewsMS = [];//тут буде наш масив з датами у вигляді мілісекунд
    let viewsMsByPeriod
    if (periodForFilter) {
        views.forEach(view => viewsMS.push({...view, createdAt: Date.parse(view.createdAt)})); //Date.parse робить формат дати в мс з 1970р.
        viewsMsByPeriod = viewsMS.filter(view => view.createdAt >= periodForFilter.from && view.createdAt <= periodForFilter.until)
    }
    else viewsMsByPeriod = views


    const array = [];
    viewsMsByPeriod.forEach(view1 => {
        if (array.find(item => item.label === view1.updatedAt.toString().slice(0, 10)) === undefined) {
            const oneDate = viewsMsByPeriod.filter(view2 => view2.updatedAt.toString().slice(0, 10) === view1.updatedAt.toString().slice(0, 10))//беру тут updatedAt, щоб на графіку відображались дати , а не багатоцифр
            const item = {'label': view1.updatedAt.toString().slice(0, 10), 'value': oneDate.length}
            array.push(item)
        }
    })

    return (
        <div>
            <ChartUC chartTitle={chartTitle} array={array}/>
        </div>
    );
};

export {ViewStatistics}
