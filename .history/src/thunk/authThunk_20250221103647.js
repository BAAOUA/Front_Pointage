import { createAsyncThunk } from "@reduxjs/toolkit";


export const login = createAsyncThunk('auth/login', async (loginInfo, {dispatch})=>{
  const response = await POST("/auth/login", loginInfo)
  if(response.success){
    const userSession = {username: loginInfo.username, accessToken: response.data.accessToken, refreshToken: response.data.refreshToken}
    
  }
})