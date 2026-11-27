# DESIGN TOKENS

> ⚠ 자동 생성 문서 — `npm run tokens`로 갱신. 원본은 `design-tokens/tokens.json`.
> 버전 0.2.0 · 출처: code-seed (Figma 미동기화)
> brand 팔레트는 공식 barobill developers 로고(Figma 261127 파일 Cover)의 #3369E7·#3B72FF·#0033A1에서 확장(2026-11-27). 단계 보간값은 디렉터 제안 — 디자인팀 확인 필요.

## 구조
- **Primitive**: 브랜드/뉴트럴 팔레트, 폰트, 라운드, 간격 단위 → Tailwind `@theme` (`bg-brand-600`, `text-ink-500` …). 페이지 코드에서 직접 쓰는 것은 지양(그래픽 예외).
- **Semantic**: 역할 중심, Light/Dark 모드별 값. Nuxt UI 변수(`--ui-*`)를 그대로 쓰고, 부족한 브랜드 역할만 `--bb-*`로 확장.
- **Component**: 포커스 링, 라운드, 헤더 높이, 콘텐츠 폭.
- **브랜드 다크 섹션(`bg-brand-surface`)과 사이트 다크모드(`.dark`)는 별개**. 라이트 모드에서도 히어로는 어둡다.

## Semantic · Component 매핑
| 토큰 | Figma 변수 | CSS 변수 | Tailwind | Light | Dark | 용도 |
|---|---|---|---|---|---|---|
| `semantic.color.primary` | Color/Primary | `--ui-primary` | `bg-primary / text-primary` | {primitive.color.brand.600}<br>#3369e7 | {primitive.color.brand.400}<br>#6592ff | 주 행동(CTA)·강조 채움 |
| `semantic.color.text.dimmed` | Color/Text/Dimmed | `--ui-text-dimmed` | `text-dimmed` | {primitive.color.ink.400}<br>#98a2b0 | {primitive.color.ink.500}<br>#5f6a79 | 가장 약한 글자 |
| `semantic.color.text.muted` | Color/Text/Muted | `--ui-text-muted` | `text-muted` | {primitive.color.ink.500}<br>#5f6a79 | {primitive.color.ink.400}<br>#98a2b0 | 보조 글자·캡션 |
| `semantic.color.text.toned` | Color/Text/Toned | `--ui-text-toned` | `text-toned` | {primitive.color.ink.600}<br>#4d5765 | {primitive.color.ink.300}<br>#c5ccd5 | 본문 설명 |
| `semantic.color.text.default` | Color/Text/Default | `--ui-text` | `text-default` | {primitive.color.ink.700}<br>#374150 | {primitive.color.ink.200}<br>#dfe3e8 | 기본 글자 |
| `semantic.color.text.highlighted` | Color/Text/Highlighted | `--ui-text-highlighted` | `text-highlighted` | {primitive.color.ink.950}<br>#0a0f18 | {primitive.color.white}<br>#ffffff | 제목·강조 글자 |
| `semantic.color.text.inverted` | Color/Text/Inverted | `--ui-text-inverted` | `text-inverted` | {primitive.color.white}<br>#ffffff | {primitive.color.ink.950}<br>#0a0f18 | 반전 면 위 글자 |
| `semantic.color.text.accent` | Color/Text/Accent | `--bb-accent` | `text-accent` | {primitive.color.brand.700}<br>#2652c7 | {primitive.color.brand.300}<br>#93b4ff | 브랜드 글자·링크·눈썹·아이콘 |
| `semantic.color.bg.default` | Color/Background/Default | `--ui-bg` | `bg-default` | {primitive.color.white}<br>#ffffff | {primitive.color.ink.950}<br>#0a0f18 | 페이지 배경 |
| `semantic.color.bg.muted` | Color/Background/Muted | `--ui-bg-muted` | `bg-muted` | {primitive.color.ink.50}<br>#f6f7f9 | {primitive.color.ink.900}<br>#141b26 | 연한 면(섹션 구분) |
| `semantic.color.bg.elevated` | Color/Background/Elevated | `--ui-bg-elevated` | `bg-elevated` | {primitive.color.ink.100}<br>#eef0f3 | {primitive.color.ink.800}<br>#222b38 | 떠 있는 면·칩 |
| `semantic.color.bg.accented` | Color/Background/Accented | `--ui-bg-accented` | `bg-accented` | {primitive.color.ink.200}<br>#dfe3e8 | {primitive.color.ink.700}<br>#374150 | 더 진한 면 |
| `semantic.color.bg.inverted` | Color/Background/Inverted | `--ui-bg-inverted` | `bg-inverted` | {primitive.color.ink.900}<br>#141b26 | {primitive.color.white}<br>#ffffff | 반전 면 |
| `semantic.color.bg.accentSoft` | Color/Background/Accent Soft | `--bb-accent-soft` | `bg-accent-soft` | {primitive.color.brand.50}<br>#eef4ff | #13213f<br>#13213f | 브랜드 연한 면(아이콘 배경 등) |
| `semantic.color.bg.brandSurface` | Color/Surface/Brand Dark | `--bb-surface-brand` | `bg-brand-surface` | {primitive.color.navy.900}<br>#0b1424 | {primitive.color.navy.800}<br>#111d33 | 브랜드 다크 섹션 면(히어로·02-1·하단 CTA). 사이트 다크모드와 별개로 라이트에서도 어두움 |
| `semantic.color.bg.brandSurfaceRaised` | Color/Surface/Brand Dark Raised | `--bb-surface-brand-raised` | `bg-brand-surface-raised` | {primitive.color.navy.800}<br>#111d33 | {primitive.color.navy.700}<br>#16243f | 브랜드 다크 섹션 안의 패널 |
| `semantic.color.border.default` | Color/Border/Default | `--ui-border` | `border-default` | {primitive.color.ink.200}<br>#dfe3e8 | {primitive.color.ink.800}<br>#222b38 | 기본 테두리·구분선 |
| `semantic.color.border.muted` | Color/Border/Muted | `--ui-border-muted` | `border-muted` | {primitive.color.ink.100}<br>#eef0f3 | {primitive.color.ink.800}<br>#222b38 | 약한 구분선 |
| `semantic.color.border.accented` | Color/Border/Accented | `--ui-border-accented` | `border-accented` | {primitive.color.ink.300}<br>#c5ccd5 | {primitive.color.ink.700}<br>#374150 | 강한 테두리·hover |
| `semantic.color.border.inverted` | Color/Border/Inverted | `--ui-border-inverted` | `border-inverted` | {primitive.color.ink.900}<br>#141b26 | {primitive.color.white}<br>#ffffff | 반전 테두리 |
| `semantic.color.border.accent` | Color/Border/Accent | `--bb-accent-line` | `border-accent-line` | {primitive.color.brand.300}<br>#93b4ff | {primitive.color.brand.700}<br>#2652c7 | 브랜드 테두리(hover·선택) |
| `component.focusRing` | Component/Focus Ring | `--bb-focus-ring` | — | {primitive.color.brand.500}<br>#3b72ff | {primitive.color.brand.400}<br>#6592ff | 키보드 포커스 링 |
| `component.radius.default` | Radius/Default | `--ui-radius` | — | {primitive.radius.md}<br>8px | —<br> | Nuxt UI 기본 라운드(버튼·입력) |
| `component.radius.card` | Radius/Card | `--bb-radius-card` | — | {primitive.radius.lg}<br>12px | —<br> | 카드·패널 |
| `component.header.height` | Layout/Header Height | `--ui-header-height` | — | 64px<br>64px | —<br> |  |
| `component.container.content` | Layout/Content Width | `--bb-content` | — | 1216px<br>1216px | —<br> | 1440 기준 콘텐츠 폭(좌우 112) |
| `component.container.wide` | Layout/Content Width Max | `--bb-content-wide` | — | 1376px<br>1376px | —<br> | 1440 초과 시 최대 콘텐츠 폭 |

## Primitive
| 토큰 | 값 |
|---|---|
| `primitive.color.brand.50` | #eef4ff |
| `primitive.color.brand.100` | #dce7ff |
| `primitive.color.brand.200` | #bfd3ff |
| `primitive.color.brand.300` | #93b4ff |
| `primitive.color.brand.400` | #6592ff |
| `primitive.color.brand.500` | #3b72ff |
| `primitive.color.brand.600` | #3369e7 |
| `primitive.color.brand.700` | #2652c7 |
| `primitive.color.brand.800` | #0033a1 |
| `primitive.color.brand.900` | #0b2a7a |
| `primitive.color.brand.950` | #0a1a4a |
| `primitive.color.ink.50` | #f6f7f9 |
| `primitive.color.ink.100` | #eef0f3 |
| `primitive.color.ink.200` | #dfe3e8 |
| `primitive.color.ink.300` | #c5ccd5 |
| `primitive.color.ink.400` | #98a2b0 |
| `primitive.color.ink.500` | #5f6a79 |
| `primitive.color.ink.600` | #4d5765 |
| `primitive.color.ink.700` | #374150 |
| `primitive.color.ink.800` | #222b38 |
| `primitive.color.ink.900` | #141b26 |
| `primitive.color.ink.950` | #0a0f18 |
| `primitive.color.white` | #ffffff |
| `primitive.color.navy.700` | #16243f |
| `primitive.color.navy.800` | #111d33 |
| `primitive.color.navy.900` | #0b1424 |
| `primitive.color.sky.500` | #00aeff |
| `primitive.font.family.sans` | "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, "Apple SD Gothic Neo", "Malgun Gothic", sans-serif |
| `primitive.font.family.mono` | "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace |
| `primitive.radius.xs` | 4px |
| `primitive.radius.sm` | 6px |
| `primitive.radius.md` | 8px |
| `primitive.radius.lg` | 12px |
| `primitive.radius.xl` | 16px |
| `primitive.space.unit` | 8px |

## 대비 검사 (WCAG 2.1 AA, 본문 4.5:1)
| 모드 | 글자 | 배경 | 대비 | 결과 |
|---|---|---|---|---|
| light | semantic.color.text.default | semantic.color.bg.default | 10.32 | 통과 |
| light | semantic.color.text.toned | semantic.color.bg.default | 7.33 | 통과 |
| light | semantic.color.text.muted | semantic.color.bg.default | 5.49 | 통과 |
| light | semantic.color.text.accent | semantic.color.bg.default | 6.74 | 통과 |
| light | semantic.color.text.accent | semantic.color.bg.muted | 6.29 | 통과 |
| light | semantic.color.text.muted | semantic.color.bg.muted | 5.12 | 통과 |
| light | button label | semantic.color.primary | 4.87 | 통과 |
| dark | semantic.color.text.default | semantic.color.bg.default | 14.88 | 통과 |
| dark | semantic.color.text.toned | semantic.color.bg.default | 11.85 | 통과 |
| dark | semantic.color.text.muted | semantic.color.bg.default | 7.43 | 통과 |
| dark | semantic.color.text.accent | semantic.color.bg.default | 9.33 | 통과 |
| dark | semantic.color.text.accent | semantic.color.bg.muted | 8.41 | 통과 |
| dark | semantic.color.text.muted | semantic.color.bg.muted | 6.69 | 통과 |
| dark | button label | semantic.color.primary | 6.5 | 통과 |
| any | #ffffff | brandSurface | 18.42 | 통과 |
