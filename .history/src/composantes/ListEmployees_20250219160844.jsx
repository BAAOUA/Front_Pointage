import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { fetchEmployees, clearMessages } from "../store/employeeSlice"
import Row from "./Row"


export default function ListEmployees(){
  const dispatch = useDispatch()
  const {employees, successMessage, erreurMessage} = useSelector((state)=> state.employee)

  
  useEffect(()=>{
    dispatch(fetchEmployees())
  }, [dispatch])

  const onDateChange = (e)=>{
    const date = e.target.value   
    if (date.length === 10 && new Date(date).getFullYear().toString().length === 4) {
      dispatch(fetchEmployees(date))
    } else {
      dispatch(fetchEmployees())
    }
  }

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
      <div className="row">
        <h3>Liste des employées</h3>
        <input style={{width:"300px"}} className="input-text" data-testid="file-input" type="date" id="search"
          onChange={(e)=>onDateChange(e)}
        />
      </div>
      <div className="row">
        <table>
          <thead>
            <tr>
              <th style={{width:"20px"}}></th>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Date</th>
              <th>Heurs d'entrée</th>
              <th>Heurs de sortie</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp, index)=>(

              <Row emp={emp} index={index}
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{emp.nom}</td>
                <td>{emp.prenom}</td>
                <td>{emp.date}</td>
                <td>{emp.heureEntree}</td>
                <td>{emp.heureSortie}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}