# DEPLOYMENT GUIDE

## 현재 상태 (2026-11-27, 사실)
- 저장소: `knetdesign/barobill-developer` (기존 저장소 사용, 신규 생성 없음)
- 이 클라우드 세션의 push 권한: 세션 지정 브랜치 `claude/dazzling-wozniak-tsfktx`만. `design-preview`·`main`은 사용자 승인 후 생성/병합.
- CI: `.github/workflows/ci.yml` — 토큰 정합성 → 레지스트리 정합성 → typecheck → build → 스모크 QA(스크린샷 아티팩트). 실패 시 머지·배포 대상으로 보지 않는다.
- **Preview 호스팅: 미연결.** 이 세션에서는 외부 호스팅 계정 연결(OAuth)이 불가하고, 회사 계정 결정이 필요함.

## 권장 구조
| 환경 | 브랜치 | URL | 반영 |
|---|---|---|---|
| Design Preview | `design-preview` | 고정 주소 1개 (예: design-barobill-dev.<호스팅>) | 브랜치 push 시 최신 성공 빌드로 교체 |
| Feature Preview | `feature/*`, `design/*`, PR | 브랜치/PR별 임시 주소 | 자동 |
| Production | `main` | 운영 도메인 | **수동 승인 후**만 (검토 환경과 분리) |

## 호스팅 선택지 (비교·제안)
| 서비스 | Nuxt 호환 | 비공개 저장소 | 접근 보호 | 비고 |
|---|---|---|---|---|
| **Vercel (권장)** | 공식 zero-config | 지원 | Pro 이상 Deployment Protection(팀 로그인/비밀번호) | 상업적 사용은 Pro 필요. 브랜치별 고정 alias로 Design Preview 주소 고정 가능 |
| Cloudflare Pages | 프리셋 지원 | 지원 | Cloudflare Access(사내 이메일 도메인 제한, 소규모 무료) | 보안 정책상 사내 접근 제한에 유리 |
| Netlify | 지원 | 지원 | 비밀번호 보호는 유료 | |
| GitHub Pages | `nuxt generate` 정적 | 비공개 저장소는 유료 플랜, **사이트는 공개** | 없음 | 내부 자료 노출 위험 → 비권장 |

## 사용자가 직접 해야 하는 일 (한 번만)
1. 호스팅 서비스 선택(위 표) 후 회사 계정으로 GitHub 저장소 연결(OAuth 승인).
2. Production Branch를 `main`으로, Preview 보호(팀 로그인/Access) 켜기.
3. `design-preview` 브랜치 생성 허용 여부를 알려주기 → 이후 "사이트 업데이트해 줘"로 Claude가 merge·push·URL 확인까지 진행.

## 로컬/세션 미리보기
- `npm run dev` → http://localhost:3000 · Studio http://localhost:3000/studio · 가이드 /studio/guide
- 빌드 확인: `npm run build && node .output/server/index.mjs`

## 롤백
- 호스팅의 "이전 배포로 되돌리기" 사용(코드 revert 없이 즉시). 운영은 태그(`vX.Y`) 기준 재배포.

## 비밀값
- `.env*`는 `.gitignore`. 실제 API 키·고객 데이터·미승인 로고 파일은 저장소에 두지 않는다. 필요한 키는 호스팅 환경 변수로.
