import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { user } from './reducers/user';
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";

const persistConfig = {
    key: 'aquora',
    storage,
}

const userReducers = combineReducers({
    user: user,
})

const persistedReducer = persistReducer(persistConfig, userReducers)

export default () => {
    let store = configureStore({reducer: persistedReducer})
    let persistor = persistStore(store)

    return { store, persistor }
}
