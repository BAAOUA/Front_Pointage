import React from "react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { addEmployees, clearMessages } from "../store/employeeSlice"
import { useNavigate } from "react-router-dom"

export default function AddEmployees(){
  const dispatch = useDispatch()
  const navigate = useNavigate()
    const [fileName, setFileName] = useState(null)
  const {register, handleSubmit, formState: {errors}} = useForm()

  const { success, successMessage, erreurMessage} = useSelector((state)=>state.employee)
  

  const onSubmit = async (data) =>{
    if(data.fichier){
      try{
        let formData = new FormData()
        formData.append("data",data.fichier[0])
        dispatch(addEmployees(formData))
    }catch(erreur){
      //console.log("errrrrrrrrrrrrr   ",erreurMessage)
    }
    }
  }
  useEffect(() => {
    if (success) {
      navigate("/affiche")
      
    }
  }, [success, navigate])

  useEffect(() => {
      let timeoutId
      if (successMessage || erreurMessage) {
        timeoutId = setTimeout(() => {
          dispatch(clearMessages())
        }, 8000) // 8 secondes
      }
      return () => clearTimeout(timeoutId)
    }, [dispatch, successMessage, erreurMessage])

  return(
    <div className="container">
      {successMessage !== null &&
        (<div className="row" style={{backgroundColor: "#d1ecf1", color: "#0c5460", maxWidth: "80%"}}>{successMessage}</div>)
      }
      {erreurMessage !== null &&
        (<div className="row" style={{backgroundColor: "#f8d7da", color: "#721c24", maxWidth: "80%"}}>{erreurMessage}</div>)
      }
      <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-container">
          
              <div className="row">
                <h3>Ajouter un fichier excel</h3>
              </div>                 
              <div className="row">    
                <input className="input-text input-file" onChangeCapture={(e)=>{setFileName(e.target.value? e.target.value.split('\\').pop():null)}} 
                  type="file" id="file" data-testid="file-input"
                  accept=".csv, .xls, .xlsx"
                  {...register("fichier", {required: "Le fichier est obligatoire"})}
                />
                <label className="file-label" data-testid="file-label" htmlFor="file" >{fileName == null? "Choisir un fichier :":fileName}</label>
                <span style={{color:"red"}}>{errors.fichier?.message}</span>
              </div>                  
              <div className="row">                
              <button type="submit">Envoyer</button>
              </div>
          </div>                
      </form>
  </div>
  )
}