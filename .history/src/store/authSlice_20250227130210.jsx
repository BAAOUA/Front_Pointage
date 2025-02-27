import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { POST } from "../services/APIService";

export const login = createAsyncThunk("auth/login", async (data, {dispatch}) => {
  const response = await POST("/auth/login", data)
  if(response.success){
    const userSession = {
      username: response.data.username, 
      role: response.data.role,
      accessToken: response.data.accessToken, 
      refreshToken: response.data.refreshToken
    }
    dispatch(addUser(userSession))
  }
  return response
  
})
export const logout = createAsyncThunk("auth/logout", async (data), {dispatch}) => {
  const response = await POST("/auth/logout")
  if(response.success){
    dispa
  }
  return response
})
export const refreshToken = createAsyncThunk("auth/refreshToken", async (refreshToken) => {
  const response = await POST('/auth/refresh-token', refreshToken)
  console.log(response)
  return response.data
})

const authSlice = createSlice({
  name: "auth",
  initialState: {
    authenticate: false,
    username : null,
    role: null,
    accessToken: null,
    refreshToken: null,
    erreurMessage: null,
    authenticate: false
  },
  reducers: {
    addUser: (state, action) =>{
      state.username = action.payload.username
      state.role = action.payload.role
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
    },
    deleteUser: (state) => {
      state.username = null
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
      .addCase(login.pending, (state) =>{
        state.authenticate = false
        state.erreurMessage = null
      })
      .addCase(login.fulfilled, (state, action)=>{
        if(action.payload.success){
          state.authenticate = true
        } else {
          state.authenticate = false
          state.erreurMessage = action.payload.message
        }
      })
      .addCase(logout.fulfilled, (state) =>{
        state.authenticate = false
      })
      .addCase(refreshToken.fulfilled, (state, action)=>{
        
      })
  }
})

export const { addUser, deleteUser, test } = authSlice.actions

export default authSlice.reducer