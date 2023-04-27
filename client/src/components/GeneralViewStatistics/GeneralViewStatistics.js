import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';

import {viewStatisticsActions} from '../../redux';

import {ViewsTab} from '../ViewsTab/ViewsTab';

const GeneralViewStatistics = ({period}) => {
    const dispatch = useDispatch();
    const {views} = useSelector(state => state.viewStatistics);
    const {from,until} = period;

    let periodForFilter;
    let title;
    if (JSON.stringify(period) !== '{}') {
        periodForFilter = {'from': Date.parse(from), 'until': Date.parse(until) + 1000 * 60 * 60 * 24};//Date.parse робить формат дати в мс з 1970р.
        title = `Статистика переглядів за період з ${from} по ${until}`;
    }
    else
        title = 'Статистика переглядів за весь період';

    useEffect(() => {
        dispatch(viewStatisticsActions.getAll());
    }, [dispatch]);

    const viewsMS = [];//тут буде наш масив з датами у вигляді мілісекунд
    let viewsMsByPeriod;
    if (periodForFilter) {
        views.forEach(view => viewsMS.push({...view, createdAt: Date.parse(view.createdAt)})); //Date.parse робить формат дати в мс з 1970р.
        viewsMsByPeriod = viewsMS.filter(view => view.createdAt >= periodForFilter.from && view.createdAt <= periodForFilter.until);
    }
    else viewsMsByPeriod = views;

    const array = [];
    viewsMsByPeriod?.forEach(view1 => {
        if (array.find(item => item.restId === view1.restaurant._id) === undefined) {
            const oneRest = viewsMsByPeriod.filter(view2 => view2.restaurant._id === view1.restaurant._id);
            const item = {'restaurant': view1.restaurant.name, 'restId': view1.restaurant._id, 'value': oneRest.length};
            array.push(item);
        }
    });

    return (
        <div>
            <ViewsTab title={title} array={array} />
        </div>
    );
};

export {GeneralViewStatistics};
