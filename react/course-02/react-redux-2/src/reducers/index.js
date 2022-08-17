import { ActionTypes } from "../actions"
import RemoteStatus from "../store/remote-status"

const initialState = {
    heroes: [],
    heroesRemoteStatus: RemoteStatus.Idle,
    heroesFilter: "all",
    filters: [],
    filtersRemoteStatus: RemoteStatus.Idle
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.HeroesLoading:
            return {
                ...state,
                heroesRemoteStatus: RemoteStatus.Loading
            }
        case ActionTypes.HeroesLoaded:
            return {
                ...state,
                heroes: action.payload,
                heroesRemoteStatus: RemoteStatus.Loaded
            }
        case ActionTypes.HeroesLoadingError:
            return {
                ...state,
                heroesRemoteStatus: RemoteStatus.Error
            }

        case ActionTypes.FiltersLoading:
            return {
                ...state,
                filtersRemoteStatus: RemoteStatus.Loading
            }
        case ActionTypes.FiltersLoaded:
            return {
                ...state,
                filters: action.payload,
                filtersRemoteStatus: RemoteStatus.Loaded
            }
        case ActionTypes.FiltersLoadingError:
            return {
                ...state,
                filtersRemoteStatus: RemoteStatus.Error
            }
        case ActionTypes.AddHero:
            return {
                ...state,
                heroes: [...state.heroes, action.payload]
            }
        case ActionTypes.DeleteHero:
            return {
                ...state,
                heroes: state.heroes.filter(value => value.id !== action.payload)
            }
        case ActionTypes.ChangeHeroFilter:
            return {
                ...state,
                heroesFilter: action.payload
            }
        default: return state
    }
}

export default reducer;