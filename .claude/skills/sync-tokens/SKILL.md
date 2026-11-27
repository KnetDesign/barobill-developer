---
name: sync-tokens
description: Figma Variables와 design-tokens/tokens.json, 생성 CSS를 동기화하고 충돌을 감지한다. "토큰 동기화", "피그마 변수 반영", 브랜드 컬러·라운드·폰트 변경 요청 시 사용.
---
# sync-tokens

원칙: **원본은 `design-tokens/tokens.json`**. 양방향 자동 덮어쓰기 금지 — 승인된 쪽에서 다른 쪽으로 한 방향씩.

## Figma → 코드 (디자인팀이 변수를 수정한 경우)
1. `figma:figma-use` 로드 → `use_figma`로 컬렉션 `BB Primitives`, `BB Semantic` 변수를 읽어 JSON으로 덤프(이름·모드별 값·별칭·variableId).
2. `node scripts/tokens/import-figma.mjs <dump.json>` 실행 → tokens.json과 비교해 *변경 / 신규 / Figma에서 삭제 / 충돌* 보고. 충돌 = 같은 토큰이 코드에서도 바뀐 경우(`$extensions.sync.lastSynced`와 둘 다 다름).
3. 충돌 없으면 `--apply`로 tokens.json 갱신 → `npm run tokens` → `npm run tokens:check`(대비 AA 포함) → 시각 검수.
## 코드 → Figma (개발 중 제안·최초 시드)
1. 제안은 `docs/DECISIONS.md`에 기록하고 사용자 승인 후 진행.
2. `design-tokens/figma-variables.json`(npm run tokens가 생성)을 읽어 `use_figma`로 변수 생성/갱신: 모드 Light/Dark, 별칭 유지, Code Syntax(WEB) = CSS 변수. 생성된 variableId를 tokens.json `$extensions.figma.variableId`에 기록.
## 공통
- 매핑 확인: `design-tokens/mapping.json`, 문서 `docs/DESIGN_TOKENS.md`(자동 생성).
- 확정 페이지에 시각 영향이 크면 적용 전 영향 범위 보고·승인.
