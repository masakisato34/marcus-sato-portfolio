import React from 'react'
import { renderToString } from 'react-dom/server'
import App, { ROUTES, getHead } from './App.jsx'

export { ROUTES }

export function render(url) {
  const html = renderToString(
    <React.StrictMode>
      <App url={url} />
    </React.StrictMode>,
  )
  return { html, head: getHead(url) }
}
