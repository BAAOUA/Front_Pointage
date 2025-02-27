import { configureStore } from "@reduxjs/toolkit"
import employeeRedicer from "./employeeSlice"
import { persistReducer } from "redux-persist"

const persisteConfig = {
  key: 'auth', 
  Storage,
  whitelist: ['auth']
}
const authReducer = persistReducer(persisteConfig,)
const store = configureStore({
  reducer:{
    "employee": employeeRedicer,
    "auth": 
  }
})

export default store