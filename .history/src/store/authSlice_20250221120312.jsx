import { createSlice } from "@reduxjs/toolkit"
import { loginThunk } from "./authThunk" // Assure-toi que le thunk est correctement importé

// L'état initial de l'authentification
const initialState = {
  user: null, // L'utilisateur sera stocké ici une fois qu'il se connecte
  accessToken: null, // Le token d'accès
  refreshToken: null, // Le refresh token
  status: 'idle', // Le statut de la requête (idle, loading, succeeded, failed)
  error: null, // Pour gérer les erreurs
}

// Création du slice pour l'authentification
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Ajoute l'utilisateur à l'état (par exemple après un login réussi)
    addUser: (state, action) => {
      state.user = action.payload.username
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
    },
    // Pour réinitialiser l'état de l'authentification (log out)
    logout: (state) => {
      state.user = null
      state.accessToken = null
      state.refreshToken = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.status = "loading" // Pendant que la requête est en cours
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
