<script setup lang="ts">
/**
 * BAROBILL Design Studio — 실제 Nuxt 페이지를 iframe으로 띄워
 * 페이지 · 컨셉 · 화면 폭을 바꿔 가며 검토하는 환경. (운영 코드와 분리)
 * URL 상태: /studio?page=/&concept=a&w=1440&compare=0
 */
import { onKeyStroke, useElementSize } from '@vueuse/core'
import { studioPages } from '~/utils/site'

definePageMeta({ layout: 'studio' })
useHead({ title: 'BAROBILL Design Studio' })

const STUDIO = { name: 'BAROBILL Design Studio', project: '2026 바로빌 개발자센터 리뉴얼', version: 'v0.1', status: 'Phase 3 · 핵심 페이지 시안' }
const WIDTHS = [360, 640, 768, 1024, 1280, 1440, 1920] as const

const route = useRoute()
const router = useRouter()

const page = ref(String(route.query.page ?? '/'))
const concept = ref<'a' | 'b'>(route.query.concept === 'b' ? 'b' : 'a')
const compare = ref(route.query.compare === '1')
const width = ref<number | 'fit'>(route.query.w === 'fit' ? 'fit' : Number(route.query.w) || 1440)
const zoomFit = ref(route.query.zoom !== '100')
const authed = ref(route.query.auth === '1')
const theme = ref<'light' | 'dark' | 'system'>(route.query.theme === 'dark' ? 'dark' : route.query.theme === 'system' ? 'system' : 'light')
const reload = ref(0)

watch([page, concept, compare, width, zoomFit, authed, theme], () => {
  router.replace({ query: { theme: theme.value, page: page.value, concept: concept.value, w: String(width.value), compare: compare.value ? '1' : undefined, zoom: zoomFit.value ? undefined : '100', auth: authed.value ? '1' : undefined } })
})

const allItems = computed(() => studioPages.flatMap(g => g.items.map(i => ({ ...i, group: g.label }))))
const selectItems = computed(() => studioPages.map(g => g.items.map(i => ({ label: i.label, value: i.to, ready: i.ready, group: g.label }))))
const current = computed(() => allItems.value.find(i => i.to === page.value))

function frameSrc(c: 'a' | 'b') {
  const q = new URLSearchParams({ concept: c, studio: '1', auth: authed.value ? '1' : '0', theme: theme.value })
  return `${page.value}?${q.toString()}`
}

/* iframe 내부 이동을 상단 페이지 선택과 동기화 */
const frameKey = computed(() => `${page.value}|${authed.value}|${theme.value}|${reload.value}`)
function onFrameLoad(e: Event) {
  try {
    const p = (e.target as HTMLIFrameElement).contentWindow?.location.pathname
    if (p && p !== page.value && !p.startsWith('/studio')) page.value = p
  } catch { /* cross-origin 무시 */ }
}

/* 화면 폭 · 축소 */
const stage = ref<HTMLElement>()
const { width: stageW, height: stageH } = useElementSize(stage)
const cols = computed(() => (compare.value ? 2 : 1))
const slotW = computed(() => Math.max(0, (stageW.value - 48 - (cols.value - 1) * 24) / cols.value))
const frameW = computed(() => (width.value === 'fit' ? slotW.value : width.value))
const scale = computed(() => (zoomFit.value && width.value !== 'fit' && frameW.value > slotW.value ? slotW.value / frameW.value : 1))
const frameH = computed(() => Math.max(400, (stageH.value - 48) / scale.value))

/* 전체 화면 */
const fullscreen = ref(false)
onKeyStroke('Escape', () => (fullscreen.value = false))

const sitemapOpen = ref(false)
function go(to: string) { page.value = to; sitemapOpen.value = false }

const realSiteUrl = computed(() => `${page.value}?concept=${concept.value}&theme=${theme.value}&clean=1`)
const entry = computed(() => current.value?.entry)
const statusColor = (v: string) => (v.includes('확정') || v.includes('QA') ? 'success' : v.includes('진행') || v.includes('구현') || v.includes('검토') ? 'warning' : v.includes('업데이트') ? 'error' : 'neutral') as 'success' | 'warning' | 'error' | 'neutral'
const figmaUrl = computed(() => entry.value?.figma?.fileKey ? `https://www.figma.com/design/${entry.value.figma.fileKey}/?node-id=${(entry.value.figma.nodeId ?? '').replace(':', '-')}` : null)
</script>

<template>
  <div class="flex h-full flex-col">
    <!-- ===== Studio top bar ===== -->
    <header v-show="!fullscreen" class="z-10 shrink-0 border-b border-ink-800 bg-ink-950 text-white">
      <div class="flex h-12 items-center gap-3 px-4">
        <span class="grid size-6 place-items-center rounded bg-brand-600 text-[11px] font-black">B</span>
        <div class="flex min-w-0 items-baseline gap-2">
          <span class="text-small font-bold">{{ STUDIO.name }}</span>
          <span class="hidden truncate text-caption text-white/50 md:inline">{{ STUDIO.project }}</span>
        </div>
        <UBadge color="neutral" variant="subtle" size="sm" class="bg-white/10 text-white/80">{{ STUDIO.version }}</UBadge>
        <UBadge color="warning" variant="subtle" size="sm" class="hidden sm:inline-flex">{{ STUDIO.status }}</UBadge>
        <div class="ml-auto flex items-center gap-1">
          <UButton to="/studio/guide" size="sm" color="neutral" variant="ghost" icon="i-tabler-palette" class="text-white/80 hover:bg-white/10 hover:text-white">디자인 가이드</UButton>
          <UButton size="sm" color="neutral" variant="ghost" icon="i-tabler-sitemap" class="text-white/80 hover:bg-white/10 hover:text-white" @click="sitemapOpen = true">사이트맵</UButton>
          <UButton :to="realSiteUrl" target="_blank" size="sm" color="neutral" variant="ghost" icon="i-tabler-external-link" class="text-white/80 hover:bg-white/10 hover:text-white">실제 사이트 모드</UButton>
        </div>
      </div>

      <div class="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-white/10 px-4 py-2">
        <!-- 페이지 선택 -->
        <USelectMenu
          v-model="page"
          :items="selectItems"
          value-key="value"
          :search-input="{ placeholder: '페이지 검색' }"
          size="sm"
          class="w-64"
          :ui="{ base: 'bg-white/10 text-white ring-white/15', trailingIcon: 'text-white/60' }"
        >
          <template #leading><UIcon name="i-tabler-file" class="size-4 text-white/60" /></template>
          <template #item-label="{ item }">
            <span class="flex items-center gap-2">{{ item.label }}
              <UBadge v-if="item.ready" size="sm" color="success" variant="subtle">시안</UBadge>
              <UBadge v-else size="sm" color="neutral" variant="outline">준비 중</UBadge>
            </span>
          </template>
        </USelectMenu>

        <!-- 컨셉 전환 -->
        <div class="flex items-center gap-1.5">
          <span class="text-caption text-white/50">컨셉</span>
          <div class="flex rounded-md bg-white/10 p-0.5" role="radiogroup" aria-label="디자인 컨셉">
            <button v-for="c in (['a','b'] as const)" :key="c" type="button" role="radio" :aria-checked="!compare && concept === c" class="h-7 rounded px-3 text-caption font-bold transition-colors" :class="!compare && concept === c ? 'bg-white text-ink-950' : 'text-white/70 hover:text-white'" @click="concept = c; compare = false">
              {{ c.toUpperCase() }}
            </button>
            <button type="button" role="radio" :aria-checked="compare" class="h-7 rounded px-3 text-caption font-bold transition-colors" :class="compare ? 'bg-white text-ink-950' : 'text-white/70 hover:text-white'" @click="compare = true">A | B 비교</button>
          </div>
        </div>

        <!-- 화면 폭 -->
        <div class="flex items-center gap-1.5">
          <span class="text-caption text-white/50">화면 폭</span>
          <div class="flex flex-wrap rounded-md bg-white/10 p-0.5">
            <button v-for="w in WIDTHS" :key="w" type="button" class="h-7 rounded px-2 text-caption font-semibold tabular-nums transition-colors" :class="width === w ? 'bg-white text-ink-950' : 'text-white/70 hover:text-white'" :aria-pressed="width === w" @click="width = w">{{ w }}</button>
            <button type="button" class="h-7 rounded px-2 text-caption font-semibold transition-colors" :class="width === 'fit' ? 'bg-white text-ink-950' : 'text-white/70 hover:text-white'" :aria-pressed="width === 'fit'" @click="width = 'fit'">창 맞춤</button>
          </div>
        </div>

        <!-- 컬러 모드 -->
        <div class="flex items-center gap-1.5">
          <span class="text-caption text-white/50">모드</span>
          <div class="flex rounded-md bg-white/10 p-0.5">
            <button v-for="m in ([['light','Light','i-tabler-sun'],['dark','Dark','i-tabler-moon'],['system','System','i-tabler-device-desktop']] as const)" :key="m[0]" type="button" class="flex h-7 items-center gap-1 rounded px-2 text-caption font-semibold transition-colors" :class="theme === m[0] ? 'bg-white text-ink-950' : 'text-white/70 hover:text-white'" :aria-pressed="theme === m[0]" @click="theme = m[0]"><UIcon :name="m[2]" class="size-3.5" />{{ m[1] }}</button>
          </div>
        </div>

        <div class="ml-auto flex items-center gap-3">
          <USwitch v-model="zoomFit" size="sm" label="축소 보기" :ui="{ label: 'text-caption text-white/70' }" />
          <USwitch v-model="authed" size="sm" label="로그인 상태" :ui="{ label: 'text-caption text-white/70' }" />
          <UTooltip text="새로고침"><UButton size="sm" color="neutral" variant="ghost" icon="i-tabler-refresh" class="text-white/80 hover:bg-white/10" aria-label="새로고침" @click="reload++" /></UTooltip>
          <UTooltip text="전체 화면 (Esc로 복귀)"><UButton size="sm" color="neutral" variant="ghost" icon="i-tabler-maximize" class="text-white/80 hover:bg-white/10" aria-label="전체 화면" @click="fullscreen = true" /></UTooltip>
        </div>
      </div>
    </header>

    <!-- ===== Stage ===== -->
    <div ref="stage" class="relative flex-1 overflow-auto p-6">
      <div v-if="entry" class="mb-3 flex flex-wrap items-center gap-x-4 gap-y-2 rounded-md bg-white px-3 py-2 text-caption text-ink-700 ring-1 ring-ink-200">
        <b class="text-small text-ink-950">{{ entry.name }}</b>
        <span class="font-mono text-ink-500">{{ entry.route }}</span>
        <span class="flex items-center gap-1">기획 <UBadge size="sm" variant="subtle" :color="statusColor(entry.status.plan)">{{ entry.status.plan }}</UBadge></span>
        <span class="flex items-center gap-1">디자인 <UBadge size="sm" variant="subtle" :color="statusColor(entry.status.design)">{{ entry.status.design }}</UBadge></span>
        <span class="flex items-center gap-1">개발 <UBadge size="sm" variant="subtle" :color="statusColor(entry.status.dev)">{{ entry.status.dev }}</UBadge></span>
        <span class="text-ink-500">승인 버전 {{ entry.approvedVersion ?? '—' }} · 갱신 {{ entry.updated }}</span>
        <span class="ml-auto flex items-center gap-3">
          <a v-if="entry.wireframe.url" :href="entry.wireframe.url" target="_blank" rel="noopener" class="flex items-center gap-1 font-semibold text-brand-700 hover:underline"><UIcon name="i-tabler-layout" class="size-3.5" />화면설계서</a>
          <a v-if="figmaUrl" :href="figmaUrl" target="_blank" rel="noopener" class="flex items-center gap-1 font-semibold text-brand-700 hover:underline"><UIcon name="i-tabler-brand-figma" class="size-3.5" />Figma</a>
          <span v-else class="text-ink-400">Figma 미연결</span>
        </span>
        <p v-if="entry.notes" class="basis-full text-ink-500">{{ entry.notes }}</p>
      </div>
      <div v-if="current && !current.ready" class="mb-3 flex items-center gap-2 rounded-md border border-amber-300 bg-amber-50 px-3 py-2 text-small text-amber-900">
        <UIcon name="i-tabler-info-circle" class="size-4" /> '{{ current.label }}'는 아직 시안 제작 전입니다. 공통 골격만 표시됩니다.
      </div>
      <div class="flex justify-center gap-6">
        <div v-for="c in (compare ? (['a','b'] as const) : [concept])" :key="c + frameKey" class="shrink-0" :style="{ width: `${frameW * scale}px` }">
          <div class="mb-2 flex items-center justify-between text-caption text-ink-600">
            <span class="font-bold">컨셉 {{ c.toUpperCase() }} <span class="font-normal text-ink-500">· {{ c === 'a' ? '신뢰·명료 (화면 중심)' : '연결·도식 (그래픽 중심)' }}</span></span>
            <span class="tabular-nums">{{ Math.round(frameW) }}px<template v-if="scale < 1"> · {{ Math.round(scale * 100) }}%</template></span>
          </div>
          <div class="overflow-hidden rounded-md bg-white shadow-[0_0_0_1px_rgba(10,15,24,.08),0_8px_24px_rgba(10,15,24,.08)]" :style="{ height: `${frameH * scale}px` }">
            <iframe
              :src="frameSrc(c)"
              :title="`${current?.label ?? page} · 컨셉 ${c.toUpperCase()}`"
              class="block origin-top-left border-0 bg-white"
              :style="{ width: `${frameW}px`, height: `${frameH}px`, transform: `scale(${scale})` }"
              @load="onFrameLoad"
            />
          </div>
        </div>
      </div>
      <UButton v-if="fullscreen" class="fixed right-4 top-4 z-20" color="neutral" icon="i-tabler-minimize" @click="fullscreen = false">전체 화면 종료</UButton>
    </div>

    <!-- ===== Sitemap ===== -->
    <UModal v-model:open="sitemapOpen" title="전체 사이트맵" description="화면설계서 기준 페이지 구성 · 시안 제작 현황" :ui="{ content: 'max-w-4xl' }">
      <template #body>
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div v-for="g in studioPages" :key="g.label">
            <p class="mb-2 text-caption font-bold text-ink-500">{{ g.label }}</p>
            <ul class="space-y-0.5">
              <li v-for="i in g.items" :key="i.to">
                <button type="button" class="flex w-full items-center justify-between rounded px-2 py-1.5 text-left text-small hover:bg-ink-50" :class="page === i.to && 'bg-brand-50 text-brand-800'" @click="go(i.to)">
                  <span>{{ i.label }}</span>
                  <span class="size-2 rounded-full" :class="i.ready ? 'bg-emerald-500' : 'bg-ink-300'" :aria-label="i.ready ? '시안' : '준비 중'" />
                </button>
              </li>
            </ul>
          </div>
        </div>
      </template>
    </UModal>
  </div>
</template>
