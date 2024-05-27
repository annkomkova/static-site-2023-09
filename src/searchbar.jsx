import './searchbar.scss'
import React from 'react'
import * as ReactDOM from 'react-dom/client'

import O_SearchBar from './components/O_SearchBar/O_Searchbar.jsx'

console.clear()

const root = ReactDOM.createRoot(document.querySelector('.S_MenuBar .W_Search'))
root.render(<O_SearchBar />)
