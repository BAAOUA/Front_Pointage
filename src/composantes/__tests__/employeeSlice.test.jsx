import { clearMessages, fetchEmployees, addEmployees } from '../../store/employeeSlice'
import { GET, POST } from '../../services/APIService'
//import store from '../../store/store'

import employeeReducer from '../../store/employeeSlice'
import { configureStore } from '@reduxjs/toolkit'

jest.mock('../../Services/APIService',()=>({
  POST: jest.fn(),
  GET: jest.fn()
}))


describe('Test employeeSlice', ()=>{
  let store
  const file = new File(
    [new Blob(['Nom	Prénom,	Date,	Heure d\'Entrée,	Heure de Sortie\nbaaoua,	brahim,	14/01/2024,	08:45:15,	16:32:14'], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })],
    'testFile.xlsx',
    { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }
  )

  beforeEach(()=>{
    store = configureStore({
      reducer: employeeReducer
    })
  })
  afterEach(()=>{
    jest.clearAllMocks()
  })
  test("Recuperer la list des employees", async ()=>{
    const testData = {
      success: true,
      data: [
        { id: 1, nom: "baaoua", prenom: "brahim", date: "2024-01-14", heureEntree: "08:45:15", heureSortie: "16:32:14" },
        { id: 2, nom: "baaoua", prenom: "brahim", date: "2024-01-15", heureEntree: "08:25:15", heureSortie: "16:42:14" }
      ]
    }
    GET.mockResolvedValueOnce(testData)
    await store.dispatch(fetchEmployees())
    expect(GET).toHaveBeenCalledTimes(1)
    expect(GET).toHaveBeenCalledWith("/employees")

    const state = store.getState()
    expect(state.dbEmployees).toEqual(testData.data)
    expect(state.employees).toEqual(testData.data)
    expect(state.successMessage).toBeNull()
  })
  test('Recherche par date', async ()=>{
    const date = "2024-01-14"
    const testData = {
      success: true,
      data: [
        { id: 1, nom: "baaoua", prenom: "baaoua", date: "2024-01-14", heureEntree: "08:45:15", heureSortie: "16:32:14" },
        { id: 2, nom: "brahim", prenom: "brahim", date: "2024-01-14", heureEntree: "08:40:15", heureSortie: "17:01:14" }
      ]
    }
    GET.mockResolvedValueOnce(testData)
    await store.dispatch(fetchEmployees(date))
    expect(GET).toHaveBeenCalledTimes(1)
    expect(GET).toHaveBeenCalledWith("/employees?date="+date)

    const state = store.getState()
    expect(state.dbEmployees).toEqual(testData.data)
    expect(state.employees).toEqual(testData.data)
    expect(state.successMessage).toBeNull()
  })
  test('Message d\'erreur', async () => {
    const testData = {
      success: false,
      message: "Message d'erreur"
    }
    GET.mockResolvedValueOnce(testData)
    await store.dispatch(fetchEmployees())
    expect(GET).toHaveBeenCalledTimes(1)
    expect(GET).toHaveBeenCalledWith("/employees")

    const state = store.getState()
    expect(state.erreurMessage).toEqual(testData.message)
    expect(state.successMessage).toBeNull()
  })
  test('Ajouter les employees', async ()=>{
    const resp = {success: true, data: "succces"}
    POST.mockResolvedValueOnce(resp)
    const data =new FormData()
    data.append("data", file)
    await store.dispatch(addEmployees(data))
    expect(POST).toHaveBeenCalledTimes(1)
    expect(POST).toHaveBeenCalledWith("/employees/add", data, true)

    const state = store.getState()
    expect(state.success).toBeTruthy()
    expect(state.successMessage).toEqual('Les employées sont ajouter')
    expect(state.erreurMessage).toBeNull()
  })
  test('Ajouter les employees échoué', async ()=>{
    const resp = {success: false, message: "message d'erreur"}
    POST.mockResolvedValueOnce(resp)
    const data =new FormData()
    data.append("data", file)
    await store.dispatch(addEmployees(data))
    expect(POST).toHaveBeenCalledTimes(1)
    expect(POST).toHaveBeenCalledWith("/employees/add", data, true)

    const state = store.getState()
    expect(state.success).toBeFalsy()
    expect(state.successMessage).toBeNull()
    expect(state.erreurMessage).toBe(resp.message)
  })
  
})



