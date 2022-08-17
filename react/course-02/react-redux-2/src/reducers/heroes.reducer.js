import { ActionTypes } from "../actions"
import RemoteStatus from "../store/remote-status"

const initialState = {
    heroes: [],
    heroesRemoteStatus: RemoteStatus.Idle,
}

const heroesReducer = (state = initialState, action) => {
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
        default: return state
    }
}

export default heroesReducer;