import { createSlice } from "@reduxjs/toolkit"
import { loginThunk } from "./authThunk" // Assure-toi que le thunk est correctement importé

// L'état initial de l'authentification
const initialState = {
  user: null, // L'utilisateur sera stocké ici une fois qu'il se connecte
  accessToken: null,
  refreshToken: null,
  status: 'idle',
  error: null, 
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload.username
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
    },
    logout: (state) => {
      state.user = null
      state.accessToken = null
      state.refreshToken = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.status = "loading"
        state.error = null
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.status = "succeeded"
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message 
      })
  },
})

export const { addUser, logout } = authSlice.actions // Exporte les actions pour les utiliser ailleurs

export default authSlice.reducer
