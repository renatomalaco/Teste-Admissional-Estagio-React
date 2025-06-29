import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import MyGlobalStyles from './styles/globalStyles.js'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Login from './pages/Login'
import Template from './Template'
import Dashboard from './pages/Dashboard'
import Clientes from './pages/Clientes'
import Pedidos from './pages/Produtos'
import Produtos from './pages/Produtos'

const router = createBrowserRouter([
  {
    path:"/",
    element: <Login />, //Renderizado na página
  },
  {
    element: <Template />,
    children: [
      {
        path:"/dashboard",
        element: <Dashboard />,
      },
      {
        path:"/clientes",
        element: <Clientes />,
      },
      {
        path:"/produtos",
        element: <Produtos />,
      },
      {
        path:"/pedidos",
        element: <Pedidos />,
      },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MyGlobalStyles />
    <RouterProvider router={router} />      
  </StrictMode>,
)
