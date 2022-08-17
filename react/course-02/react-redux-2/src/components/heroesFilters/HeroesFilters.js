
// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

import { useDispatch, useSelector } from "react-redux";
import { changeHeroFilter } from "../../actions";

const HeroesFilters = () => {
    const filters = useSelector(state => state.filters);
    const heroesFilter = useSelector(state => state.heroesFilter);
    const dispatch = useDispatch();

    const allFilters = [{ name: "all", label: "All" }, ...filters];
    const filtersView = allFilters.map(value => {
        return {
            ...value,
            isActive: heroesFilter === value.name
        }
    });

    const filterElements = filtersView.map(value => {
        return (
            <button 
                key={value.name}
                className={`btn btn-outline-dark ${value.isActive ? "active" : ""}`}
                onClick={() => onClick(value.name)}
            >
                {value.label}
            </button>
        )
    });

    const onClick = (filter) => {
        dispatch(changeHeroFilter(filter));
    }

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    
                    {filterElements}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;