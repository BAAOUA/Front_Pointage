import { createSlice } from "@reduxjs/toolkit";
import { loginThunk } from "../thunk/authThunk";


const authSlice = createSlice({
  name: "auth",
  initialState: {
    username : null,
    role: null
  },
  reducers: {
    addUser: (state, action) =>{
      console.log("data", action.payload)
      state.username = action.payload.username
      state.role = action.payload.role
      localStorage.setItem()
      localStorage.setItem("accessToken", action.payload.accessToken)
      localStorage.setItem("refreshToken", action.payload.refreshToken)
    },
    deleteUser: (state) => {
      state.username = null
      state.role = null
      localStorage.removeItem("accessToken")
      localStorage.removeItem("refreshToken")
    }
  }
})

export const { addUser, deleteUser } = authSlice.actions

export default authSlice.reducer