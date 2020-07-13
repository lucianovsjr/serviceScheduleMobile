import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

import rootReducer from './modules/rootReducer';

const persistConfig = {
  key: 'serviceScheduleMobile',
  storage: AsyncStorage,
  whitelist: ['auth', 'user'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer);

const persistor = persistStore(store);

export { store, persistor };
