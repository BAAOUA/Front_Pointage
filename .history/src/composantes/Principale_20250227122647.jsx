import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom"
import { POST } from "../services/APIService"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loginThunk, logoutThunk } from "../thunk/authThunk"
import { logout } from "../store/authSlice"

export default function Principale(){
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const authenticate = useSelector((state)=> state.auth.authenticate)
  const onLogout = async ()=>{
    dispatch(logout())
    
  }
  useEffect(()=>{
    if(!authenticate){
      const url = localStorage.getItem('redirectTo') == null? "/login": localStorage.getItem('redirectTo')
      navigate(url)
    }
  },[authenticate, dispatch])

  const location = useLocation()
  useEffect(()=>{
    if (location.pathname === "/") {
      navigate("/affiche")
    }
  },[])
  return(
    <>
      <header className="app-header">
      <ul>
          <li><NavLink className={({isActive})=>(isActive? "active":"")} to="/ajouter">Ajouter</NavLink></li>
          <li><NavLink className={({isActive})=>(isActive? "active":"")} to="/affiche">Affiche</NavLink></li>
      </ul>
      <a onClick={()=>{onLogout()}} style={{cursor: "pointer", backgroundColor: "white", color: "red",position: "absolute", left:"90%",top:"10px" ,float: "left"}}>Logout</a>
      </header>
      <main>
        <Outlet/>
      </main>
    </>
  )
}