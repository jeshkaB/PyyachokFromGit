import {useForm} from 'react-hook-form';
import {useEffect, useState} from 'react';

import {Dropdown} from 'react-bootstrap';

import css from './RestaurantsList.module.css';

const RestaurantsFilter = ({setSearchParams, isReset}) => {

    useEffect(()=> {
        setFilterIsOpen(false);
    }, [isReset]);

    const {register, handleSubmit} = useForm();

    const submit = async (data) => {
        const ratingFilterMin = data.ratingMin ==='' ? 0 : data.ratingMin;
        const ratingFilterMax = data.ratingMax===''? 5 : data.ratingMax;
        const billFilterMin = data.billMin ==='' ? 0 : data.billMin;
        const billFilterMax = data.billMax === '' ? 100000 : data.billMax;
        const tagsFilter = data.tags;
        setSearchParams (searchParams => {
            searchParams.set('rating', `${ratingFilterMin}-${ratingFilterMax}`);
            searchParams.set('averageBill', `${billFilterMin}-${billFilterMax}`);
            tagsFilter && searchParams.set('tags', tagsFilter);
            return searchParams;
        });
    };

    const [filterIsOpen, setFilterIsOpen] = useState(false);
    useEffect(()=> {
        setFilterIsOpen(false);
    }, [isReset]);

    return (<div >
            <div>
                <Dropdown>
                    <Dropdown.Toggle variant="outline-secondary">{'Фільтр'}</Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => setFilterIsOpen(true)}>Відкрити фільтр</Dropdown.Item>
                        <Dropdown.Item onClick={() => setFilterIsOpen(false)}>Згорнути фільтр</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            { filterIsOpen &&
                <div className={css.Form}>
                <form onSubmit={handleSubmit(submit)}>
                    <label>Рейтинг від 1 до 5
                        <input className={css.Input} type={'number'}  {...register('ratingMin')}/>
                        <input className={css.Input} type={'number'}  {...register('ratingMax')}/>
                    </label>
                    <br/>
                    <label>Середній чек від...до...
                        <input className={css.Input} type={'number'}  {...register('billMin')}/>
                        <input className={css.Input} type={'number'}  {...register('billMax')}/>
                    </label>
                    <br/>
                    <label>Теги (через кому)
                        <input className={css.Input} type={'text'}  {...register('tags')}/>
                    </label>
                    <br/>
                    <button>Відфільтрувати</button>
                </form>
            </div>}

        </div>

    );
};

export {RestaurantsFilter};
