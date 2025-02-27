import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
  name: "auth",
  initialState: {
    username : null,
    accessToken: null,
    refreshToken: null
  },
  reducers: {
    addUser: (state, action) =>{
      console.log("data", action.payload)
      state.username = action.payload.username
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
    },
    deleteUser: (state) => {
      state.username = null
      state.accessToken = null
      state.refreshToken = null
    }
  }
})

export const {addUser, deleteUser } = authSlice.actions

export default authSlice.reducer