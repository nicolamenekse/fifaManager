import persistReducer from "redux-persist/es/persistReducer"
// import persistStore from "redux-persist/es/persistStore"
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'

import authReducer from './auth/authSlice'
import matchReducer from "./match/matchSlice"

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

const rootReducer = combineReducers({
    auth: persistReducer(authpersistConfig, authReducer),
    match:persistReducer(matchPersistConfig, matchReducer )
})

export const store = configureStore({
    reducer: rootReducer,
    middleWare: (getDefaultMiddleWare) =>
        getDefaultMiddleWare({
            serializableCheck: false
        })
})

// export const persistor = persistStore(store)
