import { ActionTypes } from "../actions"
import RemoteStatus from "../store/remote-status"

const initialState = {
    heroesFilter: "all",
    filters: [],
    filtersRemoteStatus: RemoteStatus.Idle
}

const heroFiltersReducer = (state = initialState, action) => {
    switch (action.type) {
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
        case ActionTypes.ChangeHeroFilter:
            return {
                ...state,
                heroesFilter: action.payload
            }
        default: return state
    }
}

export default heroFiltersReducer;