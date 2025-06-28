import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import MyGlobalStyles from './styles/globalStyles.js'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

const router = createBrowserRouter([
  {
    path:"/",
    element: <Login />, //Renderizado na página
  },
  {
    path:"/dashboard",
    element: <Dashboard />,
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MyGlobalStyles />
    <RouterProvider router={router} />      
  </StrictMode>,
)
