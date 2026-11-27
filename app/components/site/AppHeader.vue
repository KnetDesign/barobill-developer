<script setup lang="ts">
import { onKeyStroke, useWindowScroll } from '@vueuse/core'
import { productGroups, solutionGroups, supportItems, contact } from '~/utils/site'

const props = defineProps<{ transparent?: boolean }>()
const isAuthed = useMockAuth()
const route = useRoute()

/* ---------- 메가메뉴 (≥1024) ---------- */
const megaOpen = ref(false)
let closeTimer: ReturnType<typeof setTimeout> | undefined
const megaPanel = ref<HTMLElement>()
const megaTrigger = ref<HTMLElement>()

function openMega() { clearTimeout(closeTimer); megaOpen.value = true }
function scheduleClose() { clearTimeout(closeTimer); closeTimer = setTimeout(() => (megaOpen.value = false), 120) }
function closeMega(focusTrigger = false) {
  megaOpen.value = false
  if (focusTrigger) megaTrigger.value?.focus()
}
function onTriggerKey(e: KeyboardEvent) {
  if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
    e.preventDefault()
    megaOpen.value = true
    nextTick(() => megaPanel.value?.querySelector<HTMLElement>('a')?.focus())
  }
}
function onPanelFocusOut(e: FocusEvent) {
  const next = e.relatedTarget as Node | null
  if (next && (megaPanel.value?.contains(next) || megaTrigger.value?.contains(next))) return
  megaOpen.value = false
}
onKeyStroke('Escape', () => { if (megaOpen.value) closeMega(true) })
watch(() => route.fullPath, () => { megaOpen.value = false; drawerOpen.value = false })

const isProductRoute = computed(() => route.path.startsWith('/api/') || route.path.startsWith('/solutions'))

/* ---------- 고객지원 드롭다운 ---------- */
const supportMenu = computed(() => [supportItems.map(i => ({ label: i.label, to: i.to }))])

/* ---------- 로그인 후 (Mock) ---------- */
const mockUser = { email: 'user@company.com', company: '(주)회사명' }
const partners = [
  { name: '(주)파트너A', id: 'PARTNER_A01' },
  { name: '(주)파트너B', id: 'PARTNER_B02' }
]
const consoleMenu = computed(() => [
  [{ label: '파트너 콘솔 선택', type: 'label' as const }],
  partners.map(p => ({ label: p.name, description: p.id, icon: 'i-tabler-building', to: '#' })),
  [{ label: '전체 파트너 목록 →', to: '#' }]
])
const profileMenu = computed(() => [
  [{ label: mockUser.email, description: mockUser.company, type: 'label' as const }],
  [{ label: '정보수정', icon: 'i-tabler-user-edit', to: '#' }, { label: '로그아웃', icon: 'i-tabler-logout', to: '?auth=0' }]
])

/* ---------- 모바일 패널 (<1024) ---------- */
const drawerOpen = ref(false)
const accOpen = ref(false)
const openGroups = ref<Record<string, boolean>>({})
function toggleGroup(k: string) { openGroups.value[k] = !openGroups.value[k] }

/* 스크롤 시 헤더 경계선 */
const { y } = useWindowScroll()
const solid = computed(() => !props.transparent || y.value > 8 || megaOpen.value)
</script>

<template>
  <header
    class="sticky top-0 z-50 transition-colors duration-200"
    :class="solid ? 'bg-default/95 backdrop-blur supports-[backdrop-filter]:bg-default/85 border-b border-default' : 'bg-transparent border-b border-transparent'"
  >
    <div class="mx-auto flex h-16 max-w-[1440px] items-center gap-[22px] px-4 sm:px-6 lg:px-8 min-[1440px]:max-w-[calc(1376px+64px)]">
      <NuxtLink to="/" aria-label="바로빌 개발자센터 홈" class="shrink-0 rounded-sm">
        <AppLogo :inverse="!solid" />
      </NuxtLink>

      <!-- Desktop GNB -->
      <nav aria-label="주 메뉴" class="hidden lg:flex self-stretch flex-1 items-stretch gap-8 ml-4">
        <div class="flex items-stretch" @mouseenter="openMega" @mouseleave="scheduleClose">
          <button
            ref="megaTrigger"
            type="button"
            class="relative flex items-center gap-1 text-body font-semibold transition-colors"
            :class="[solid ? 'text-highlighted hover:text-accent' : 'text-white hover:text-white/80', (megaOpen || isProductRoute) && solid ? 'text-accent' : '']"
            :aria-expanded="megaOpen"
            aria-controls="mega-panel"
            aria-haspopup="true"
            @keydown="onTriggerKey"
            @click="megaOpen = !megaOpen"
          >
            API 소개
            <UIcon name="i-tabler-chevron-down" class="size-4 transition-transform duration-200" :class="megaOpen && 'rotate-180'" />
            <span v-if="megaOpen || isProductRoute" class="absolute inset-x-0 bottom-0 h-0.5" :class="solid ? 'bg-primary' : 'bg-default'" />
          </button>
        </div>
        <NuxtLink to="/docs" class="flex items-center text-body font-semibold transition-colors" :class="solid ? 'text-highlighted hover:text-accent' : 'text-white hover:text-white/80'" active-class="!text-accent">API 개발 문서</NuxtLink>
        <NuxtLink to="/pricing" class="flex items-center text-body font-semibold transition-colors" :class="solid ? 'text-highlighted hover:text-accent' : 'text-white hover:text-white/80'" active-class="!text-accent">요금 안내</NuxtLink>
        <UDropdownMenu :items="supportMenu" :content="{ align: 'start', sideOffset: 14 }" :ui="{ content: 'min-w-52' }">
          <button type="button" class="flex items-center gap-1 text-body font-semibold transition-colors" :class="solid ? 'text-highlighted hover:text-accent' : 'text-white hover:text-white/80'">
            고객지원·리소스 <UIcon name="i-tabler-chevron-down" class="size-4" />
          </button>
        </UDropdownMenu>
      </nav>

      <div class="ml-auto flex items-center gap-2">
        <template v-if="!isAuthed">
          <UButton to="/login" variant="ghost" :color="solid ? 'neutral' : 'neutral'" size="lg" class="hidden lg:inline-flex" :class="!solid && 'text-white hover:bg-white/10'">로그인</UButton>
          <UButton to="/signup" size="lg" class="max-sm:hidden">테스트 시작하기</UButton>
        </template>
        <template v-else>
          <UDropdownMenu :items="profileMenu" :content="{ align: 'end' }" class="hidden lg:flex">
            <button type="button" class="hidden lg:flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-elevated" :class="!solid && 'text-white hover:bg-white/10'">
              <UAvatar size="sm" text="회" class="bg-accent-soft text-accent" />
              <span class="hidden xl:flex flex-col text-left leading-tight">
                <span class="text-small font-semibold">{{ mockUser.email }}</span>
                <span class="text-caption text-muted">{{ mockUser.company }}</span>
              </span>
              <UIcon name="i-tabler-chevron-down" class="size-4" />
            </button>
          </UDropdownMenu>
          <UDropdownMenu :items="consoleMenu" :content="{ align: 'end' }" :ui="{ content: 'min-w-64' }">
            <UButton size="lg" trailing-icon="i-tabler-chevron-down" class="max-sm:hidden">콘솔 바로가기</UButton>
          </UDropdownMenu>
        </template>
        <UButton
          class="lg:hidden"
          :color="'neutral'"
          variant="ghost"
          size="lg"
          icon="i-tabler-menu-2"
          aria-label="메뉴 열기"
          :ui="{ leadingIcon: 'size-6' }"
          :class="!solid && 'text-white hover:bg-white/10'"
          @click="drawerOpen = true"
        />
      </div>
    </div>

    <!-- ===== Mega menu panel (A안: 그룹 + 텍스트 링크 + 문서 카드) ===== -->
    <Transition
      enter-active-class="transition duration-200 ease-out-soft"
      enter-from-class="opacity-0 -translate-y-1"
      leave-active-class="transition duration-150"
      leave-to-class="opacity-0"
    >
      <div
        v-show="megaOpen"
        id="mega-panel"
        ref="megaPanel"
        class="absolute inset-x-0 top-full hidden lg:block border-b border-default bg-default"
        @mouseenter="openMega"
        @mouseleave="scheduleClose"
        @focusout="onPanelFocusOut"
      >
        <div class="mx-auto max-w-[1440px] px-8 pt-10 pb-8 min-[1440px]:max-w-[calc(1376px+64px)]">
          <div class="flex flex-wrap items-start gap-y-6 pl-[154px] max-xl:pl-[154px]">
            <!-- 상품 3열 -->
            <div>
              <p class="mb-2 text-caption font-bold tracking-[0.04em] text-muted">API 상품 소개 · 13개</p>
              <div class="flex gap-4 xl:gap-6">
                <div v-for="g in productGroups" :key="g.label" :class="g.label === '데이터 조회·수집' ? 'w-[232px]' : g.label === '문서 발행' ? 'w-[176px]' : 'w-[152px]'">
                  <p class="h-8 text-small font-bold text-highlighted">{{ g.label }}</p>
                  <ul>
                    <li v-for="it in g.items" :key="it.to">
                      <NuxtLink :to="it.to" class="-mx-2 flex h-9 items-center whitespace-nowrap rounded-sm px-2 text-body text-default transition-colors hover:bg-muted hover:text-accent focus-visible:bg-muted">
                        {{ it.label }}
                      </NuxtLink>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="mx-8 h-[300px] w-px self-stretch bg-accented min-[1440px]:mx-12" aria-hidden="true" />
            <!-- 상황별 솔루션 -->
            <div class="w-[192px]">
              <p class="mb-2 text-caption font-bold tracking-[0.04em] text-muted">상황별 솔루션</p>
              <div v-for="(g, gi) in solutionGroups" :key="g.label" :class="gi > 0 && 'mt-4'">
                <p class="h-8 text-small font-bold text-highlighted">{{ g.label }}</p>
                <ul>
                  <li v-for="it in g.items" :key="it.to">
                    <NuxtLink :to="it.to" class="-mx-2 flex h-9 items-center whitespace-nowrap rounded-sm px-2 text-body text-default transition-colors hover:bg-muted hover:text-accent focus-visible:bg-muted">
                      {{ it.label }}
                    </NuxtLink>
                  </li>
                </ul>
              </div>
            </div>
            <!-- 문서 카드 (≥1440 오른쪽 / 미만은 아래 줄 왼쪽) -->
            <div class="basis-full min-[1440px]:basis-auto min-[1440px]:ml-12 min-[1440px]:self-end">
              <NuxtLink to="/docs" class="group flex w-[344px] items-center gap-4 rounded-lg border border-default px-6 py-5 transition-colors hover:border-accent-line hover:bg-accent-soft">
                <span class="grid size-10 shrink-0 place-items-center rounded-md bg-accent-soft text-accent">
                  <UIcon name="i-tabler-file-code" class="size-6" />
                </span>
                <span class="min-w-0">
                  <span class="block text-caption font-bold text-muted">API 개발 문서</span>
                  <span class="mt-0.5 flex items-center gap-1 text-body font-semibold text-highlighted">연동에 필요한 문서를 한곳에서 <UIcon name="i-tabler-arrow-right" class="size-4 transition-transform group-hover:translate-x-0.5" /></span>
                </span>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </header>

  <!-- 메가메뉴 열림 시 아래 화면 어둡게 -->
  <Transition enter-active-class="transition-opacity duration-200" enter-from-class="opacity-0" leave-active-class="transition-opacity duration-150" leave-to-class="opacity-0">
    <div v-if="megaOpen" class="fixed inset-0 z-40 hidden bg-black/50 lg:block" aria-hidden="true" @click="closeMega()" />
  </Transition>

  <!-- ===== Mobile / Tablet panel (<1024) ===== -->
  <USlideover
    v-model:open="drawerOpen"
    side="right"
    title="메뉴"
    :close="false"
    :ui="{ content: 'w-full sm:max-w-[400px] divide-y-0', header: 'hidden', body: 'p-0 sm:p-0', footer: 'p-0' }"
  >
    <template #body>
      <div class="flex h-16 items-center justify-between px-4 sm:px-6">
        <AppLogo />
        <UButton color="neutral" variant="ghost" icon="i-tabler-x" aria-label="메뉴 닫기" size="lg" :ui="{ leadingIcon: 'size-6' }" @click="drawerOpen = false" />
      </div>
      <div class="px-4 pb-4 sm:px-6">
        <div v-if="!isAuthed" class="grid max-w-[352px] grid-cols-2 gap-2">
          <UButton to="/login" color="neutral" variant="outline" size="lg" block>로그인</UButton>
          <UButton to="/signup" size="lg" block>테스트 시작하기</UButton>
        </div>
        <template v-else>
          <div class="flex items-center gap-3 py-2">
            <UAvatar text="회" class="bg-accent-soft text-accent" />
            <div class="min-w-0 flex-1 leading-tight">
              <p class="truncate text-small font-semibold">{{ mockUser.email }}</p>
              <p class="text-caption text-muted">{{ mockUser.company }}</p>
            </div>
            <NuxtLink to="#" class="text-small text-muted underline-offset-2 hover:underline">정보수정</NuxtLink>
          </div>
          <UButton to="#" size="lg" class="mt-2 max-w-[352px]" block>콘솔 바로가기</UButton>
        </template>
      </div>

      <nav aria-label="모바일 메뉴" class="border-t border-default">
        <button type="button" class="flex h-14 w-full items-center justify-between px-4 text-body font-semibold sm:px-6" :aria-expanded="accOpen" @click="accOpen = !accOpen">
          API 소개
          <UIcon name="i-tabler-chevron-down" class="size-5 transition-transform duration-200" :class="accOpen && 'rotate-180'" />
        </button>
        <div v-show="accOpen" class="bg-muted px-4 pb-3 sm:px-6">
          <p class="pt-3 pb-1 text-caption font-bold text-muted">API 상품 소개 · 13개</p>
          <div v-for="g in productGroups" :key="g.label">
            <button type="button" class="flex h-12 w-full items-center justify-between text-small font-semibold" :aria-expanded="!!openGroups[g.label]" @click="toggleGroup(g.label)">
              {{ g.label }} <UIcon name="i-tabler-chevron-down" class="size-4 transition-transform" :class="openGroups[g.label] && 'rotate-180'" />
            </button>
            <ul v-show="openGroups[g.label]" class="pb-2">
              <li v-for="it in g.items" :key="it.to"><NuxtLink :to="it.to" class="flex h-11 items-center pl-3 text-small text-default">{{ it.label }}</NuxtLink></li>
            </ul>
          </div>
          <p class="pt-3 pb-1 text-caption font-bold text-muted">상황별 솔루션</p>
          <div v-for="g in solutionGroups" :key="g.label">
            <button type="button" class="flex h-12 w-full items-center justify-between text-small font-semibold" :aria-expanded="!!openGroups[g.label]" @click="toggleGroup(g.label)">
              {{ g.label }} <UIcon name="i-tabler-chevron-down" class="size-4 transition-transform" :class="openGroups[g.label] && 'rotate-180'" />
            </button>
            <ul v-show="openGroups[g.label]" class="pb-2">
              <li v-for="it in g.items" :key="it.to"><NuxtLink :to="it.to" class="flex h-11 items-center pl-3 text-small text-default">{{ it.label }}</NuxtLink></li>
            </ul>
          </div>
        </div>
        <NuxtLink to="/docs" class="flex h-14 items-center border-t border-muted px-4 text-body font-semibold sm:px-6">API 개발 문서</NuxtLink>
        <NuxtLink to="/pricing" class="flex h-14 items-center border-t border-muted px-4 text-body font-semibold sm:px-6">요금 안내</NuxtLink>
        <NuxtLink to="/support/faq" class="flex h-14 items-center border-t border-muted px-4 text-body font-semibold sm:px-6">고객지원·리소스</NuxtLink>
        <NuxtLink v-if="isAuthed" to="?auth=0" class="flex h-12 items-center px-4 text-small text-muted sm:px-6">로그아웃</NuxtLink>
      </nav>
    </template>
    <template #footer>
      <div class="grid w-full grid-cols-3 border-t border-default text-small font-semibold">
        <NuxtLink to="/support/contact" class="flex h-14 items-center justify-center gap-1.5"><UIcon name="i-tabler-message-dots" class="size-4" />문의하기</NuxtLink>
        <NuxtLink to="/support/proposal" class="flex h-14 items-center justify-center gap-1.5 border-x border-default"><UIcon name="i-tabler-download" class="size-4" />소개자료 요청</NuxtLink>
        <a :href="`tel:${contact.phone}`" class="flex h-14 items-center justify-center gap-1.5"><UIcon name="i-tabler-phone" class="size-4" />{{ contact.phone }}</a>
      </div>
    </template>
  </USlideover>
</template>
