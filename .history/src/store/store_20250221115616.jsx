import { configureStore } from "@reduxjs/toolkit"
import employeeRedicer from "./employeeSlice"
import { persistReducer, persistStore } from "redux-persist"
import authReducer from "./authSlice"
import storage from 'redux-persist/lib/storage'
import { thunk } from "redux-thunk"

const persisteConfig = {
  key: 'root', 
  storage
}
const persistAuthReducer = persistReducer(persisteConfig, authReducer)
const store = configureStore({
  reducer:{
    employee: employeeRedicer,
    auth: persistAuthReducer
  },
  middleware: thunk
})

export const persistor = persistStore(store)

export default store