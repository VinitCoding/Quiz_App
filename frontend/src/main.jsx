import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from './components/ui/provider.jsx'
import { Theme } from '@chakra-ui/react'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Provider>
        <Theme appearance='light'>
          <App />
        </Theme>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)
