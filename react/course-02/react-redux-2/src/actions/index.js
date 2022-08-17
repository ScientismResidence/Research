export class ActionTypes {
    static HeroesLoading = "HeroesLoading";
    static HeroesLoaded = "HeroesLoaded";
    static HeroesLoadingError = "HeroesLoadingError"
    static FiltersLoading = "FiltersLoading";
    static FiltersLoaded = "FiltersLoaded";
    static FiltersLoadingError = "FilterLoadingError";
    static AddHero = "AddHero";
    static DeleteHero = "DeleteHero";
    static ChangeHeroFilter = "ChangeHeroFilter";
}

export const heroesLoading = () => {
    return {
        type: ActionTypes.HeroesLoading
    }
}

export const heroesLoaded = (heroes) => {
    return {
        type: ActionTypes.HeroesLoaded,
        payload: heroes
    }
}

export const heroesLoadingError = () => {
    return {
        type: ActionTypes.HeroesLoadingError
    }
}

export const filtersLoading = () => {
    return {
        type: ActionTypes.FiltersLoading
    }
}

export const filtersLoaded = (filters) => {
    return {
        type: ActionTypes.FiltersLoaded,
        payload: filters
    }
}

export const filtersLoadingError = () => {
    return {
        type: ActionTypes.FiltersLoadingError
    }
}

export const addHero = (hero) => {
    return {
        type: ActionTypes.AddHero,
        payload: hero
    }
}

export const deleteHero = (id) => {
    return {
        type: ActionTypes.DeleteHero,
        payload: id
    }
}

export const changeHeroFilter = (filter) => {
    return {
        type: ActionTypes.ChangeHeroFilter,
        payload: filter
    }
}