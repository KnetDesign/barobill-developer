# PROJECT STATUS

갱신 2026-11-27 · 버전 v0.1

## 현재 단계
**Phase 3 · 핵심 페이지 시안** — 메인 컨셉 A/B 구현 완료(검토 대기). 동시에 디자인 시스템 연계·자동화 환경 1차 구축.

## 완료
- Phase 1: 저장소 초기화(Nuxt 4.7 · Nuxt UI 4.13 · Tailwind 4.3 · TS · Pretendard), 화면설계서(27개 페이지 식별자) 로컬 보관·빌드 스펙 3종 추출(`docs/wireframe/*.md`)
- 공통: 헤더·메가메뉴(A안)·모바일 서랍·로그인 후 Mock·푸터(REF-051 구성)
- 메인 전 섹션 01~06 · 컨셉 A/B · 반응형(360~1920) · Light/Dark
- 디자인 토큰 파이프라인(`tokens.json` → CSS/매핑/Figma 변수 JSON/문서, 대비 검사)
- 페이지 레지스트리(JSON) → Studio 메뉴·상태·문서 자동 생성
- BAROBILL Design Studio(`/studio`): 페이지·컨셉·A|B 비교·폭 8종·Light/Dark/System·로그인 Mock·사이트맵·전체 화면·실제 사이트 모드·화면설계서/Figma 링크, 디자인 가이드(`/studio/guide`)
- QA: typecheck·build 통과, 스모크 테스트(메인 × 4폭 × 2모드 × 2컨셉 = 16건) 통과
- Skills 7종, GitHub Actions CI

## 검수 결과 (자체, 2026-11-27)
- 통과: 빌드/타입, 가로 넘침 없음, 콘솔 오류 없음, 토큰 대비 AA(본문) 전 항목 통과
- 남은 문제: 브랜드 컬러 가안 · 로고 가안 · 고객사 로고 워드마크 대체 · 히어로/카드 실사 이미지 없음(그래픽으로 대체) · 02-2/02-3 B판 카피는 원문 부재로 안 D 문구 활용
- 미실시: 스크린리더 실기 테스트, 실제 사용자 테스트, Lighthouse 성능

## 다음 작업
1. 사용자: 메인 컨셉 A/B 선택(섹션별 혼합 여부 포함) → `approve-page`
2. Figma: 바로빌 라이브러리 파일에 토큰 Variables 생성(코드→Figma 1회 시드) · 메인 확정안 프레임화
3. Phase 3 계속: 전자세금계산서(1-1), 카드(1-4)/계좌(1-5) 상세
4. 배포: Preview 호스팅 결정(DEPLOYMENT_GUIDE의 선택지) 및 연결
