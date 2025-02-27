import { createAsyncThunk } from "@reduxjs/toolkit";
import { addUser } from "../store/authSlice";
import { useNavigate } from "react-router";


export const loginThunk = createAsyncThunk('auth/login', async (loginInfo, {dispatch})=>{
  const navigate = useNavigate
  const response = await POST("/auth/login", loginInfo)
  if(response.success){
    const userSession = {username: loginInfo.username, accessToken: response.data.accessToken, refreshToken: response.data.refreshToken}
    dispatch(addUser)
  }
})