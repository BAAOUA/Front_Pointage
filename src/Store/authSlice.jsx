import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { navigateTo } from "../thunk/authThunk"
import { POST } from "../services/APIService"
import { data } from "react-router"

export const login = createAsyncThunk('login', async (loginInfo, thunkAPI)=>{
  const response = await POST("/auth/login", loginInfo)
  if(response.success){
    const userSession = {
      username: response.data.username, 
      role: response.data.role,
      accessToken: response.data.accessToken, 
      refreshToken: response.data.refreshToken
    }
    thunkAPI.dispatch(addUser(userSession))
    //thunkAPI.extra.navigate("/affiche")
    //console.log(thunkAPI.dispatch(navigateTo("/affiche")))
  } else {
    return thunkAPI.rejectWithValue(response.message)
  }
})
export const logout = createAsyncThunk('auth/logout', async (_,thunkAPI) => {
    const response = await POST('/auth/logout')
    if (response.success) {
      thunkAPI.dispatch(deleteUser())
    } else {
      return thunkAPI.rejectWithValue('Une erreur s\'est produite lors de la déconnexion.')
    }
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
  extraReducers: (builder)=>
    builder
        .addCase(login.fulfilled, (state, action) => {
          //console.log(action.payload)
        })
        .addCase(login.rejected, (state, action)=>{
          console.log("rejected   ")
        })
        .addCase(logout.fulfilled, (state, action)=>{
        })
        .addCase(logout.rejected, (state, action)=>{
          console.log("rejected   ")
        })
})

export const { addUser, deleteUser, refresh } = authSlice.actions

export default authSlice.reducer