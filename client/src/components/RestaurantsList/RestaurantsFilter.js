import {useForm} from "react-hook-form";
import {restaurantActions} from "../../redux";
import {Dropdown} from "react-bootstrap";
import {useState} from "react";


const RestaurantsFilter = ({setBillFilter, setRatingFilter, setTagsFilter}) => {

    const {register, handleSubmit} = useForm()

    const submit = async (data) => {
        setRatingFilter([data.ratingMin ==='' ? 0 : data.ratingMin, data.ratingMax===''? 5 : data.ratingMax])
        setBillFilter([data.billMin ==='' ? 0 : data.billMin, data.billMax === '' ? 100000 : data.billMax])
        setTagsFilter(data.tags)
        // setFilterIsOpen(false)
    }

    const [filterIsOpen, setFilterIsOpen] = useState(false)

    return (<div>
            <div>
                <Dropdown>
                    <Dropdown.Toggle>{'Фільтр'}</Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => setFilterIsOpen(true)}>Відкрити фільтр</Dropdown.Item>
                        <Dropdown.Item onClick={() => setFilterIsOpen(false)}>Згорнути фільтр</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            { filterIsOpen &&
                <div>
                <form onSubmit={handleSubmit(submit)}>
                    <label>Рейтинг від 1 до 5
                        <input type={'number'}  {...register('ratingMin')}/>
                        <input type={'number'}  {...register('ratingMax')}/>
                    </label>
                    <br/>
                    <label>Середній чек від...до...
                        <input type={'number'}  {...register('billMin')}/>
                        <input type={'number'}  {...register('billMax')}/>
                    </label>
                    <br/>
                    <label>Теги (через кому)
                        <input type={'text'}  {...register('tags')}/>
                    </label>
                    <br/>
                    <button>Відфільтрувати</button>
                </form>
            </div>}

        </div>

    )
}
// categoriesFilter: ['рейтинг','середній чек','теги']

export {RestaurantsFilter}
