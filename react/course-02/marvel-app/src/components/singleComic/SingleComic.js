import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';
import Error from '../ui/error/Error';
import Spinner from '../ui/spinner/Spinner';

import './singleComic.scss';

const SingleComic = ({ id }) => {
    const [comic, setComic] = useState(null);
    const { isLoading, error, getComic } = useMarvelService();

    useEffect(() => {
        loadComic();
    }, [id]);

    const updateComic = (comic) => {
        setComic(comic);
    }

    const loadComic = () => {
        getComic(id).then(updateComic);
    }

    let content = null;
    if (error) {
        content = <Error />
    } else if (isLoading) {
        content = <Spinner />;
    } else if (comic) {
        content = (
            <div className="single-comic">
                <img src={comic.thumbnail} alt="x-men" className="single-comic__img" />
                <div className="single-comic__info">
                    <h2 className="single-comic__name">{comic.title}</h2>
                    <p className="single-comic__descr">{comic.description}</p>
                    <p className="single-comic__descr">{comic.pages} pages</p>
                    <div className="single-comic__price">{comic.price === 0 ? "Unavailable" : `${comic.price}$`}</div>
                </div>
                <Link to="/comics" className="single-comic__back">Back to all</Link>
            </div>
        )
    }

    return (
        <>
            {content}
        </>
    )
}

export default SingleComic;