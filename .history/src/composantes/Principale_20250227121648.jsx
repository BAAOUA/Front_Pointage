import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom"
import { POST } from "../services/APIService"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loginThunk, logoutThunk } from "../thunk/authThunk"

export default function Principale(){
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((state)=> state.auth)
  const logout = async ()=>{
    //dispatch(logoutThunk(navigate))
    dis
  }
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
      <a onClick={()=>{logout()}} style={{cursor: "pointer", backgroundColor: "white", color: "red",position: "absolute", left:"90%",top:"10px" ,float: "left"}}>Logout</a>
      </header>
      <main>
        <Outlet/>
      </main>
    </>
  )
}