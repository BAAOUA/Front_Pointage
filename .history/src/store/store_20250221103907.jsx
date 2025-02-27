import { configureStore } from "@reduxjs/toolkit"
import employeeRedicer from "./employeeSlice"

const 
const store = configureStore({
  reducer:{
    "employee": employeeRedicer
  }
})

export default store