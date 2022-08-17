import { createStore, combineReducers, compose } from 'redux';

import heroesReducer from '../reducers/heroes.reducer';
import heroFiltersReducer from '../reducers/hero-filters.reducer';

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
    compose(enhancer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
);

export default store;