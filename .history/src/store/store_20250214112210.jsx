import { configureStore } from "@reduxjs/toolkit";
import employeeRedicer from "./employeeSlice"

const store = configureStore({
  reducer:{
    "employee": employeeRedicer
  }
})

export default store