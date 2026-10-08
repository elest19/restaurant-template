import React from 'react'
import ReactDOM from 'react-dom/client'
import { Hero } from './components/Hero'
import './styles.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Hero />
  </React.StrictMode>,
)
