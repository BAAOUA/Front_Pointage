import { configureStore } from "@reduxjs/toolkit"
import employeeRedicer from "./employeeSlice"
import { persistReducer, persistStore } from "redux-persist"
import authReducer from "./authSlice"

const persisteConfig = {
  key: 'auth', 
  Storage,
  whitelist: ['auth']
}
const persistReducer = persistReducer(persisteConfig, authReducer)
const store = configureStore({
  reducer:{
    "employee": employeeRedicer,
    "auth": persistReducer
  }
})

export default store

export persistor = persistStore()