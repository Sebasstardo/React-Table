import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BasicTable } from './components/BasicTable'
import { FilterValue } from './components/FilterValue'
import { SortingTable } from './components/SortingTable'
import { UserTable } from './newComponent/UserTable'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserTable />
  </React.StrictMode>,
)
