import React from "react"
import { render, screen, waitFor } from "@testing-library/react"
import ListEmployees from "../ListEmployees"
import { useDispatch, useSelector } from "react-redux"
import userEvent from "@testing-library/user-event"
import { fetchEmployees } from "../../store/employeeSlice"

jest.mock('react-redux', ()=>({
  useDispatch: jest.fn(),
  useSelector: jest.fn()
}))
describe('Test de la table d\'affichage', ()=>{
  let dispatch
  beforeEach(()=>{
    dispatch = jest.fn()
    useDispatch.mockReturnValue(dispatch)
  })
  test('Chargement de la page', ()=>{
    useSelector.mockReturnValue({
      employees: [],
      successMessage: null,
      erreurMessage: null,
    })
    render(<ListEmployees/>)

    expect(screen.getByTestId("file-input")).toBeInTheDocument()
    expect(screen.getByRole("table")).toBeInTheDocument()
    const rows = screen.getAllByRole('row')
    expect(rows).toHaveLength(1)
  })
  test('Chargement du table avec des elements', ()=>{
    useSelector.mockReturnValue({
      employees: [
        {id: 1, nom: "baaoua", prenom: "brahim", date: "2024-01-14", heureEntree: "08:45:15", heureSortie: "16:32:14"},
        {id: 2, nom: "nom", prenom: "prenom", date: "2024-01-14", heureEntree: "08:45:15", heureSortie: "16:32:14"}
      ],
      successMessage: null,
      erreurMessage: null,
    })
    render(<ListEmployees/>)

    const rows = screen.getAllByRole('row')
    expect(rows).toHaveLength(3)
    const row = rows[1].querySelectorAll('td')
    expect(rows[1].querySelectorAll('td')[0]).toHaveTextContent("baaoua")
    expect(rows[2].querySelectorAll('td')[1]).toHaveTextContent("prenom")
  })
  test('chagement de date incomplete', async ()=>{
    useSelector.mockReturnValue({
      employees: [],
      successMessage: null,
      erreurMessage: null,
    })
    render(<ListEmployees/>)
    await userEvent.type(screen.getByTestId("file-input"), "1958-01")
    expect(dispatch).toHaveBeenCalledTimes(1)
  })
  test('chagement de date', async ()=>{
    useSelector.mockReturnValue({
      employees: [
        {id: 1, nom: "baaoua", prenom: "brahim", date: "2024-01-14", heureEntree: "08:45:15", heureSortie: "16:32:14"},
        {id: 2, nom: "nom", prenom: "prenom", date: "2024-01-14", heureEntree: "08:45:15", heureSortie: "16:32:14"}
      ],
      successMessage: null,
      erreurMessage: null,
    })
    render(<ListEmployees/>)
    await userEvent.type(screen.getByTestId("file-input"), "1958-01-15")
    expect(screen.getByTestId("file-input")).toHaveValue("1958-01-15")
    expect(dispatch).toHaveBeenCalledTimes(2)
  })
})