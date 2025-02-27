import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom"
import { POST } from "../services/APIService"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

export default function Principale(){
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const logout = async ()=>{
    
    const response = await POST("/auth/logout")
    if(response.success){
    alert("Déconnexion réussie. ")
    localStorage.clear()
    navigate("/login")
    } else {
      alert("Une erreur s'est produite lors de la déconnexion.")
    }
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