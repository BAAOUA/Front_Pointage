import { configureStore } from "@reduxjs/toolkit"
import employeeRedicer from "./employeeSlice"

const persisteConfig = {
  key: 'auth', 
  Storage,
  whitelist: ['auth']
}
const authReducer = pers
const store = configureStore({
  reducer:{
    "employee": employeeRedicer,
    "auth": 
  }
})

export default store