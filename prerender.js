// Write the rendered page into dist/index.html so crawlers get the full content without running JS.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.dirname(fileURLToPath(import.meta.url))
const templatePath = path.join(root, 'dist/index.html')
const template = fs.readFileSync(templatePath, 'utf-8')
const { render } = await import(pathToFileURL(path.join(root, 'dist-ssr/entry-server.js')).href)

const html = template.replace('<!--app-html-->', render())
if (html === template) throw new Error('placeholder <!--app-html--> not found in dist/index.html')
fs.writeFileSync(templatePath, html)
console.log('prerendered dist/index.html')
