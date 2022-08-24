import { createSlice } from "@reduxjs/toolkit"
import RemoteStatus from "./remote-status"

const initialState = {
    heroes: [],
    heroesRemoteStatus: RemoteStatus.Idle,
}

const { actions, reducer } = createSlice({
    name: "heroes",
    initialState,
    reducers: {
        heroesLoading: state =>
            { state.heroesRemoteStatus = RemoteStatus.Loading },
        heroesLoaded: (state, action) => { 
            state.heroes = action.payload;
            state.heroesRemoteStatus = RemoteStatus.Loaded;
        },
        heroesLoadingError: state =>
            { state.heroesRemoteStatus = RemoteStatus.Error },
        addHero: (state, action) =>
            { state.heroes.push(action.payload); },
        deleteHero: (state, action) => 
            { state.heroes = state.heroes.filter(value => value.id !== action.payload); }
    }
})

export default reducer;
export const {
    heroesLoading,
    heroesLoaded,
    heroesLoadingError,
    addHero,
    deleteHero
} = actions;
