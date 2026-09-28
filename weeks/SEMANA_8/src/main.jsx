import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Game from './components/Tutorial/triqui.jsx'

import MiComponente from './components/contador/counter.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MiComponente />
    <Game />
  </StrictMode>,
)
