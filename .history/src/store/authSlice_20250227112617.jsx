import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const login = createAsyncThunk("auth/login", async (data) => {
  const response = await POST("/auth/login", data)
  return response
})

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
      state.username = action.payload.username
      localStorage.setItem("role", action.payload.role)
      localStorage.setItem("accessToken", action.payload.accessToken)
      localStorage.setItem("refreshToken", action.payload.refreshToken)

      state.role = action.payload.role
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
    },
    deleteUser: (state) => {
      state.username = null
      localStorage.removeItem("role")
      localStorage.removeItem("accessToken")
      localStorage.removeItem("refreshToken")

      state.role = null
      state.accessToken = null
      state.refreshToken = null
    },
    refresh: (state, action)=>{
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
    }
  },
  extraReducers: (builder)=>{
    builder
      .addCase(login.fulfilled, (sta))
  }
})

export const { addUser, deleteUser, refresh } = authSlice.actions

export default authSlice.reducer