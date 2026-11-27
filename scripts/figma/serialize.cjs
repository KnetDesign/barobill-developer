/**
 * 실제 렌더링된 페이지 → 자체 완결 HTML (Figma html_to_figma 업로드용)
 * 사용: node scripts/figma/serialize.cjs <url> <out.html> [width]
 *  - 모든 CSS를 <style>로 인라인, 스크립트 제거, 애니메이션 정지, 폰트 이름 Figma용으로 정규화
 */
const { chromium } = require('playwright')
const fs = require('node:fs')
;(async () => {
  const [,, url, out, w = '1440'] = process.argv
  const b = await chromium.launch()
  const p = await b.newPage({ viewport: { width: +w, height: 900 } })
  await p.goto(url, { waitUntil: 'networkidle', timeout: 90000 })
  await p.waitForTimeout(800)
  const html = await p.evaluate(() => {
    let css = ''
    for (const s of document.styleSheets) { try { for (const r of s.cssRules) css += r.cssText + '\n' } catch {} }
    css = css.replace(/"Pretendard Variable",\s*/g, '')
    css += '\n*{animation:none!important;transition:none!important}header{position:relative!important}'
    const doc = document.documentElement.cloneNode(true)
    doc.querySelectorAll('script,link,noscript,iframe').forEach(n => n.remove())
    doc.querySelectorAll('style').forEach(n => n.remove())
    const head = doc.querySelector('head')
    const st = document.createElement('style'); st.textContent = css; head.appendChild(st)
    return '<!doctype html>' + doc.outerHTML
  })
  fs.writeFileSync(out, html)
  console.log(out, (html.length / 1024).toFixed(0) + 'KB')
  await b.close()
})()
