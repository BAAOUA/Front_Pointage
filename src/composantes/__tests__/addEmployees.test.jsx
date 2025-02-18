import React from 'react'
import employeeReducer, { addEmployees, clearMessages } from '../../store/employeeSlice'
import { useNavigate } from "react-router-dom"
import { configureStore } from "@reduxjs/toolkit"
import { cleanup, render, screen, waitFor } from "@testing-library/react"
import AddEmployees from "../AddEmployees"
import { useDispatch, useSelector } from 'react-redux'
import userEvent from '@testing-library/user-event'


jest.mock('react-router-dom',()=>({
  useNavigate: jest.fn()
}))
jest.mock('react-redux', ()=>({
  useDispatch: jest.fn(),
  useSelector: jest.fn()
}))
jest.mock('../../store/employeeSlice',()=>({
  addEmployees: jest.fn(),
  clearMessages: jest.fn()
}))

describe('unit tests', ()=>{
  beforeEach(()=>{
    useSelector.mockReturnValue({
      success: false,
      successMessage: null,
      erreurMessage: null,
    })

    render(<AddEmployees/>)
  })
  afterEach(()=>{
    jest.clearAllMocks()
    cleanup()
  })
  test('Affichage de la page', ()=>{
    expect(screen.getByLabelText(/Choisir un fichier :/i)).toBeInTheDocument()
    expect(screen.getByRole('button', {name: /Envoyer/i})).toBeInTheDocument()
    
  })
  test('Validation du champs file', async ()=>{
    await userEvent.click(screen.getByRole('button', {name: /Envoyer/i}))
    expect(screen.getByText('Le fichier est obligatoire')).toBeInTheDocument()
  })
  test('Changement du fichier', async ()=>{
    const fichier = new File(['file'], 'test.xlsx', { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })

    expect(screen.getByTestId(/file-label/i)).toHaveTextContent('Choisir un fichier :')

    await userEvent.upload(screen.getByTestId(/file-input/i), fichier)
    expect(screen.getByTestId(/file-label/i)).toHaveTextContent('test.xlsx')
  })
})

describe('Test de la page AddEmployees', () => {
  let navigate
  let dispatch

  beforeEach(()=>{
    navigate = jest.fn()
    useNavigate.mockReturnValue(navigate)
    dispatch = jest.fn()
    useDispatch.mockReturnValue(dispatch)

    useSelector.mockReturnValue({
      success: false,
      successMessage: null,
      erreurMessage: null,
    })
    render(<AddEmployees/>)
  })
  afterEach(()=>{
    jest.clearAllMocks()
    cleanup()
  })
  test('L\'ajout de fichier et l\'envoi au slice avec succès', async () => {
    const fichier = new File(['file'], 'test.xlsx', { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
    await userEvent.upload(screen.getByTestId(/file-input/i), fichier)
    await userEvent.click(screen.getByRole('button', { name: /Envoyer/i }))
    
    const data = new FormData()
    data.append('data', fichier)
    
    await waitFor(() => { 
      expect(dispatch).toHaveBeenCalledTimes(1)
      expect(dispatch).toHaveBeenCalledWith(addEmployees(data))
    })
    //rerender la page pour tester les message afficher 
    useSelector.mockReturnValue({
      success: true,
      successMessage: 'Les employés sont ajoutés',
      erreurMessage: null,
    })
    render(<AddEmployees />)

    expect(await screen.findByText("Les employés sont ajoutés")).toBeInTheDocument()
    expect(navigate).toHaveBeenCalledTimes(1)
    expect(navigate).toHaveBeenCalledWith("/affiche")
  })

  test('L\'ajout de fichier et l\'envoi au slice avec erreur', async ()=>{
    const fichier = new File(['file'], 'test.xlsx', { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
    await userEvent.upload(screen.getByTestId(/file-input/i), fichier)
    await userEvent.click(screen.getByRole('button', {name: /Envoyer/i}))
    const data = new FormData()
    data.append('data', fichier)
    await waitFor(()=>{ 
      expect(dispatch).toHaveBeenCalledTimes(1)
      expect(dispatch).toHaveBeenCalledWith(addEmployees(expect.any(data)))
    })
    //rerender la page pour tester les message afficher 
    useSelector.mockReturnValue({
      success: false,
      successMessage: null,
      erreurMessage: 'Erreur lors d\'ajout du fichier',
    })
    render(<AddEmployees/>)

    expect(await screen.findByText('Erreur lors d\'ajout du fichier')).toBeInTheDocument()
    expect(navigate).not.toHaveBeenCalled()
  })
})