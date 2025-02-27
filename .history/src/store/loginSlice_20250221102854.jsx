import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
  name: "auth",
  initialState: {
    username : null
  },
  reducers: {
    addUser: (state, action) =>{
      state.username = action.payload
      localStorage.setItem()
    }
  }
})