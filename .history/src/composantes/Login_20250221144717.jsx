import React from "react"
import { useForm } from "react-hook-form"
import { POST } from "../services/APIService"
import { useNavigate } from "react-router-dom"
import { loginThunk } from "../thunk/authThunk"
import { useDispatch, useSelector } from "react-redux"

export default function Login(){
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {register, handleSubmit, formState: {errors}} = useForm()

  const {employees, successMessage} = useSelector((state)=> state.employee)
  const { erreurMessage } = useSelector((state)=> state.emmployee)
  const onSubmit = async (data)=>{
    dispatch(loginThunk(data, navigate))
    console.log('____________   ', erreurMessage)
    /*
    const response = await POST("/auth/login", data)
    if(response.success){
      localStorage.setItem("accessToken", response.data.accessToken)
      localStorage.setItem("refreshToken", response.data.refreshToken)
      const url = localStorage.getItem('redirectTo') == null? "/affiche": localStorage.getItem('redirectTo')
      navigate(url)
    } else {
      alert(response.message)
    }*/
  }

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