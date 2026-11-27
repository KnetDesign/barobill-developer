/**
 * 디자인 QA 스모크 테스트: 핵심 페이지 × 화면 폭 × Light/Dark
 *  - 콘솔 오류 / 페이지 오류
 *  - 가로 스크롤(레이아웃 넘침)
 *  - 스크린샷 저장 (.qa/)
 * 사용: BASE_URL=http://localhost:3000 node scripts/qa/smoke.cjs [--routes=/,/studio] [--widths=360,768,1440]
 */
const { chromium } = require('playwright')
const fs = require('node:fs')
const arg = (k, d) => (process.argv.find(a => a.startsWith(`--${k}=`)) || '').split('=')[1] || d
const BASE = process.env.BASE_URL || 'http://localhost:3000'
const routes = arg('routes', '/').split(',')
const widths = arg('widths', '360,768,1024,1440').split(',').map(Number)
const themes = arg('themes', 'light,dark').split(',')
const concepts = arg('concepts', 'a,b').split(',')
;(async () => {
  fs.mkdirSync('.qa', { recursive: true })
  const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {})
  const fails = []
  for (const r of routes) for (const c of concepts) for (const t of themes) for (const w of widths) {
    const page = await browser.newPage({ viewport: { width: w, height: 900 } })
    const errs = []
    page.on('console', m => m.type() === 'error' && errs.push(m.text()))
    page.on('pageerror', e => errs.push(e.message))
    const url = `${BASE}${r}${r.includes('?') ? '&' : '?'}concept=${c}&theme=${t}&clean=1`
    const res = await page.goto(url, { waitUntil: 'networkidle', timeout: 90000 })
    await page.waitForTimeout(300)
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
    const name = `${r.replace(/\W+/g, '_') || 'root'}_${c}_${t}_${w}`
    await page.screenshot({ path: `.qa/${name}.png`, fullPage: true })
    const problems = []
    if (!res || res.status() >= 400) problems.push(`HTTP ${res && res.status()}`)
    if (overflow > 1) problems.push(`가로 넘침 ${overflow}px`)
    if (errs.length) problems.push(`콘솔 오류 ${errs.length}: ${errs[0].slice(0, 120)}`)
    console.log(`${problems.length ? '✗' : '✓'} ${name}${problems.length ? ' — ' + problems.join(' / ') : ''}`)
    if (problems.length) fails.push(name)
    await page.close()
  }
  await browser.close()
  console.log(`\n${fails.length ? `✗ ${fails.length}건 실패` : '✓ 전체 통과'} · 스크린샷 .qa/`)
  process.exit(fails.length ? 1 : 0)
})()
