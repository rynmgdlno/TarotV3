import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import composerReducer from './composer/composer.reducer.js'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['composer']
};

const rootReducer = combineReducers({
  composer: composerReducer
});

export default persistReducer(persistConfig, rootReducer);