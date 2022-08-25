import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { useHttp } from "../hooks/http.hook";
import RemoteStatus from "./remote-status"

const initialState = {
    heroes: [],
    heroesRemoteStatus: RemoteStatus.Idle,
}

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
            { state.heroes.push(action.payload); },
        deleteHero: (state, action) => 
            { state.heroes = state.heroes.filter(value => value.id !== action.payload); }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadHeroes.pending, state =>
                { state.heroesRemoteStatus = RemoteStatus.Loading; })
            .addCase(loadHeroes.fulfilled, (state, action) => {
                console.log("fulfilled", action);
                state.heroesRemoteStatus = RemoteStatus.Loaded;
                state.heroes = action.payload;
            })
            .addCase(loadHeroes.rejected, (state, action) => {
                console.log("error", action);
                state = RemoteStatus.Error; 
            })
            .addDefaultCase(() => {});
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
