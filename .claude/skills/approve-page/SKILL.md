---
name: approve-page
description: 사용자가 페이지(또는 컨셉·섹션)를 확정했을 때 확정 범위·버전을 기록하고 기준 디자인으로 지정한다. "메인 확정", "전자세금계산서 페이지 확정", "A안으로 확정" 등.
---
# approve-page

1. 확정 대상과 범위를 명확히 한다: 기획 확정인지 디자인 확정인지, 어떤 컨셉/섹션 안인지. 모호하면 한 번만 질문(AskUserQuestion), 다른 후보를 임의로 섞지 않는다.
2. `app/data/page-registry.json`: `status.plan`/`status.design` 갱신, `approvedVersion` = `v<날짜>-<짧은 git sha>`, `concepts`를 확정안만 남기거나 메모, `updated`.
3. 컨셉 확정 시 코드 정리: 확정안만 남기고 탈락안은 `docs/DECISIONS.md`에 기록(삭제 코드는 git 이력으로 보존). `?concept` 분기 제거 여부는 사용자에게 확인.
4. `docs/DECISIONS.md` 확정 표·`docs/CHANGELOG.md`·`docs/PROJECT_STATUS.md` 갱신, `npm run registry`.
5. git 태그 제안(`approve/<page>-<date>`) — push는 허용 브랜치에서만.
