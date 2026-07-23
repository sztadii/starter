import { execFileSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import { MemoryRouter } from 'react-router'
import { loadEnv } from 'vite'
import { LandingPage } from '../src/modules/landing/pages/LandingPage'

const rootDir = join(dirname(fileURLToPath(import.meta.url)), '..')
const indexPath = join(rootDir, 'dist', 'index.html')
const mode = process.env.MODE ?? 'production'
const env = loadEnv(mode, rootDir, '')

function isEnabled(value: string | undefined): boolean {
  return value === 'true' || value === '1'
}

const prettyHtml =
  isEnabled(process.env.PRETTY_HTML) || isEnabled(env.PRETTY_HTML)

const html = renderToString(
  createElement(
    MemoryRouter,
    { initialEntries: ['/'] },
    createElement(LandingPage),
  ),
)

const indexHtml = readFileSync(indexPath, 'utf8')
const withLanding = indexHtml.replace(
  /<div id="root"><\/div>/,
  `<div id="root">${html}</div>`,
)

if (withLanding === indexHtml) {
  throw new Error('Could not find <div id="root"></div> in dist/index.html')
}

writeFileSync(indexPath, withLanding)

if (prettyHtml) {
  execFileSync(
    'pnpm',
    [
      'exec',
      'biome',
      'format',
      '--write',
      '--vcs-use-ignore-file=false',
      'dist/index.html',
    ],
    { cwd: rootDir, stdio: 'inherit' },
  )
}

console.log(
  prettyHtml
    ? 'Prerendered landing into dist/index.html (pretty)'
    : 'Prerendered landing into dist/index.html',
)
