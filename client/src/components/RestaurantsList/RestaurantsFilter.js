import {useForm} from "react-hook-form";
import {useState} from "react";

import {Dropdown} from "react-bootstrap";

import css from './RestaurantsList.module.css'

const RestaurantsFilter = ({setBillFilter, setRatingFilter, setTagsFilter}) => {

    const {register, handleSubmit} = useForm()

    const submit = async (data) => {
        setRatingFilter([data.ratingMin ==='' ? 0 : data.ratingMin, data.ratingMax===''? 5 : data.ratingMax])
        setBillFilter([data.billMin ==='' ? 0 : data.billMin, data.billMax === '' ? 100000 : data.billMax])
        setTagsFilter(data.tags)
    }

    const [filterIsOpen, setFilterIsOpen] = useState(false)

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

    )
}

export {RestaurantsFilter}
