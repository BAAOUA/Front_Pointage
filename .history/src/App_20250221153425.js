import './App.css'
import './composantes/styles.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Principale from './composantes/Principale'
import AddEmployees from './composantes/AddEmployees'
import ListEmployees from './composantes/ListEmployees'
import Login from './composantes/Login'

import { Provider } from 'react-redux'
import store, {persistor} from './store/store'
import ProtectedRoute from './services/ProtectedRoute'
import Error from './composantes/ServerError'
import { PersistGate } from 'redux-persist/integration/react'

const route = createBrowserRouter([
  {
    path:"/",
    element: <Principale/>,
    children: [
      {
        path: "/ajouter",
        element : 
          <ProtectedRoute>
            <AddEmployees/>
          </ProtectedRoute>
        
      },
      {
        path : "/affiche",
        element: 
          <ProtectedRoute roles = {["ADMIN","USER">
            <ListEmployees/>
          </ProtectedRoute>
        
      }
    ]
  },
  {
    path: "/login",
    element : <Login/>
  },
  {
    path: "/Erruer/:code/:msg",
    element : <Error/>
  },
])

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={route}/>
      </PersistGate>
    </Provider>
  )
}

export default App
