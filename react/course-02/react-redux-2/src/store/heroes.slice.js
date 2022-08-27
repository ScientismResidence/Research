import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit"
import { useHttp } from "../hooks/http.hook";
import RemoteStatus from "./remote-status"

const heroesAdapter = createEntityAdapter();
const initialState = heroesAdapter.getInitialState({
    heroesRemoteStatus: RemoteStatus.Idle
});

export const loadHeroes = createAsyncThunk(
    "heroes.loadHeroes",
    async () => {
        const request = useHttp();
        return await request("http://localhost:3001/heroes");
    }
);

const { actions, reducer } = createSlice({
    name: "heroes",
    initialState,
    reducers: {
        addHero: (state, action) =>
            { heroesAdapter.addOne(state, action.payload); },
        deleteHero: (state, action) => 
            { heroesAdapter.removeOne(state, action.payload); }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadHeroes.pending, state =>
                { state.heroesRemoteStatus = RemoteStatus.Loading; })
            .addCase(loadHeroes.fulfilled, (state, action) => {
                state.heroesRemoteStatus = RemoteStatus.Loaded;
                heroesAdapter.setAll(state, action.payload);
            })
            .addCase(loadHeroes.rejected, (state, action) => {
                state = RemoteStatus.Error; 
            })
            .addDefaultCase(() => {});
    }
})

export default reducer;
export const { selectAll: heroesSelector } = heroesAdapter.getSelectors(state => state.heroes);
export const {
    heroesLoading,
    heroesLoaded,
    heroesLoadingError,
    addHero,
    deleteHero
} = actions;
