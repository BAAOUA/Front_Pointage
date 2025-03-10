import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom"
import { POST } from "../services/APIService"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { logoutThunk } from "../thunk/authThunk"
import { logout } from "../store/authSlice"

export default function Principale(){
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((state)=> state.auth)
  const onLogout = async ()=>{
    //dispatch(logoutThunk(navigate))
    dispatch(logout())
      .unwrap()
      .then(() => {
        navigate('/login');
      })
      .catch((error) => {
        alert(error)
      });
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
      <a onClick={()=>{onLogout()}} style={{cursor: "pointer", backgroundColor: "white", color: "red",position: "absolute", left:"90%",top:"10px" ,float: "left"}}>Logout</a>
      </header>
      <main>
        <Outlet/>
      </main>
    </>
  )
}