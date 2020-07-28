import { createStore, applyMiddleware, compose } from 'redux';
import { AsyncStorage } from 'react-native';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import reducers from '../reducers/index'; //Import the reducer

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = createStore(
    persistedReducer,
    undefined,
    compose(applyMiddleware(thunk)),
);

export const persistor = persistStore(store);
