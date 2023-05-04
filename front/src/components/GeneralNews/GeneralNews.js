/* eslint-disable react-hooks/exhaustive-deps */
import {useNavigate, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useState} from 'react';

import {generalNewsActions} from '../../redux';
import {roles} from '../../constants';
import API_URL from '../../config';
import {NewsUpdate} from '../NewsUpdate/NewsUpdate';
import css from '../NewsForAdmin/NewsForAdmin.module.css';

const GeneralNews = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams();
    const {role} = useSelector(state => state.auth);
    const {newsOne} = useSelector(state => state.generalNews);
    const {title, content, newsImage, category, createdAt} = newsOne;
    const [confirmDelete, setConfirmDelete] = useState(false);

    useEffect(() => {
        dispatch(generalNewsActions.getById(id));
    }, [dispatch]);

    const clickDelete = async () => {
        const {error} = await dispatch(generalNewsActions.deleteById(id));
        if (!error) navigate(-1);
    };

    return (
        <div>
            <div className={css.Header}>
                <div><h2>{title}</h2></div>
                {role.includes(roles.SUPER_ADMIN) &&
                    <div>
                        <div>
                            <NewsUpdate news={newsOne}/>
                        </div>
                        <div>
                            <div className={css.Del}
                                 onClick={() => setConfirmDelete(true)}> Видалити новину
                            </div>
                            {confirmDelete &&
                                <div>
                                    <p style={{color: 'red'}}> Ви упевнені що хочете видалити цю новину?</p>
                                    <button onClick={clickDelete}>Так</button>
                                    <button onClick={() => setConfirmDelete(false)}>Ні</button>
                                </div>}
                        </div>
                    </div>}
            </div>
            <div className={css.News}>
                <div>
                    {newsImage && <img width={300} src={API_URL + newsImage} alt={'зображення у новині'}/>}
                </div>
                <div className={css.Body}>
                    <p>{category}</p>
                    <p style={{marginBottom: 0}}>опубліковано {createdAt?.slice(0, 10)}</p>
                    <hr/>
                    <p>{content}</p>
                </div>
            </div>


        </div>
    );
};

export {GeneralNews};
