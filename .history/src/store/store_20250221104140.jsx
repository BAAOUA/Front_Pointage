import { configureStore } from "@reduxjs/toolkit"
import employeeRedicer from "./employeeSlice"

const persisteReducer = {
  key: 'auth', 
  Storage,
  whitelist: ['auth']
}
const authReducer = persisteReducer
const store = configureStore({
  reducer:{
    "employee": employeeRedicer,
    "auth": 
  }
})

export default store