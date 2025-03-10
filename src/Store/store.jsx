import { configureStore } from "@reduxjs/toolkit"
import employeeRedicer from "./employeeSlice"
import { persistReducer, persistStore } from "redux-persist"
import authReducer from "./authSlice"
import storage from 'redux-persist/lib/storage'
import NavigateMiddleware, { navigateTo } from "../thunk/Services"

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
  /*
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      thunk: {
        extraArgument: {
          //navigate: navigateTo,
        }
      }
    })
    getDefaultMiddleware().concat(NavigateMiddleware)
  */
})
export default store
export const persistor = persistStore(store)

