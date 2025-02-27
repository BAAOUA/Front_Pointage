import { createAsyncThunk } from "@reduxjs/toolkit";
import { addUser } from "../store/authSlice";
import { POST } from "../services/APIService";


export const login = (loginInfo, navigate)=> async (dispatch)=>{
  console.log("info    ", loginInfo)
  const response = await POST("/auth/login", loginInfo)
  if(response.success){
    const userSession = {
      username: loginInfo.username, 
      accessToken: response.data.accessToken, 
      refreshToken: response.data.refreshToken
    }
    dispatch(addUser(userSession))
    navigate("/affiche")
  }
}