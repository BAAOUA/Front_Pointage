import { createSlice } from "@reduxjs/toolkit";
import { loginThunk } from "../thunk/authThunk";


const authSlice = createSlice({
  name: "auth",
  initialState: {
    username : null
  },
  reducers: {
    addUser: (state, action) =>{
      console.log("data", action.payload)
      state.username = action.payload
      localStorage.setItem("accessToken", action.payload.accessToken)
      localStorage.setItem("refreshToken", action.payload.refreshToken)
    },
    deleteUser: (state) => {
      state.username = null
      localStorage.removeItem("accessToken")
      localStorage.removeItem("refreshToken")
    }
  },
  extraReducers: (builder)=>{
    builder
      .addCase(loginThunk.fulfilled, )
  }
})

export const {addUser, deleteUser } = authSlice.actions

export default authSlice.reducer