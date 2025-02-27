import React, { useEffect } from "react"
import { useForm } from "react-hook-form"
import { POST } from "../services/APIService"
import { useNavigate } from "react-router-dom"
import { loginThunk } from "../thunk/authThunk"
import { useDispatch, useSelector } from "react-redux"
import { clearMessage, login } from "../store/authSlice"

export default function Login(){
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {register, handleSubmit, formState: {errors}} = useForm()
  const authenticate = useSelector((state)=> state.auth.authenticate)
  const erreur = useSelector((state)=> state.auth.erreurMessage)
  const onSubmit = async (data)=>{
    //dispatch(loginThunk(data, navigate))
    dispatch(login(data))
  }

  useEffect(()=>{
    console.log("hhhh   ", erreur)
    if(authenticate){
      const url = localStorage.getItem('redirectTo') == null? "/affiche": localStorage.getItem('redirectTo')
      navigate(url)
    }
    if(!authenticate && erreur != null){
      alert(erreur)
    }
  },[authenticate, erreur, dispatch])

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(clearMessage());
    }, 3000);
  
    return () => clearTimeout(timer); 
  }, [dispatch, erreur]);
  

  return(
    <div className="container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-container ">
          <div className="row">
            <h3>Information de login</h3>
          </div>
          <div className="row">       
            <label htmlFor="username">Non d'utilisateur</label>
            <input className="input-text" type="text" id="username" 
              placeholder="Votre nom d'utilisateur"
              {...register("username", {required:"Vous devez saissir votre nom d'utilisateur"})}
            />
            <span style={{color: "red"}}>{errors.username?.message}</span>
          </div>
          <div className="row">       
            <label htmlFor="password">Mot de passe</label>
            <input className="input-text" type="password" id="password" 
              placeholder="Votre mot de passe"
              {...register("password", {required:"Vous devez saissir votre mot de passe", minLength: {value:4, message:"Votre mot de passe est plus court"}, maxLength:12})}
            />
            <span style={{color: "red"}}>{errors.password?.message}</span>
          </div>                 
          <div className="row">                
            <button type="submit">Se connecter</button>
          </div> 
        </div>                    
      </form>
    </div>
  )
}