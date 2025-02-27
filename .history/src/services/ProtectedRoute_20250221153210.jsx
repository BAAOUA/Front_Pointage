import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"


export default function ProtectedRoute({children, roles}){
  const navigate = useNavigate()
  const location = useLocation()

  const accessToken = localStorage.getItem("accessToken")
  //console.log("token   ", accessToken)
  useEffect(()=>{
    if(accessToken == null){
      localStorage.setItem('redirectTo', location.pathname)
      navigate("/login")
    }
  },[accessToken, navigate, location.pathname])

  
  return children
}