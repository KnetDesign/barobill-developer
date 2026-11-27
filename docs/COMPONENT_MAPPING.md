# COMPONENT MAPPING

- 기계 판독 원본: `app/data/component-map.json` (디자인 가이드 `/studio/guide` 하단 표로 렌더링)
- 규칙: Figma 컴포넌트 이름 = 이 표의 `figma` 값. 같은 컴포넌트를 디자인/개발에서 다른 이름으로 부르지 않는다.

## Nuxt UI 공식 컴포넌트 ↔ 페이지 요구사항
| Nuxt UI | 쓰는 곳 | 메모 |
|---|---|---|
| UButton | 전 페이지 CTA | 다크 면 보조 버튼은 `bg-transparent text-white ring-white/40` |
| UAccordion | 메인 02-1·02-2·02-3(A판)·05 FAQ, 모바일 메뉴 | type single, 기본 첫 항목 열림 |
| UDropdownMenu | GNB 고객지원·리소스, 로그인 후 프로필·콘솔 메뉴 | |
| USlideover | 1024 미만 메뉴 패널 | <640 풀폭, 640~1023 폭 400 |
| UTooltip | 검토 태그 | |
| UBadge / UAlert | 상태 표시, Mock 안내 | |
| UColorModeSelect | 디자인 가이드 | 사이트 노출 위치는 미정(GNB 변경 = 기획 변경이라 보류) |
| UStepper | 메인 02-4 | 정적 요구(진행 상태 없음) → 같은 구조의 정적 마크업으로 구현 |
| UPageHero / UPageSection / UPageCard / UPageGrid / UPageCTA / UPageLogos | 메인 01·03·06 | 화면설계 치수(7:5, 6:6, 1216 그리드)와 슬롯 구조 차이가 커서 현재는 커스텀 섹션. 상품 상세(반복 템플릿)에서 재평가 |
| UTabs | 상품 상세 코드 탭, 04 B판 로고 탭 | 04 B판은 탭 높이 고정 요구로 커스텀 |
| UTable / UPricingTable | 요금 안내 | Phase 4 |
| UForm / UAuthForm | 이용문의·회원가입·탈퇴 | Phase 4 |

## 바로빌 커스텀 컴포넌트
`SectionHead`(눈썹·H2·리드, split/stack/center) · `ConfirmTag`(검토 전용) · `AppHeader` · `AppFooter` · `AppLogo` · `Home*` 섹션 10종.

## Code Connect
- Figma 계정: Organization 플랜 · Full seat · admin (2026-11-27 MCP `whoami` 확인) → Code Connect 사용 가능 조건.
- Vue/Nuxt 매핑은 공식 지원 범위 확인 후 적용. 그 전까지 이 표 + Figma 변수 Code Syntax(WEB = CSS 변수)로 대체.
