import { configureStore } from "@reduxjs/toolkit"
import employeeRedicer from "./employeeSlice"
import { persistReducer, persistStore } from "redux-persist"
import authReducer from "./authSlice"
import Storage from "redux-persist/lib/storage"

const persisteConfig = {
  key: 'auth', 
  localStorage,
  whitelist: ['auth']
}
const persistAuthReducer = persistReducer(persisteConfig, authReducer)
const store = configureStore({
  reducer:{
    "employee": employeeRedicer,
    "auth": persistAuthReducer
  }
})

export default store

export const persistor = persistStore(store)