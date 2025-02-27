import { createAsyncThunk } from "@reduxjs/toolkit";
import { addUser } from "../store/authSlice";
import { useNavigate } from "react-router";
import { POST } from "../services/APIService";
import { setError } from "../store/employeeSlice";


export const loginThunk = (loginInfo, navigate)=> async (dispatch)=>{
  console.log("info    ", loginInfo)
  try{
    const response = await POST("/auth/login", loginInfo)
    if(response.success){
      const userSession = {username: loginInfo.username, accessToken: response.data.accessToken, refreshToken: response.data.refreshToken}
      dispatch(addUser(userSession))
      dispatch(setError("hhhhhhhhhhhhhhhhhhhhhhh"))
      navigate("/affiche")
    }
  
}