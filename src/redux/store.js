import persistReducer from "redux-persist/es/persistReducer"
import persistStore from "redux-persist/es/persistStore"
import {configureStore,combineReducers} from '@reduxjs/toolkit'

import authReducer from './auth/authSlice'
const authpersistConfig = {
    key: "auth",
    storage,
    whitelist: ["token"]
}

const rootReducer = combineReducers({
    auth: persistReducer(authpersistConfig, authReducer)
})

export const store = configureStore({
    reducer: rootReducer,
    middleWare: (getDefaultMiddleWare) =>
        getDefaultMiddleWare({
            serializableCheck: false
        })
})

export const persistor = persistStore(store)