import React from 'react'
import { render, screen, waitFor, cleanup } from '@testing-library/react'
import { POST } from '../../services/APIService'
import { useNavigate } from 'react-router-dom'
import Login from '../Login'

import userEvent from '@testing-library/user-event'


describe('Unit tests', ()=>{
  beforeEach(()=>{
    render(<Login/>)
  })
  afterEach(()=>{
    cleanup()
  })
  test('Chargement de la page', () => {
    expect(screen.getByLabelText(/Non d'utilisateur/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Mot de passe/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Se connecter/i })).toBeInTheDocument()
  })
  test('Formulaire vide', async ()=>{
    userEvent.click(screen.getByRole('button', {name: /Se connecter/i}))

    expect(await screen.findByText("Vous devez saissir votre nom d'utilisateur")).toBeInTheDocument()
    expect(await screen.findByText('Vous devez saissir votre mot de passe')).toBeInTheDocument()
  })
  test('Erreurs de validation', async ()=>{
    await userEvent.type(screen.getByLabelText(/Mot de passe/i), 'pa')
    
    userEvent.click(screen.getByRole('button', {name: /Se connecter/i}))

    expect(await screen.findByText('Vous devez saissir votre nom d\'utilisateur')).toBeInTheDocument()
    expect(await screen.findByText('Votre mot de passe est plus court')).toBeInTheDocument()
  })
})

jest.mock('../../Services/APIService', () => ({
  POST: jest.fn(),
}))

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}))

describe('Test de la page de login', () => {
  let navigate
  beforeEach(() => {
    navigate = jest.fn()
    useNavigate.mockReturnValue(navigate)
    global.alert = jest.fn()
    Object.defineProperty(global, 'localStorage', {
      value: {
        setItem: jest.fn(),
        getItem: jest.fn(),
        clear: jest.fn(),
      },
      writable: true,
    })

    render(<Login/>)
  })
  afterEach(()=>{
    jest.clearAllMocks()
    cleanup()
  })

  test('Appel du fonction onSubmet() avec message d\'erreur', async ()=>{
    POST.mockResolvedValueOnce({success:false, message: "erreur"})

    await userEvent.type(screen.getByLabelText(/Non d'utilisateur/i), "brahim")
    await userEvent.type(screen.getByLabelText(/Mot de passe/i), 'admin123')
    userEvent.click(screen.getByRole('button', {name: /Se connecter/i}))
    await waitFor(()=>{
      expect(POST).toHaveBeenCalledTimes(1)
      expect(POST).toHaveBeenCalledWith('/auth/login', { username: 'brahim', password: 'admin123' })
      expect(localStorage.setItem).not.toHaveBeenCalled()
      expect(global.alert).toHaveBeenCalledWith('erreur')
      expect(navigate).not.toHaveBeenCalled()
      
    })
  })
  test('Appel du fonction onSubmet() avec succes', async ()=>{
    const response = {success:true, data: {accessToken: "accesstoken", refreshToken: "refreshtoken"}}
    POST.mockResolvedValueOnce(response)

    await userEvent.type(screen.getByLabelText(/Non d'utilisateur/i), "admin")
    await userEvent.type(screen.getByLabelText(/Mot de passe/i), 'admin123')
    userEvent.click(screen.getByRole('button', {name: /Se connecter/i}))
    await waitFor(()=>{
      expect(POST).toHaveBeenCalledTimes(1)
      expect(POST).toHaveBeenCalledWith('/auth/login', { username: 'admin', password: 'admin123' })
      expect(localStorage.setItem).toHaveBeenCalledTimes(2)
      expect(localStorage.setItem).toHaveBeenCalledWith('accessToken', response.data.accessToken)
      expect(localStorage.setItem).toHaveBeenCalledWith('refreshToken', response.data.refreshToken)
      expect(navigate).toHaveBeenCalledWith('/affiche')
      
    })
  })
  
})
