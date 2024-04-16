import './react-basics.css'

import { createRoot } from 'react-dom/client'
import React from 'react'

import O_Container from './react-basics/O_Container.jsx'

document.body.innerHTML = '<div id="app"></div>'

const root = createRoot(document.querySelector('#app'))
root.render(<O_Container />)
