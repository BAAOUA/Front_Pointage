import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { POST } from "../services/APIService";

export const login = createAsyncThunk("auth/login", async (data) => {
  const response = await POST("/auth/login", data)
  return response
})
export const logout = createAsyncThunk("auth/logout", async (data) => {
  const response = await POST("/auth/logout")
  return response
})
export const refreshToken = createAsyncThunk("auth/refreshToken", async (data) => {
  const response = await POST("/auth/login", data)
  return response
})

const authSlice = createSlice({
  name: "auth",
  initialState: {
    authenticate: false,
    username : null,
    role: null,
    accessToken: null,
    refreshToken: null
  },
  extraReducers: (builder)=>{
    builder
    .addCase(login.pending, (state) =>{
      state.authenticate = false
    })
      .addCase(login.fulfilled, (state, action)=>{
        if(action.payload.success){
          state.authenticate = true
          state.username = action.payload.data.username
          state.role = action.payload.data.role
          state.accessToken = action.payload.data.accessToken
          state.refreshToken = action.payload.data.refreshToken
        } else {
          state.authenticate = false
        }
      })
      .addCase(logout.fulfilled, (state) =>{
        state.authenticate = false
        state.username = null
        state.role = null
        state.accessToken = null
        state.refreshToken = null
      })
      .addCase(refreshToken.fulfilled, (state, action)=>{
        state.accessToken = action.payload.accessToken
        state.refreshToken = action.payload.refreshToken
      })
  }
})

export const { addUser, deleteUser, refresh } = authSlice.actions

export default authSlice.reducer