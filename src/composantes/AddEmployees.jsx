import { useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { addEmployees } from "../Store/employeeSlice"
import { useNavigate } from "react-router"

export default function AddEmployees(){
  const dispatch = useDispatch()
  const navigate = useNavigate()
    const [fileName, setFileName] = useState(null)
  const {register, getValues, handleSubmit, formState: {errors}} = useForm()

  const {succes} = useSelector((state)=>state.employee)
  

  const onSubmit = async (data) =>{
    if(data.fichier){
      let formData = new FormData()
      formData.append("data",data.fichier[0])
      dispatch(addEmployees(formData))
      if(succes){
        navigate("/affiche")
      }
    }
  }

  return(
    <div className="container">
    <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-container">
            <div className="row">
              <h3>Ajouter un fichier excel</h3>
            </div>                 
            <div className="row">    
              <input className="input-text input-file" onChangeCapture={(e)=>{setFileName(e.target.value? e.target.value.split('\\').pop():null)}} 
                type="file" id="file"
                accept=".csv, .xls, .xlsx"
                {...register("fichier", {required: "Le fichier est obligatoire"})}
              />
              <label className="file-label" htmlFor="file" >{fileName == null? "Choisir un fichier :":fileName}</label>
              <span style={{color:"red"}}>{errors.file?.message}</span>
            </div>                  
            <div className="row">                
            <button type="submit">Envoyer</button>
            </div>
        </div>                
    </form>
  </div>
  )
}