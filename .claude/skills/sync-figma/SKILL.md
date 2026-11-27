---
name: sync-figma
description: 지정된 Figma 파일·프레임의 변경(레이아웃·변수·컴포넌트)을 분석해 Nuxt 코드에 필요한 부분만 반영한다. "피그마 수정한 거 반영해 줘", figma.com 링크를 받았을 때 사용.
---
# sync-figma

전제: Figma MCP 연결(`mcp__Figma__whoami`로 확인). `use_figma` 전 `figma:figma-use` 스킬, `get_design_context` 전 `figma:figma-design-to-code` 스킬을 반드시 로드.

1. URL에서 fileKey·nodeId 추출 → `create_session` → `get_screenshot` + `get_design_context`(+ 필요 시 `get_variable_defs`).
2. 대상 페이지를 레지스트리에서 찾기(`figma.fileKey/nodeId`). 없으면 등록.
3. **비교**: 현재 코드 화면(`npm run qa:smoke -- --routes=<route>` 스크린샷)과 Figma 스크린샷을 나란히 보고 차이를 *레이아웃 / 간격 / 타이포 / 색(변수) / 컴포넌트 / 카피*로 정리.
4. **변수 변경**은 직접 CSS를 고치지 말고 `sync-tokens` 흐름으로 처리.
5. **코드 반영**: Figma가 주는 React/Tailwind 코드는 참고만. 기존 Vue 컴포넌트·시맨틱 클래스·`component-map.json` 이름으로 변환. 확정 페이지는 변경분만.
6. 검수(`design-qa`) → 레지스트리 상태 갱신 → CHANGELOG. 화면설계와 충돌하는 Figma 변경은 반영 전 사용자 확인.
