import { describe, it, expect } from 'vitest'
import { readFileSync, statSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const ROOT = resolve(__dirname, '..')

function read(relPath) {
  return readFileSync(resolve(ROOT, relPath), 'utf8')
}

function json(relPath) {
  return JSON.parse(read(relPath))
}

describe('artifacts: css-cascade script skill', () => {
  it('skill 内の CLI source は npm/CLI 用 source と同期している', () => {
    expect(read('.claude/skills/css-cascade/bin/css-cascade.src.js')).toBe(read('bin/css-cascade.src.js'))
  })

  it('skill 内の core source は src/core と同期している', () => {
    const coreFiles = [
      'diff.js',
      'index.js',
      'normalize.js',
      'order-risk.js',
      'parse.js',
      'resolve.js',
      'specificity.js',
    ]

    for (const file of coreFiles) {
      expect(read(`.claude/skills/css-cascade/src/core/${file}`)).toBe(read(`src/core/${file}`))
    }
  })

  it('script skill は postcss のみを runtime dependency として持つ', () => {
    const pkg = json('.claude/skills/css-cascade/package.json')

    expect(pkg.type).toBe('module')
    expect(pkg.dependencies).toEqual({ postcss: '^8.5.0' })
  })
})

describe('artifacts: css-cascade npm skill', () => {
  it('npm skill は published package を runtime dependency として参照する', () => {
    const pkg = json('.claude/skills/css-cascade-npm/package.json')

    expect(pkg.type).toBe('module')
    expect(pkg.dependencies['@svjunic/css-cascade']).toMatch(/^\^\d+\.\d+\.\d+$/)
    expect(Object.keys(pkg.dependencies)).toEqual(['@svjunic/css-cascade'])
  })

  it('npm skill は package binary を呼び出す手順になっている', () => {
    const skill = read('.claude/skills/css-cascade-npm/SKILL.md')

    expect(skill).toContain('node "<SKILL_DIR>/node_modules/.bin/css-cascade"')
    expect(skill).not.toContain('bin/css-cascade.src.js')
  })
})

describe('artifacts: CLI publish files', () => {
  it('minified CLI と source CLI が存在し実行可能ファイルとして配布できる', () => {
    const cjs = statSync(resolve(ROOT, 'bin/css-cascade.cjs'))
    const src = statSync(resolve(ROOT, 'bin/css-cascade.src.js'))

    expect(cjs.isFile()).toBe(true)
    expect(src.isFile()).toBe(true)
    expect(read('bin/css-cascade.cjs')).toContain('Source: https://github.com/svjunic/css-cascade')
    expect(read('bin/css-cascade.src.js')).toMatch(/^#!\/usr\/bin\/env node/)
  })
})
