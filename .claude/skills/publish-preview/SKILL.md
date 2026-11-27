---
name: publish-preview
description: 변경 사항을 검수한 뒤 허용된 검토 브랜치에 커밋·푸시하고 CI·Preview URL을 확인해 전달한다. "사이트 업데이트해 줘", "올려 줘".
---
# publish-preview

1. `git status`/diff로 변경 파일 확인 — 비밀값·고객 데이터·미승인 로고 파일 제외.
2. 확정 페이지 영향 검토 → `design-qa` 핵심 단계(최소 `npm run check`, `npm run build`, 스모크 QA).
3. `docs/CHANGELOG.md` 갱신, 커밋 메시지: `<type>(<scope>): <요약>` + 변경 요약.
4. Push: 세션이 허용한 브랜치로만(`git push -u origin <branch>`, 네트워크 오류 시 최대 4회 재시도). `design-preview`/`main` 반영은 사용자 승인 후 merge.
5. CI 결과 확인(GitHub MCP `actions_list`/`get_job_logs`). 실패 버전을 최신 정상본으로 안내하지 않는다.
6. Preview URL은 `docs/DEPLOYMENT_GUIDE.md`의 호스팅이 연결된 경우에만 실제 접속 확인 후 전달. 미연결이면 그 사실과 브랜치/커밋 링크를 전달.
