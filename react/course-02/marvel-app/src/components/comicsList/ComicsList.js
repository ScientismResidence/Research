import './comicsList.scss';
import useMarvelService from '../../services/MarvelService';
import { useEffect, useState } from 'react';
import Spinner from '../ui/spinner/Spinner';
import { Link } from 'react-router-dom';

const ComicsList = () => {
    const [comics, setComics] = useState([]);
    const [offset, setOffset] = useState(0);
    const { isLoading, getComics } = useMarvelService();

    useEffect(() => {
        loadComics();
    }, []);

    const loadComics = () => {
        getComics(offset).then(updateComics)
    }

    const updateComics = (newComics) => {
        setComics((comics) => [...comics, ...newComics]);
        setOffset((offset) => offset + newComics.length);
    }

    const comicElements = comics.map((value, i) => {
        return (
            <li className="comics__item" key={i}>
                <Link to={`/comics/${value.id}`}>
                    <img src={value.thumbnail} alt={value.title} className="comics__item-img" />
                    <div className="comics__item-name">{value.title}</div>
                    <div className="comics__item-price">{value.price === 0 ? "Unavailable" : `${value.price}$`}</div>
                </Link>
            </li>
        );
    });

    return (
        <div className="comics__list">
            <ul className="comics__grid">
                {comicElements}
                {isLoading ? <Spinner/> : null}
            </ul>
            <button className="button button__main button__long" onClick={loadComics}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;