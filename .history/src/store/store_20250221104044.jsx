import { configureStore } from "@reduxjs/toolkit"
import employeeRedicer from "./employeeSlice"

const persisteReducer = {
  key: 'auth', 
  Storage,
  
}
const store = configureStore({
  reducer:{
    "employee": employeeRedicer
  }
})

export default store