import { createEntityAdapter, createSlice } from "@reduxjs/toolkit"
import RemoteStatus from "./remote-status";

const heroFiltersAdapter = createEntityAdapter({
    selectId: model => model.name
});
const initialState = heroFiltersAdapter.getInitialState({
    heroesFilter: "all",
    filtersRemoteStatus: RemoteStatus.Idle
});

const { actions, reducer } = createSlice({
    name: "heroFilters",
    initialState,
    reducers: {
        filtersLoading: state =>
            { state.filtersRemoteStatus = RemoteStatus.Loading; },
        filtersLoaded: (state, action) => {
            heroFiltersAdapter.setAll(state, action.payload);
            state.filtersRemoteStatus = RemoteStatus.Loaded;
        },
        filtersLoadingError: state =>
            { state.filtersRemoteStatus = RemoteStatus.Error; },
        changeHeroFilter: (state, action) => 
            { state.heroesFilter = action.payload; }
    }
});

export default reducer;
export const { selectAll: filtersSelector } = heroFiltersAdapter.getSelectors(state => state.heroFilters);
export const {
    filtersLoading,
    filtersLoaded,
    filtersLoadingError,
    changeHeroFilter
} = actions;