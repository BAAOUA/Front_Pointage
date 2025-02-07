import './App.css';
import './composantes/styles.css'

import { createBrowserRouter, RouterProvider } from 'react-router';
import Principale from './composantes/Principale';
import AddEmployees from './composantes/AddEmployees';
import ListEmployees from './composantes/ListEmployees';
import Login from './composantes/login';

import { Provider } from 'react-redux';
import store from './Store/store';
import ProtectedRoute from './Services/ProtectedRoute';
import { useEffect } from 'react';

const route = createBrowserRouter([
  {
    path:"/",
    element: <Principale/>,
    errorElement: <h1>page non trouver</h1>,
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
])

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={route}/>
    </Provider>
  );
}

export default App;
