import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GET, POST } from "../Services/APIService";

export const fetchEmployees = createAsyncThunk('employee/fetch', async ()=>{
  const response = GET("/employees")
  return response
})

export const filtredEmployees = createAsyncThunk('employee/filter', async (date)=>{
  const response = await GET(`/employees?date=${date}`)
  return response
})

export const addEmployees = createAsyncThunk('employees/add', async(data)=>{
  const response = POST("/employees/add", data, true)
  return response
})
const employeeSlice = createSlice({
    name: "employee",
    initialState:{
      dbEmployees:[],
      employees:[],
      succes: false
    },
    reducers:{
      filtreParDate:(state, action)=>{
        console.log("date   ", action.payload)
        state.employees = state.dbEmployees.filter((emp)=> emp.date.includes(action.payload))
      }
    },
    extraReducers:(builder)=>{
      builder
        .addCase(fetchEmployees.fulfilled, (state, action)=>{
          if(action.payload.success){
            state.succes = true
            state.dbEmployees = action.payload.data
            state.employees = state.dbEmployees
          } else {
            state.succes = false
            alert(action.payload.message)
          }
        })
        .addCase(fetchEmployees.rejected, (state)=>{
          state.succes = false
        })
        .addCase(addEmployees.fulfilled, (state, action)=>{
          if(action.payload.success){
            state.succes = true
            alert("Les employées sont ajouter")
          } else {
            state.succes = false
            alert(action.payload.message)
          }
        })
        .addCase(addEmployees.rejected, (state)=>{
          state.succes = false
        })
        .addCase(filtredEmployees.fulfilled, (state, action)=>{
          console.log(action.payload)
          if(action.payload.success){
            state.succes = true
            state.dbEmployees = action.payload.data
            state.employees = state.dbEmployees
          } else {
            state.succes = false
            console.log(action.payload)
            alert(action.payload)
          }
        })
        .addCase(filtredEmployees.rejected, (state)=>{
          state.succes = false
        })
    }

  })
//const {actions, reducer} = employeeSlice()

export const {filtreParDate} = employeeSlice.actions
export default employeeSlice.reducer