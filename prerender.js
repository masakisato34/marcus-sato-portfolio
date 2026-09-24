// Write each route as static HTML so crawlers get the full content and per-page head without running JS.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.dirname(fileURLToPath(import.meta.url))
const dist = path.join(root, 'dist')
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf-8')
const { render, ROUTES } = await import(pathToFileURL(path.join(root, 'dist-ssr/entry-server.js')).href)

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

for (const route of ROUTES) {
  const { html, head } = render(route)
  const headTags = [
    `<title>${esc(head.title)}</title>`,
    `<meta name="description" content="${esc(head.description)}" />`,
    `<link rel="canonical" href="${head.canonical}" />`,
    `<meta property="og:url" content="${head.canonical}" />`,
    `<meta property="og:title" content="${esc(head.title)}" />`,
    `<meta property="og:description" content="${esc(head.description)}" />`,
  ].join('\n    ')
  const page = template.replace('<!--app-head-->', headTags).replace('<!--app-html-->', html)
  if (page.includes('<!--app-head-->') || page.includes('<!--app-html-->') || page === template) {
    throw new Error(`placeholders not replaced for ${route}`)
  }
  const out = path.join(dist, route, 'index.html')
  fs.mkdirSync(path.dirname(out), { recursive: true })
  fs.writeFileSync(out, page)
  console.log(`prerendered ${route}`)
}
