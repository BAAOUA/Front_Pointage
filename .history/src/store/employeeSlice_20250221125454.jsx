import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { GET, POST } from "../services/APIService"

export const fetchEmployees = createAsyncThunk('employee/fetch', async (date)=>{
  let response
  if(date == null){
    response = await GET('/employees')
    return response
  }else{
    response = await GET(`/employees?date=${date}`)
    return response
  }
})

export const addEmployees = createAsyncThunk('employees/add', async(data)=>{
  const response = await POST("/employees/add", data, true)
  return response
})

const employeeSlice = createSlice({
    name: "employee",
    initialState:{
      dbEmployees:[],
      employees:[],
      erreurMessage: null,
      successMessage : null,
      success : false
    },
    reducers:{
      clearMessages: (state) =>{
        state.erreurMessage = null
        state.successMessage = null
      },
      setError: (state, action)=>{
        state.erreurMessage = action.payload
      }
    },
    extraReducers:(builder)=>{
      builder
        .addCase(fetchEmployees.pending, (state)=>{
          state.success = false
        })
        .addCase(fetchEmployees.fulfilled, (state, action)=>{
          if(action.payload.success){
            state.dbEmployees = action.payload.data
            state.employees = state.dbEmployees
            state.successMessage = null
            state.erreurMessage = null
          } else {
            state.erreurMessage = action.payload.message
            state.successMessage =null
          }
        })
        .addCase(addEmployees.pending, (state)=>{
          state.success = false
        })
        .addCase(addEmployees.fulfilled, (state, action)=>{
          if(action.payload.success){
            state.success = true
            state.successMessage = "Les employées sont ajouter"
            state.erreurMessage = null
          } else {
            state.success = false
            state.erreurMessage = action.payload.message
            state.successMessage = null
          }
        })
        .addCase(addEmployees.rejected, (state)=>{
          state.success = false
        })
    }

  })
//const {actions, reducer} = employeeSlice()

export const {clearMessages, setError} = employeeSlice.actions
export default employeeSlice.reducer