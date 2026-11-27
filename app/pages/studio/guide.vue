<script setup lang="ts">
/** 디자인 가이드 — 토큰(mapping.json)과 컴포넌트 매핑을 실제 렌더링으로 확인. 검토 전용(운영 제외). */
import mapping from '../../../design-tokens/mapping.json'
import componentMap from '~/data/component-map.json'

definePageMeta({ layout: 'default' })
useHead({ title: '디자인 가이드 · BAROBILL Design Studio' })
const colorMode = useColorMode()

const groups = computed(() => {
  const g: Record<string, typeof mapping> = {}
  for (const m of mapping) { const k = m.token.split('.').slice(0, 3).join('.'); (g[k] ||= []).push(m) }
  return g
})
const type = [
  ['text-display', 'Display 48/60', '기술의 연결, 더 큰 비즈니스 가치'],
  ['text-h1', 'H1 40/52', '바로빌 API 지금 무료로 시작하세요'],
  ['text-h2', 'H2 32/40', '연동 후, 운영은 바로빌이 함께 합니다'],
  ['text-h3', 'H3 22/32', '업무 자동화'],
  ['text-title', 'Title 18/28', '파트너 등록 즉시 인증키 발급'],
  ['text-body', 'Body 16/24', '테스트·운영 인증키가 함께 발급됩니다.'],
  ['text-small', 'Small 14/20', '파트너 등록 후 콘솔에서 단가를 확인할 수 있습니다.'],
  ['text-caption', 'Caption 12/16', '2026년 11월 조사 기준'],
  ['text-eyebrow', 'Eyebrow 14/24', 'WHY BAROBILL']
]
const acc = [{ label: '아코디언 항목', content: '한 번에 하나만 펼쳐지고 첫 항목이 기본으로 열립니다.', value: '0' }, { label: '닫힌 항목', content: '내용', value: '1' }]
</script>

<template>
  <div class="bb-container bb-section">
    <div class="flex flex-wrap items-end justify-between gap-4">
      <div>
        <p class="text-eyebrow text-accent">BAROBILL Design Studio</p>
        <h1 class="mt-3 text-h1">디자인 가이드</h1>
        <p class="mt-3 text-body text-toned">원본 <code class="font-mono text-small">design-tokens/tokens.json</code> → <code class="font-mono text-small">npm run tokens</code>로 CSS·매핑·문서 생성. 이 화면은 생성된 값을 그대로 렌더링합니다.</p>
      </div>
      <UColorModeSelect class="w-40" />
    </div>

    <h2 class="mt-16 text-h3">Color · Semantic ({{ colorMode.value }})</h2>
    <div v-for="(items, g) in groups" :key="g" class="mt-6">
      <p class="text-small font-bold text-muted">{{ g }}</p>
      <div class="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div v-for="m in items" :key="m.token" class="flex items-center gap-3 rounded-lg border border-default p-3">
          <span class="size-10 shrink-0 rounded-md ring-1 ring-default" :style="{ background: `var(${m.cssVar})` }" />
          <span class="min-w-0 text-caption">
            <b class="block truncate text-small text-highlighted">{{ m.figma }}</b>
            <code class="block truncate font-mono text-muted">{{ m.cssVar }}</code>
            <span v-if="m.tailwind" class="block truncate text-muted">{{ m.tailwind }}</span>
          </span>
        </div>
      </div>
    </div>

    <h2 class="mt-16 text-h3">Typography · Pretendard</h2>
    <div class="mt-6 divide-y divide-default border-y border-default">
      <div v-for="t in type" :key="t[0]" class="grid gap-2 py-4 md:grid-cols-[200px_1fr] md:items-baseline">
        <span class="text-caption text-muted"><b class="text-small text-highlighted">{{ t[1] }}</b><br><code class="font-mono">{{ t[0] }}</code></span>
        <span :class="t[0]" class="text-highlighted">{{ t[2] }}</span>
      </div>
    </div>

    <h2 class="mt-16 text-h3">Components · 상태</h2>
    <div class="mt-6 grid gap-8 lg:grid-cols-2">
      <div class="rounded-xl border border-default p-6">
        <p class="text-small font-bold text-muted">UButton</p>
        <div class="mt-4 flex flex-wrap gap-3">
          <UButton size="xl">테스트 시작하기</UButton>
          <UButton size="xl" color="neutral" variant="outline">견적 문의</UButton>
          <UButton size="xl" variant="soft">Soft</UButton>
          <UButton size="xl" loading>Loading</UButton>
          <UButton size="xl" disabled>Disabled</UButton>
        </div>
        <div class="mt-4 flex flex-wrap gap-3 rounded-lg bg-brand-surface p-4">
          <UButton size="xl">다크 면 · 주</UButton>
          <UButton size="xl" color="neutral" variant="outline" class="bg-transparent text-white ring-white/40 hover:bg-white/10">다크 면 · 보조</UButton>
        </div>
      </div>
      <div class="rounded-xl border border-default p-6">
        <p class="text-small font-bold text-muted">UAccordion · UBadge · UAlert</p>
        <UAccordion class="mt-2" :items="acc" default-value="0" />
        <div class="mt-4 flex flex-wrap gap-2"><UBadge>Primary</UBadge><UBadge color="neutral" variant="subtle">Neutral</UBadge><UBadge color="success" variant="subtle">Success</UBadge><UBadge color="warning" variant="subtle">Warning</UBadge><UBadge color="error" variant="subtle">Error</UBadge></div>
        <UAlert class="mt-4" color="info" variant="subtle" icon="i-tabler-info-circle" title="Mock 상태" description="실제 API·가입·결제와 연결되지 않은 검토용 화면입니다." />
      </div>
    </div>

    <h2 class="mt-16 text-h3">Figma ↔ Nuxt UI ↔ Vue 컴포넌트 매핑</h2>
    <div class="mt-6 overflow-x-auto rounded-xl border border-default">
      <table class="w-full min-w-[720px] text-left text-small">
        <thead class="bg-muted text-caption text-muted"><tr><th class="p-3">Figma 컴포넌트</th><th class="p-3">Nuxt UI</th><th class="p-3">Vue 경로</th><th class="p-3">사용처</th></tr></thead>
        <tbody class="divide-y divide-default">
          <tr v-for="c in componentMap.components" :key="c.figma"><td class="p-3 font-semibold text-highlighted">{{ c.figma }}</td><td class="p-3 font-mono text-caption">{{ c.nuxtUi ?? '—' }}</td><td class="p-3 font-mono text-caption">{{ c.vue }}</td><td class="p-3 text-toned">{{ c.usedIn }}</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
