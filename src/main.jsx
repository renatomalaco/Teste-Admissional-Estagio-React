import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import MyGlobalStyles from './styles/globalStyles.js'
// import Login from './pages/Login/index.jsx'
import Home from './pages/Home/index.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MyGlobalStyles />
    {/* <Login /> */}
    <Home />
  </StrictMode>,
)
