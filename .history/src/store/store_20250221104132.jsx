import { configureStore } from "@reduxjs/toolkit"
import employeeRedicer from "./employeeSlice"

const persisteReducer = {
  key: 'auth', 
  Storage,
  whitelist: ['auth']
}
const authRed
const store = configureStore({
  reducer:{
    "employee": employeeRedicer,
    "auth": 
  }
})

export default store