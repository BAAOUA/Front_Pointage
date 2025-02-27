import { configureStore } from "@reduxjs/toolkit"
import employeeRedicer from "./employeeSlice"

const persiste reducer 
const store = configureStore({
  reducer:{
    "employee": employeeRedicer
  }
})

export default store