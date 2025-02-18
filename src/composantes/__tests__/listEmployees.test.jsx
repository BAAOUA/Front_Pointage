import React from "react"
import { render, screen } from "@testing-library/react"
import ListEmployees from "../ListEmployees"
import { useDispatch, useSelector } from "react-redux"

jest.mock('react-redux', ()=>({
  useDispatch: jest.fn(),
  useSelector: jest.fn()
}))
jest
describe('Test de la table d\'affichage', ()=>{
  let dispatch
  beforeEach(()=>{
    dispatch = jest.fn()
    useDispatch.mockReturnValue(dispatch)
    useSelector.mockReturnValue({
      employees: [{id: 1, nom: "baaoua", prenom: "brahim", date: "2024-01-14", heureEntree: "08:45:15", heureSortie: "16:32:14"}],
      successMessage: null,
      erreurMessage: null,
    })
    render(<ListEmployees/>)
  })
  test('Chargement de la page', ()=>{
    expect(screen.getByRole("input")).toBeInTheDocument()
    expect(screen.getByRole("table")).toBeInTheDocument()
  })
})