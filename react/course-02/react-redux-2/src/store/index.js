import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import ReduxThunk from "redux-thunk";

import heroesReducer from '../reducers/heroes.reducer';
import heroFiltersReducer from '../reducers/hero-filters.reducer';

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

const store = createStore(
    combineReducers({
        heroes: heroesReducer,
        heroFilters: heroFiltersReducer    
    }),
    compose(
        applyMiddleware(ReduxThunk, stringMiddleware),
        enhancer,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

export default store;