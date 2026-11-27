---
name: build-page
description: 확정된 메인·공통 디자인 시스템을 기준으로 다음 페이지를 화면설계서에서 분석해 Nuxt로 구현한다. "다음 페이지 진행해 줘", "○○ 페이지 만들어 줘".
---
# build-page

1. 대상 선정: 사용자가 지정한 페이지, 없으면 레지스트리에서 `기획 확정` & 개발 `미착수` 중 우선순위(Phase 3: 1-1 → 1-4/1-5).
2. 스펙 읽기: `docs/wireframe/PRODUCT.md`/`SUBPAGES.md` 해당 블록 + 필요 시 `docs/wireframe/source.html`을 브라우저로 열어 해당 `#p-…` 섹션 스크린샷 확인. 레퍼런스 `docs/wireframe/ref/`.
3. 품질 기준 먼저 적기(콘텐츠 누락 0, 반응형 360~1920, Light/Dark, AA 대비, 키보드 탐색).
4. 구현: 기존 컴포넌트·`SectionHead`·시맨틱 클래스·토큰만 사용. 상품 상세처럼 반복되는 골격은 공통 컴포넌트로 분리(`app/components/product/`). 미확정 카피는 `ConfirmTag`. 라우트는 레지스트리 `route`.
5. 레지스트리 상태 `개발 구현`, components 목록 기록 → `npm run registry`.
6. `design-qa` 실행 후 결과와 확인 필요 항목 보고.
