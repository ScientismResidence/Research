import { createSlice } from "@reduxjs/toolkit"
import RemoteStatus from "./remote-status";

const initialState = {
    heroesFilter: "all",
    filters: [],
    filtersRemoteStatus: RemoteStatus.Idle
}

const { actions, reducer } = createSlice({
    name: "heroFilters",
    initialState,
    reducers: {
        filtersLoading: state =>
            { state.filtersRemoteStatus = RemoteStatus.Loading; },
        filtersLoaded: (state, action) => {
            state.filters = action.payload;
            state.filtersRemoteStatus = RemoteStatus.Loaded;
        },
        filtersLoadingError: state =>
            { state.filtersRemoteStatus = RemoteStatus.Error; },
        changeHeroFilter: (state, action) => 
            { state.heroesFilter = action.payload; }
    }
});

export default reducer;
export const {
    filtersLoading,
    filtersLoaded,
    filtersLoadingError,
    changeHeroFilter
} = actions;