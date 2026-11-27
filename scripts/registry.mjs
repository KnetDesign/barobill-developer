#!/usr/bin/env node
/** app/data/page-registry.json → docs/PAGE_REGISTRY.md  (--check: 최신 여부 검사) */
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const reg = JSON.parse(readFileSync(resolve(root, 'app/data/page-registry.json'), 'utf8'))
const rows = reg.pages.map(p => `| \`${p.id}\` | ${p.name} | ${p.route ? '`' + p.route + '`' : '—'} | ${p.wireframe.anchor ? `[#${p.wireframe.anchor}](${p.wireframe.url})` : '—'} | ${p.figma.fileKey ? `${p.figma.fileKey} / ${p.figma.nodeId ?? '—'}` : '—'} | ${p.status.plan} | ${p.status.design} | ${p.status.dev} | ${p.approvedVersion ?? '—'} | ${p.updated} | ${p.notes || ''} |`)
const count = k => Object.entries(reg.pages.reduce((a, p) => ((a[p.status[k]] = (a[p.status[k]] || 0) + 1), a), {})).map(([s, n]) => `${s} ${n}`).join(' · ')
const md = `# PAGE REGISTRY

> ⚠ 자동 생성 — 원본 \`app/data/page-registry.json\` · 갱신 \`npm run registry\`. Design Studio 메뉴·상태 배지도 같은 원본을 씁니다.
> 화면설계서: ${reg.source.wireframe} (로컬 사본 \`${reg.source.wireframeLocal}\`, 페이지 식별자 ${reg.source.pageIdsInSource}개, 확인 ${reg.source.checkedAt})

- 기획: ${count('plan')}
- 디자인: ${count('design')}
- 개발: ${count('dev')}

| ID | 페이지 | Route | 화면설계서 | Figma (file / node) | 기획 | 디자인 | 개발 | 승인 버전 | 갱신 | 메모 |
|---|---|---|---|---|---|---|---|---|---|---|
${rows.join('\n')}

상태 정의: ${reg.$schema}
`
const out = resolve(root, 'docs/PAGE_REGISTRY.md')
if (process.argv.includes('--check')) {
  if (!existsSync(out) || readFileSync(out, 'utf8') !== md) { console.error('✗ docs/PAGE_REGISTRY.md가 최신이 아닙니다. `npm run registry`'); process.exit(1) }
  console.log('✓ 페이지 레지스트리 문서 최신')
} else { writeFileSync(out, md); console.log(`✓ PAGE_REGISTRY.md 생성 · ${reg.pages.length}개 페이지`) }
