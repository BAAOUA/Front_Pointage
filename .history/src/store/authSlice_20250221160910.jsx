import { createSlice } from "@reduxjs/toolkit";
import { loginThunk } from "../thunk/authThunk";


const authSlice = createSlice({
  name: "auth",
  initialState: {
    username : null,
    role: null,
    accessToken: null,
    refreshToken: null
  },
  reducers: {
    addUser: (state, action) =>{
      console.log("add    ", action.payload)
      state.username = action.payload.username
      localStorage.setItem("role", action.payload.role)
      localStorage.setItem("accessToken", action.payload.accessToken)
      localStorage.setItem("refreshToken", action.payload.refreshToken)

      state.role = action.payload.role
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
    },
    deleteUser: (state) => {
      console.log("delete user    ")
      state.username = null
      localStorage.removeItem("role")
      localStorage.removeItem("accessToken")
      localStorage.removeItem("refreshToken")

      state.role = null
      state.accessToken = null
      state.refreshToken = null
    },
    refresh: (state, action)=>{
      console.log("refressh    ", action.payload)
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
    }
  }
})

export const { addUser, deleteUser, refresh } = authSlice.actions

export default authSlice.reducer