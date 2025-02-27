import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import store from "../store/store"


export default function ProtectedRoute({children, roles}){
  const navigate = useNavigate()
  const location = useLocation()

  const accessToken = store.getState().auth

  //console.log("token   ", accessToken)
  useEffect(()=>{
    if(accessToken == null){
      localStorage.setItem('redirectTo', location.pathname)
      navigate("/login")
    }
  },[accessToken, navigate, location.pathname])
  const role = localStorage.getItem("role")

  if(roles && !roles.includes(role)){
    navigate("/affiche")
  }
  return children
}