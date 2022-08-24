// Classic way of store creation
//import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { configureStore } from "@reduxjs/toolkit";

// Classic reducers
//import heroesReducer from '../reducers/heroes.reducer';
//import heroFiltersReducer from '../reducers/hero-filters.reducer';
import heroes from "./heroes.slice";
import heroFilters from "./hero-filters.slice";

const stringMiddleware = ({dispatch, getState}) => (next) => (action, ...args) => {
    if (typeof action === 'string') {
        return next({
            type: action,
            ...args
        });
    }

    return next(action);
}

const enhancer = (createStore) => (...args) => {
    const store = createStore(...args);
    const originalDispatch = store.dispatch;

    store.dispatch = (action, ...dispatchArgs) => {
        if (typeof action === 'string') {
            return originalDispatch({
                type: action,
                ...dispatchArgs
            });
        }

        return originalDispatch(action);
    }

    return store;
}

const store = configureStore({
    reducer: {
        heroes,
        heroFilters  
    },
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), stringMiddleware],
    enhancers: [enhancer],
    devTools: process.env.NODE_ENV === "development"
});

// Classic way of store creation
/*const store = createStore(
    combineReducers({
        heroes: heroesReducer,
        heroFilters: heroFiltersReducer    
    }),
    compose(
        applyMiddleware(ReduxThunk, stringMiddleware),
        enhancer,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);*/

export default store;
