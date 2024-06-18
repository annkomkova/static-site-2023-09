const { TextEncoder, TextDecoder } = require('util')
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder

const React = require('react')
const ReactDOMServer = require('react-dom/server')

const S_MenuBar = require('./components/S_MenuBar/S_MenuBar.jsx').default

import { props } from './menubar-data.js'

const menubar = ReactDOMServer.renderToString(
  React.createElement(S_MenuBar, props)
)

export { menubar }
