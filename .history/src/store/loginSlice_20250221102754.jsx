import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
  name: "auth",
  initialState: {
    username : null
  },
  reducers: {
    addUser
  }
})