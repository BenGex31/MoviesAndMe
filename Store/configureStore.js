import { createStore } from 'redux';
import togglefavorite from './Reducers/favoriteReducer';
import storage from 'redux-persist/lib/storage';

export default createStore(togglefavorite);
