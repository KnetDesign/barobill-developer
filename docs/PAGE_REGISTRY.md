# PAGE REGISTRY

> ⚠ 자동 생성 — 원본 `app/data/page-registry.json` · 갱신 `npm run registry`. Design Studio 메뉴·상태 배지도 같은 원본을 씁니다.
> 화면설계서: https://claude.ai/artifact/Pmisymx82VPD4n1Xt8pcBW (로컬 사본 `docs/wireframe/source.html`, 페이지 식별자 27개, 확인 2026-11-27)

- 기획: 기획 확정 1 · 기획 검토 26 · 기획 대기 3
- 디자인: 디자인 진행 1 · 기획 대기 29
- 개발: 개발 구현 1 · 미착수 29

| ID | 페이지 | Route | 화면설계서 | Figma (file / node) | 기획 | 디자인 | 개발 | 승인 버전 | 갱신 | 메모 |
|---|---|---|---|---|---|---|---|---|---|---|
| `main` | 메인 | `/` | [#p-main](https://claude.ai/artifact/Pmisymx82VPD4n1Xt8pcBW#p-main) | ajX49szVrasTlY1awTMPD6 / 4:2 | 기획 확정 | 디자인 진행 | 개발 구현 | — | 2026-11-27 | 화면설계 확정안(2026-11-27 H1 확정) 기준. 레이아웃 미선택 섹션은 컨셉 A/B로 비교 중. 미확정 카피·정책은 docs/DECISIONS.md 참조. Figma Page 4에 컨셉 A(4:2)·B(5:2) 1280 코드 임포트(편집 가능 레이어, 변수 미연결). |
| `api-rules` | 상품 상세 공통 규칙 | — | [#p-api-rules](https://claude.ai/artifact/Pmisymx82VPD4n1Xt8pcBW#p-api-rules) | — | 기획 검토 | 기획 대기 | 미착수 | — | 2026-11-27 | 라우트 없음(템플릿 규칙) |
| `api` | 1-1 전자세금계산서 발행 | `/api/tax-invoice` | [#p-api](https://claude.ai/artifact/Pmisymx82VPD4n1Xt8pcBW#p-api) | — | 기획 검토 | 기획 대기 | 미착수 | — | 2026-11-27 | Phase 3 우선 제작 대상 |
| `cashbill` | 1-2 현금영수증 발행 | `/api/cash-receipt` | [#p-cashbill](https://claude.ai/artifact/Pmisymx82VPD4n1Xt8pcBW#p-cashbill) | — | 기획 검토 | 기획 대기 | 미착수 | — | 2026-11-27 |  |
| `hometax` | 1-3 홈택스 매입매출조회 | `/api/hometax` | [#p-hometax](https://claude.ai/artifact/Pmisymx82VPD4n1Xt8pcBW#p-hometax) | — | 기획 검토 | 기획 대기 | 미착수 | — | 2026-11-27 |  |
| `card` | 1-4 카드 통합 조회 | `/api/card` | [#p-card](https://claude.ai/artifact/Pmisymx82VPD4n1Xt8pcBW#p-card) | — | 기획 검토 | 기획 대기 | 미착수 | — | 2026-11-27 | Phase 3 우선 제작 대상 |
| `bank` | 1-5 계좌 통합 조회 | `/api/bank-account` | [#p-bank](https://claude.ai/artifact/Pmisymx82VPD4n1Xt8pcBW#p-bank) | — | 기획 검토 | 기획 대기 | 미착수 | — | 2026-11-27 | Phase 3 우선 제작 대상 |
| `corp` | 1-6 사업자등록상태조회 | `/api/business-status` | [#p-corp](https://claude.ai/artifact/Pmisymx82VPD4n1Xt8pcBW#p-corp) | — | 기획 검토 | 기획 대기 | 미착수 | — | 2026-11-27 |  |
| `sms` | 1-7 문자 전송 | `/api/sms` | [#p-sms](https://claude.ai/artifact/Pmisymx82VPD4n1Xt8pcBW#p-sms) | — | 기획 검토 | 기획 대기 | 미착수 | — | 2026-11-27 | 화면설계: 내용 채우기 전 게시 불가 |
| `kakao` | 1-8 카카오 메시지 전송 | `/api/kakao` | [#p-kakao](https://claude.ai/artifact/Pmisymx82VPD4n1Xt8pcBW#p-kakao) | — | 기획 검토 | 기획 대기 | 미착수 | — | 2026-11-27 |  |
| `fax` | 1-9 팩스 전송 | `/api/fax` | [#p-fax](https://claude.ai/artifact/Pmisymx82VPD4n1Xt8pcBW#p-fax) | — | 기획 검토 | 기획 대기 | 미착수 | — | 2026-11-27 |  |
| `holder` | 1-10 예금주 성명·실명 조회 | `/api/account-holder` | [#p-holder](https://claude.ai/artifact/Pmisymx82VPD4n1Xt8pcBW#p-holder) | — | 기획 검토 | 기획 대기 | 미착수 | — | 2026-11-27 |  |
| `third` | 1-11 제3자세금계산서발급사실조회 | `/api/third-party-issuance` | [#p-third](https://claude.ai/artifact/Pmisymx82VPD4n1Xt8pcBW#p-third) | — | 기획 검토 | 기획 대기 | 미착수 | — | 2026-11-27 |  |
| `edoc` | 1-12 전자문서 | `/api/e-document` | [#p-edoc](https://claude.ai/artifact/Pmisymx82VPD4n1Xt8pcBW#p-edoc) | — | 기획 검토 | 기획 대기 | 미착수 | — | 2026-11-27 | 화면설계: 내용 채우기 전 게시 불가 |
| `onprem` | 1-13 전자세금계산서 구축형 | `/api/tax-invoice-onpremise` | [#p-onprem](https://claude.ai/artifact/Pmisymx82VPD4n1Xt8pcBW#p-onprem) | — | 기획 검토 | 기획 대기 | 미착수 | — | 2026-11-27 |  |
| `sol-work` | 회계·경비 데이터 수집 | `/solutions/accounting-data` | [#p-sol-work](https://claude.ai/artifact/Pmisymx82VPD4n1Xt8pcBW#p-sol-work) | — | 기획 검토 | 기획 대기 | 미착수 | — | 2026-11-27 |  |
| `sol-sales` | 매출증빙 발행 | `/solutions/sales-evidence` | — | — | 기획 대기 | 기획 대기 | 미착수 | — | 2026-11-27 | 화면설계 없음 · 템플릿 재사용 예정 |
| `sol-settle` | 입금 확인·정산 | `/solutions/settlement` | — | — | 기획 대기 | 기획 대기 | 미착수 | — | 2026-11-27 | 화면설계 없음 · 템플릿 재사용 예정 |
| `sol-saas` | SaaS·플랫폼에 탑재 | `/solutions/platform` | [#p-sol-saas](https://claude.ai/artifact/Pmisymx82VPD4n1Xt8pcBW#p-sol-saas) | — | 기획 검토 | 기획 대기 | 미착수 | — | 2026-11-27 |  |
| `resell` | 재판매 | `/solutions/resell` | [#p-resell](https://claude.ai/artifact/Pmisymx82VPD4n1Xt8pcBW#p-resell) | — | 기획 검토 | 기획 대기 | 미착수 | — | 2026-11-27 |  |
| `sol-si` | SI·외주 구축 | `/solutions/si` | — | — | 기획 대기 | 기획 대기 | 미착수 | — | 2026-11-27 | 화면설계 없음 · 템플릿 재사용 예정 |
| `docs` | API 개발 문서 | `/docs/guides/structure` | [#p-docs](https://claude.ai/artifact/Pmisymx82VPD4n1Xt8pcBW#p-docs) | — | 기획 검토 | 기획 대기 | 미착수 | — | 2026-11-27 |  |
| `mcp` | AI 에이전트 연결 | `/docs/guides/ai-tools` | [#p-mcp](https://claude.ai/artifact/Pmisymx82VPD4n1Xt8pcBW#p-mcp) | — | 기획 검토 | 기획 대기 | 미착수 | — | 2026-11-27 |  |
| `pricing` | 요금 안내 | `/pricing` | [#p-pricing](https://claude.ai/artifact/Pmisymx82VPD4n1Xt8pcBW#p-pricing) | — | 기획 검토 | 기획 대기 | 미착수 | — | 2026-11-27 |  |
| `support` | FAQ · 고객사례 | `/support/faq` | [#p-support](https://claude.ai/artifact/Pmisymx82VPD4n1Xt8pcBW#p-support) | — | 기획 검토 | 기획 대기 | 미착수 | — | 2026-11-27 |  |
| `contact` | 이용문의 | `/support/contact` | [#p-contact](https://claude.ai/artifact/Pmisymx82VPD4n1Xt8pcBW#p-contact) | — | 기획 검토 | 기획 대기 | 미착수 | — | 2026-11-27 |  |
| `proposal` | 제안서 다운로드 | `/support/proposal` | [#p-proposal](https://claude.ai/artifact/Pmisymx82VPD4n1Xt8pcBW#p-proposal) | — | 기획 검토 | 기획 대기 | 미착수 | — | 2026-11-27 |  |
| `notice` | 공지사항 | `/support/notices` | [#p-notice](https://claude.ai/artifact/Pmisymx82VPD4n1Xt8pcBW#p-notice) | — | 기획 검토 | 기획 대기 | 미착수 | — | 2026-11-27 |  |
| `signup` | 회원가입 | `/signup` | [#p-signup](https://claude.ai/artifact/Pmisymx82VPD4n1Xt8pcBW#p-signup) | — | 기획 검토 | 기획 대기 | 미착수 | — | 2026-11-27 |  |
| `leave` | 탈퇴 | `/account/leave` | [#p-leave](https://claude.ai/artifact/Pmisymx82VPD4n1Xt8pcBW#p-leave) | — | 기획 검토 | 기획 대기 | 미착수 | — | 2026-11-27 |  |

상태 정의: 상태 값: plan=기획 대기|기획 검토|기획 확정 · design=기획 대기|디자인 진행|디자인 검토|디자인 확정|업데이트 필요 · dev=미착수|개발 구현|QA 완료|업데이트 필요
