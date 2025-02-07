import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { fetchEmployees, filtredEmployees, filtreParDate } from "../Store/employeeSlice"


export default function ListEmployees(){
  const dispatch = useDispatch()
  const {employees} = useSelector((state)=> state.employee)

  
  useEffect(()=>{
    dispatch(fetchEmployees())
  }, [])

  const onDateChange = (e)=>{
    const date = e.target.value
    if (date.length === 10) {
      dispatch(filtredEmployees(date))
    } else {
      console.log("date   ", date)
    }
  }
  return(
    <div className="container">
      <div className="row">
        <h3>Liste des employées</h3>
        <input style={{width:"300px"}} className="input-text" type="date" id="search"
          onBlur={(e)=>onDateChange(e)}
          placeholder="Votre nom d'utilisateur"
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