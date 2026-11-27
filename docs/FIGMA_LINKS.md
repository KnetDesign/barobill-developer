# FIGMA LINKS

| 용도 | 파일 / 노드 | 상태 |
|---|---|---|
| Nuxt UI v4 공식 Kit (Community) | https://go.nuxt.com/figma-ui · https://www.figma.com/community/file/1544369209862884086/nuxt-ui-v4 | 참조 전용 — 원본 수정 금지, 사본/라이브러리로 사용 |
| 디자인팀 탐색 파일 「바로빌개발자센터-Design System」 | `e6m1Ho9axKVvw8uR70Nx3D` (Cover · Change Log · Documentation · Concept · 01 Foundations · 02 Patterns · 03 Core Components · 04 Dev Components · 05 Templates · Handoff) | 탐색 자료 — 읽기 전용 분석(`docs/figma/DS_ANALYSIS.md`), 원본 수정 없음 |
| **사이트 리뉴얼 작업 파일** 「261127_바로빌개발자센터_사이트리뉴얼」 | `ajX49szVrasTlY1awTMPD6` — Cover(공식 로고 1:6) · Change Log · Concept · Page 4(1:34) | Claude 작업 페이지 = **Page 4** (사용자 지정) |
| 메인 컨셉 A | `ajX49szVrasTlY1awTMPD6` node `4:2` | 코드→Figma 임포트(1280, Light), 편집 가능 레이어 · 변수 미연결 |
| 메인 컨셉 B | `ajX49szVrasTlY1awTMPD6` node `5:2` | 동일 |

## 연결 상태 (2026-11-27 확인)
- Figma MCP: 연결됨 · 계정 `knet` · (주)케이넷 Organization · Full seat · admin
- Variables 쓰기: MCP `use_figma`(Plugin API)로 가능 — Variables REST API(Enterprise 전용) 없이도 MCP 경유로 읽기·쓰기
- 레지스트리 연동: 페이지별 `figma.fileKey/nodeId`를 `app/data/page-registry.json`에 기록하면 Studio에 Figma 바로가기 표시

## Code → Figma 전송 방법 (검증됨 2026-11-27)
`node scripts/figma/serialize.cjs <url> <out.html> [width]` → MCP `html_to_figma`(대상 nodeId=1:34) submitUrl에 POST. 네트워크 허용 호스트 `mcp.figma.com`, `www.figma.com` 필요(환경에 추가됨). 결과는 픽셀 정확한 일반 레이어 — 변수·컴포넌트 연결은 별도(use_figma).
- 확인된 제약: 임포트 폭이 1280으로 고정되어 들어옴(1440 지정 무시). 1440/모바일 프레임은 후속 확인.
