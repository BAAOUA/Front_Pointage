import './App.css'
import './composantes/styles.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Principale from './composantes/Principale'
import AddEmployees from './composantes/AddEmployees'
import ListEmployees from './composantes/ListEmployees'
import Login from './composantes/Login'

import { Provider } from 'react-redux'
import store from './store/store'
import ProtectedRoute from './services/ProtectedRoute'
import Error from './composantes/ServerError'

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
          <ProtectedRoute>
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
      P
      <RouterProvider router={route}/>
    </Provider>
  )
}

export default App
