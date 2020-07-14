import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSaga';

const persistConfig = {
  key: 'serviceScheduleMobile',
  storage: AsyncStorage,
  whitelist: ['auth', 'user'],
};

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  persistReducer(persistConfig, rootReducer),
  applyMiddleware(sagaMiddleware)
);

const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export { store, persistor };
