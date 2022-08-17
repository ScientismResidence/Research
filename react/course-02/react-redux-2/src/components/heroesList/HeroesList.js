import { useHttp } from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { heroesLoading, heroesLoaded, heroesLoadingError } from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';
import RemoteStatus from '../../store/remote-status';

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {
    const heroes = useSelector(state => state.heroes);
    const heroesFilter = useSelector(state => state.heroesFilter);
    const heroesRemoteStatus = useSelector(state => state.heroesRemoteStatus)
    const dispatch = useDispatch();

    const filteredHeroes = heroes.filter(value => {
        if (heroesFilter !== "all") {
            return value.element === heroesFilter;
        } else {
            return true;
        }
    });

    const { request } = useHttp(
        "http://localhost:3001/heroes",
        data => {
            dispatch(heroesLoaded(data))
        },
        error => dispatch(heroesLoadingError())
    );

    useEffect(() => {
        dispatch(heroesLoading());
        request();

        // eslint-disable-next-line
    }, []);

    if (heroesRemoteStatus === RemoteStatus.Loading) {
        return <Spinner />;
    } else if (heroesRemoteStatus === RemoteStatus.Error) {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }

        return arr.map(({ id, ...props }) => {
            return <HeroesListItem key={id} id={id} {...props} />
        })
    }

    const elements = renderHeroesList(filteredHeroes);
    return (
        <ul>
            {elements}
        </ul>
    )
}

export default HeroesList;