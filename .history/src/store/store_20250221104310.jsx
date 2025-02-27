import { configureStore } from "@reduxjs/toolkit"
import employeeRedicer from "./employeeSlice"
import { persistReducer } from "redux-persist"

const persisteConfig = {
  key: 'auth', 
  Storage,
  whitelist: ['auth']
}
const persistReducer = persistReducer(persisteConfig, authREducer)
const store = configureStore({
  reducer:{
    "employee": employeeRedicer,
    "auth": 
  }
})

export default store