import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 } from 'uuid';
import { useHttp } from "../../hooks/http.hook";
import { useYupForm } from "../../hooks/use-yup-form";
import { filtersLoaded, filtersLoading, filtersLoadingError } from "../../store/hero-filters.slice";
import { addHero } from "../../store/heroes.slice";
import RemoteStatus from "../../store/remote-status";
import { getAddCharacterSchema } from "../../store/yup-schemes";
import Spinner from "../spinner/Spinner";
import FormErrorMessage from "../ui/error-message";

const HeroesAddForm = () => {
    const filters = useSelector(state => state.heroFilters.filters);
    const filtersRemoteStatus = useSelector(state => state.heroFilters.filtersRemoteStatus);
    
    const filterNames = useMemo(() => filters.map(value => value.name), [filters]);
    const { register, handleSubmit, reset, formState: { errors } } = useYupForm(getAddCharacterSchema(filterNames));
    const dispatch = useDispatch();

    const onSubmit = (data) => {
        const hero = {
            id: v4(),
            name: data.name,
            description: data.text,
            element: data.element
        }
        
        addHeroRequest("http://localhost:3001/heroes", "POST", hero)
            .then(data => {
                reset();
                dispatch(addHero(data));
            })
            .catch(error => console.log(error));
    }

    const { request: filtersRequest } = useHttp();
    const { request: addHeroRequest } = useHttp();

    useEffect(() => {
        dispatch(filtersLoading());
        filtersRequest("http://localhost:3001/filters")
            .then(data => dispatch(filtersLoaded(data)))
            .catch(() => dispatch(filtersLoadingError()));

        // eslint-disable-next-line
    }, []);

    const renderFilterElements = () => {
        return filters.map(value => {
            return <option key={value.name} value={value.name}>{value.label}</option>
        });
    }

    const renderFilters = () => {
        if (filtersRemoteStatus === RemoteStatus.Loading) {
            return <div className="align-self-center"><Spinner /></div>
        } else {
            return (
                <div>
                    <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                    <select
                        className="form-select"
                        {...register("element")}>
                        <option>Я владею элементом...</option>
                        {renderFilterElements()}
                    </select>
                    <FormErrorMessage name="element" errors={errors}/>
                </div>
            )
        }
    }

    return (
        <form
            className="border p-4 shadow-lg rounded d-flex flex-column"
            style={{gap: "20px"}}
            onSubmit={handleSubmit(onSubmit)}
        >
            <div>
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input
                    {...register("name")}
                    className="form-control"
                    placeholder="Как меня зовут?" />
                <FormErrorMessage name="name" errors={errors}/>
            </div>

            <div>
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    {...register("text")}
                    className="form-control"
                    placeholder="Что я умею?"
                    style={{ "height": '130px' }} />
                <FormErrorMessage name="text" errors={errors}/>
            </div>

            {renderFilters()}

            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;