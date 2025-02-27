import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
  name: "auth",
  initialState: {
    username : null
  },
  reducers: {
    addUser: (state, action) =>{
      state.username = action.payload
      localStorage.setItem("accessToken", action.payload.accessToken)
      localStorage.setItem("refreshToken", action.payload.refreshToken)
    },
    deleteUser: (state) => {
      state.username = null
      localStorage.removeItem("accessToken")
      localStorage.removeItem("refreshToken")
    }
  }
})

export const {addUser, deleteUser } = authSlice.actions

ex