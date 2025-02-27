import { configureStore } from "@reduxjs/toolkit"
import employeeRedicer from "./employeeSlice"
import { persistReducer } from "redux-persist"
import authReducer from "./authSlice"

const persisteConfig = {
  key: 'auth', 
  Storage,
  whitelist: ['auth']
}
const Reducer = persistReducer(persisteConfig, authReducer)
const store = configureStore({
  reducer:{
    "employee": employeeRedicer,
    "auth": 
  }
})

export default store