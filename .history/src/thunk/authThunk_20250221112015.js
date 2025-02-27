import { createAsyncThunk } from "@reduxjs/toolkit";
import { addUser } from "../store/authSlice";
import { useNavigate } from "react-router";
import { POST } from "../services/APIService";


export const loginThunk = (loginInfo)=> async (dispatch)=>{
  //const navigate = useNavigate()
  console.log("info    ", loginInfo)
  const response = await POST("/auth/login", loginInfo)
  if(response.success){
    const userSession = {username: loginInfo.username, accessToken: response.data.accessToken, refreshToken: response.data.refreshToken}
    dispatch(addUser(us))
  }
}