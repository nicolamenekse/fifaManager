import persistReducer from "redux-persist/es/persistReducer"
import persistStore from "redux-persist/es/persistStore"
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'

import authReducer from './auth/authSlice'
import matchReducer from "./match/matchSlice"
import scoreReducer from './scoreSlice'

const authpersistConfig = {
    key: "auth",
    storage,
    whitelist: ["token"]
}

const matchPersistConfig = {
    key:"match",
    storage,
    whiteList:["items"]
}

const scorePersistConfig = {
    key: "scores",
    storage,
    whitelist: ["players"]
}

const rootReducer = combineReducers({
    auth: persistReducer(authpersistConfig, authReducer),
    match: persistReducer(matchPersistConfig, matchReducer),
    scores: persistReducer(scorePersistConfig, scoreReducer)
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        })
})

export const persistor = persistStore(store)
