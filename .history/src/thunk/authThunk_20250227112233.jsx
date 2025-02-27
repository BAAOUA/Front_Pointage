import { createAsyncThunk } from "@reduxjs/toolkit";
import { addUser, deleteUser } from "../store/authSlice";
import { POST } from "../services/APIService";

export const loginThunk = createAsyncThunk("auth/login", async ()=>{
  const response = await POST("/auth/login", loginInfo)
} )
export const d = (loginInfo, navigate)=> async (dispatch)=>{
  const response = await POST("/auth/login", loginInfo)
  if(response.success){
    const userSession = {
      username: response.data.username, 
      role: response.data.role,
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