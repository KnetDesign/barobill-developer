# FIGMA LINKS

| 용도 | 파일 / 노드 | 상태 |
|---|---|---|
| Nuxt UI v4 공식 Kit (Community) | https://go.nuxt.com/figma-ui · https://www.figma.com/community/file/1544369209862884086/nuxt-ui-v4 | 참조 전용 — 원본 수정 금지, 사본/라이브러리로 사용 |
| 바로빌 디자인 시스템 라이브러리 | (미생성) | 다음 작업: 토큰 Variables 시드(BB Primitives / BB Semantic Light·Dark) |
| 메인 확정안 | (미생성) | 컨셉 선택 후 프레임화 |

## 연결 상태 (2026-11-27 확인)
- Figma MCP: 연결됨 · 계정 `knet` · (주)케이넷 Organization · Full seat · admin
- Variables 쓰기: MCP `use_figma`(Plugin API)로 가능 — Variables REST API(Enterprise 전용) 없이도 MCP 경유로 읽기·쓰기
- 레지스트리 연동: 페이지별 `figma.fileKey/nodeId`를 `app/data/page-registry.json`에 기록하면 Studio에 Figma 바로가기 표시
