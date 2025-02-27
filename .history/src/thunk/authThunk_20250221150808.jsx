import { createAsyncThunk } from "@reduxjs/toolkit";
import { addUser, deleteUser } from "../store/authSlice";
import { POST } from "../services/APIService";
import { setError } from "../store/employeeSlice";


export const loginThunk = (loginInfo, navigate)=> async (dispatch)=>{
  console.log("info    ", loginInfo)
  const response = await POST("/auth/login", loginInfo)
  if(response.success){
    console.log('-----   ', loginInfo)
    const userSession = {
      username: loginInfo.username, 
      accessToken: response.data.accessToken, 
      refreshToken: response.data.refreshToken
    }
    dispatch(addUser(userSession))
    navigate("/affiche")
  } else {
    alert(response.message)
  }
}
export const logoutThunk = (navigate)=> async (dispatch)=>{
  const response = await POST("/auth/logout")
    if(response.success){
      dispatch(deleteUser())
      navigate("/login")
    } else {
      alert("Une erreur s'est produite lors de la déconnexion.")
    }
}