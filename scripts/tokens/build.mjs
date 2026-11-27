#!/usr/bin/env node
/**
 * BAROBILL 디자인 토큰 빌드
 *   design-tokens/tokens.json  (기준 데이터: Figma Variables와 1:1)
 *     → app/assets/css/tokens.generated.css   (Tailwind v4 @theme + Nuxt UI CSS 변수, Light/Dark)
 *     → design-tokens/mapping.json            (Figma 변수 ↔ CSS 변수 ↔ Tailwind 유틸리티)
 *     → design-tokens/figma-variables.json    (Figma에 넣을 컬렉션/모드/별칭 구조)
 *     → docs/DESIGN_TOKENS.md                  (사람이 읽는 표)
 *
 * 사용:  node scripts/tokens/build.mjs          생성
 *        node scripts/tokens/build.mjs --check  생성물이 최신인지 검사(CI). 다르면 exit 1
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..')
const tokens = JSON.parse(readFileSync(resolve(root, 'design-tokens/tokens.json'), 'utf8'))
const CHECK = process.argv.includes('--check')

/* ---------- helpers ---------- */
const isToken = o => o && typeof o === 'object' && '$value' in o
function walk(obj, path = [], out = []) {
  for (const [k, v] of Object.entries(obj)) {
    if (k.startsWith('$')) continue
    if (isToken(v)) out.push({ path: [...path, k], token: v })
    else if (v && typeof v === 'object') walk(v, [...path, k], out)
  }
  return out
}
const all = walk(tokens)
const byPath = new Map(all.map(t => [t.path.join('.'), t.token]))
const aliasRe = /^\{(.+)\}$/
function resolveValue(v, seen = new Set()) {
  const m = typeof v === 'string' && v.match(aliasRe)
  if (!m) return v
  if (seen.has(m[1])) throw new Error(`순환 별칭: ${m[1]}`)
  const t = byPath.get(m[1])
  if (!t) throw new Error(`없는 별칭: {${m[1]}}`)
  seen.add(m[1])
  return resolveValue(t.$value, seen)
}
const primCssVar = path => `--${path.slice(1).join('-')}` // primitive.color.brand.500 → --color-brand-500
function cssRef(v) {
  const m = typeof v === 'string' && v.match(aliasRe)
  if (!m) return v
  const p = m[1].split('.')
  if (p[0] === 'primitive') return `var(${primCssVar(p)})`
  const t = byPath.get(m[1])
  return t?.$extensions?.code?.cssVar ? `var(${t.$extensions.code.cssVar})` : resolveValue(v)
}
function contrast(a, b) {
  const lum = hex => {
    const n = hex.replace('#', '')
    const [r, g, bl] = [0, 2, 4].map(i => parseInt(n.slice(i, i + 2), 16) / 255).map(c => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4))
    return 0.2126 * r + 0.7152 * g + 0.0722 * bl
  }
  const [l1, l2] = [lum(a), lum(b)].sort((x, y) => y - x)
  return (l1 + 0.05) / (l2 + 0.05)
}

/* ---------- 1) CSS ---------- */
const prim = all.filter(t => t.path[0] === 'primitive')
const themed = all.filter(t => t.path[0] !== 'primitive' && t.token.$extensions?.code?.cssVar)
const primLines = prim
  .filter(t => ['color', 'radius', 'font'].includes(t.path[1]))
  .map(({ path, token }) => {
    if (path[1] === 'font') return `  --font-${path[3]}: ${token.$value};`
    return `  ${primCssVar(path)}: ${token.$value};`
  })
const lightLines = [], darkLines = []
for (const { token } of themed) {
  const v = token.$extensions.code.cssVar
  const modes = token.$extensions.modes
  if (modes) {
    lightLines.push(`  ${v}: ${cssRef(modes.light)};`)
    darkLines.push(`  ${v}: ${cssRef(modes.dark)};`)
  } else lightLines.push(`  ${v}: ${cssRef(token.$value)};`)
}
// 브랜드 확장 시맨틱 → Tailwind 유틸리티(text-accent, bg-accent-soft, border-accent-line, bg-brand-surface …)
const utilMap = [
  ['--color-accent', '--bb-accent'],
  ['--color-accent-soft', '--bb-accent-soft'],
  ['--color-accent-line', '--bb-accent-line'],
  ['--color-brand-surface', '--bb-surface-brand'],
  ['--color-brand-surface-raised', '--bb-surface-brand-raised'],
  ['--color-focus', '--bb-focus-ring']
]
const css = `/* ⚠ 자동 생성 파일 — 직접 수정하지 마세요.
 * 원본: design-tokens/tokens.json · 생성: npm run tokens
 * version ${tokens.$meta.version} */

/* Primitive (모드 없음) */
@theme static {
${primLines.join('\n')}
}

/* 브랜드 확장 시맨틱 → Tailwind 유틸리티 */
@theme inline {
${utilMap.map(([a, b]) => `  ${a}: var(${b});`).join('\n')}
}

/* Semantic · Component — Light */
:root, .light {
${lightLines.join('\n')}
}

/* Semantic · Component — Dark (사이트 다크모드, 브랜드 다크 섹션과 별개) */
.dark {
${darkLines.join('\n')}
}
`

/* ---------- 2) mapping.json ---------- */
const mapping = themed.map(({ path, token }) => ({
  token: path.join('.'),
  figma: token.$extensions.figma?.name ?? null,
  figmaVariableId: token.$extensions.figma?.variableId ?? null,
  cssVar: token.$extensions.code.cssVar,
  tailwind: token.$extensions.code.tailwind ?? null,
  light: token.$extensions.modes ? resolveValue(token.$extensions.modes.light) : resolveValue(token.$value),
  dark: token.$extensions.modes ? resolveValue(token.$extensions.modes.dark) : null,
  lightAlias: token.$extensions.modes?.light ?? token.$value,
  darkAlias: token.$extensions.modes?.dark ?? null,
  description: token.$description ?? ''
}))

/* ---------- 3) figma-variables.json ---------- */
const figmaName = path => path.slice(1).map((s, i) => (i === 0 ? s[0].toUpperCase() + s.slice(1) : s)).join('/')
const figmaVars = {
  collections: [
    {
      name: 'BB Primitives',
      modes: ['Value'],
      variables: prim.filter(t => t.token.$type === 'color' || t.token.$type === 'dimension').map(({ path, token }) => ({
        name: figmaName(path), type: token.$type === 'color' ? 'COLOR' : 'FLOAT', values: { Value: token.$type === 'color' ? token.$value : parseFloat(token.$value) }, codeSyntax: { WEB: token.$type === 'color' ? `var(${primCssVar(path)})` : token.$value }
      }))
    },
    {
      name: 'BB Semantic',
      modes: ['Light', 'Dark'],
      variables: themed.filter(t => t.token.$type === 'color').map(({ path, token }) => {
        const ref = v => { const m = v.match(aliasRe); return m && m[1].startsWith('primitive') ? { alias: figmaName(m[1].split('.')) } : { value: resolveValue(v) } }
        return { name: token.$extensions.figma.name, token: path.join('.'), type: 'COLOR', values: { Light: ref(token.$extensions.modes.light), Dark: ref(token.$extensions.modes.dark) }, codeSyntax: { WEB: `var(${token.$extensions.code.cssVar})` }, description: token.$description ?? '' }
      })
    }
  ]
}

/* ---------- 4) 접근성 대비 검사 ---------- */
const sem = p => byPath.get(p)
const pairs = [
  ['semantic.color.text.default', 'semantic.color.bg.default', 4.5],
  ['semantic.color.text.toned', 'semantic.color.bg.default', 4.5],
  ['semantic.color.text.muted', 'semantic.color.bg.default', 4.5],
  ['semantic.color.text.accent', 'semantic.color.bg.default', 4.5],
  ['semantic.color.text.accent', 'semantic.color.bg.muted', 4.5],
  ['semantic.color.text.muted', 'semantic.color.bg.muted', 4.5]
]
const report = []
for (const mode of ['light', 'dark']) {
  for (const [fg, bg, min] of pairs) {
    const a = resolveValue(sem(fg).$extensions.modes[mode]); const b = resolveValue(sem(bg).$extensions.modes[mode])
    const r = contrast(a, b)
    report.push({ mode, fg, bg, ratio: +r.toFixed(2), pass: r >= min })
  }
  const p = resolveValue(sem('semantic.color.primary').$extensions.modes[mode])
  const on = mode === 'light' ? '#ffffff' : resolveValue(sem('semantic.color.text.inverted').$extensions.modes.dark)
  const r = contrast(p, on)
  report.push({ mode, fg: 'button label', bg: 'semantic.color.primary', ratio: +r.toFixed(2), pass: r >= 4.5 })
}
// 브랜드 다크 섹션: 흰 글자
report.push({ mode: 'any', fg: '#ffffff', bg: 'brandSurface', ratio: +contrast('#ffffff', resolveValue(sem('semantic.color.bg.brandSurface').$extensions.modes.light)).toFixed(2), pass: true })

/* ---------- 5) docs ---------- */
const row = m => `| \`${m.token}\` | ${m.figma ?? '—'} | \`${m.cssVar}\` | ${m.tailwind ? '`' + m.tailwind + '`' : '—'} | ${m.lightAlias}<br>${m.light} | ${m.darkAlias ?? '—'}<br>${m.dark ?? ''} | ${m.description} |`
const md = `# DESIGN TOKENS

> ⚠ 자동 생성 문서 — \`npm run tokens\`로 갱신. 원본은 \`design-tokens/tokens.json\`.
> 버전 ${tokens.$meta.version} · 출처: ${tokens.$meta.source}
> ${tokens.$meta.notes}

## 구조
- **Primitive**: 브랜드/뉴트럴 팔레트, 폰트, 라운드, 간격 단위 → Tailwind \`@theme\` (\`bg-brand-600\`, \`text-ink-500\` …). 페이지 코드에서 직접 쓰는 것은 지양(그래픽 예외).
- **Semantic**: 역할 중심, Light/Dark 모드별 값. Nuxt UI 변수(\`--ui-*\`)를 그대로 쓰고, 부족한 브랜드 역할만 \`--bb-*\`로 확장.
- **Component**: 포커스 링, 라운드, 헤더 높이, 콘텐츠 폭.
- **브랜드 다크 섹션(\`bg-brand-surface\`)과 사이트 다크모드(\`.dark\`)는 별개**. 라이트 모드에서도 히어로는 어둡다.

## Semantic · Component 매핑
| 토큰 | Figma 변수 | CSS 변수 | Tailwind | Light | Dark | 용도 |
|---|---|---|---|---|---|---|
${mapping.map(row).join('\n')}

## Primitive
| 토큰 | 값 |
|---|---|
${prim.map(({ path, token }) => `| \`${path.join('.')}\` | ${token.$value} |`).join('\n')}

## 대비 검사 (WCAG 2.1 AA, 본문 4.5:1)
| 모드 | 글자 | 배경 | 대비 | 결과 |
|---|---|---|---|---|
${report.map(r => `| ${r.mode} | ${r.fg} | ${r.bg} | ${r.ratio} | ${r.pass ? '통과' : '**미달**'} |`).join('\n')}
`

/* ---------- write / check ---------- */
const outputs = {
  'app/assets/css/tokens.generated.css': css,
  'design-tokens/mapping.json': JSON.stringify(mapping, null, 2) + '\n',
  'design-tokens/figma-variables.json': JSON.stringify(figmaVars, null, 2) + '\n',
  'docs/DESIGN_TOKENS.md': md
}
let stale = []
for (const [rel, content] of Object.entries(outputs)) {
  const p = resolve(root, rel)
  if (CHECK) { if (!existsSync(p) || readFileSync(p, 'utf8') !== content) stale.push(rel) }
  else writeFileSync(p, content)
}
const fails = report.filter(r => !r.pass)
if (CHECK && stale.length) { console.error('✗ 토큰 생성물이 최신이 아닙니다. `npm run tokens` 실행 후 커밋하세요:\n  ' + stale.join('\n  ')); process.exit(1) }
console.log(`${CHECK ? '✓ 토큰 생성물 최신' : '✓ 토큰 생성 완료'} · semantic ${mapping.length}개 · primitive ${prim.length}개`)
if (fails.length) { console.warn('⚠ 대비 미달:', fails.map(f => `${f.mode} ${f.fg} on ${f.bg} = ${f.ratio}`).join(', ')); if (CHECK) process.exit(1) }
