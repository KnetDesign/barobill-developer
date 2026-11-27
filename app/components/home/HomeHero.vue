<script setup lang="ts">
import type { Concept } from '~/composables/useReview'
defineProps<{ concept: Concept }>()

// [재동의 필요] 고객사 로고 — 공식 로고 파일·게재 동의 전까지 워드마크(텍스트)로 표기
const logos = ['카카오', '다이소', '코카콜라', 'W컨셉', '현대벤디스', '국가철도공단', '농협정보시스템', 'KB신용정보', '카카오모빌리티', '후지필름', '토스모바일', 'KT엠모바일', '효성ITX', '신세계디에프', '영풍문고', '캐치테이블']
const eyebrow = '기업 업무·데이터 연동 · SINCE 2009'
const lead1 = '기업에 필요한 기술을 하나로, 더 나은 비즈니스를 위한 연결.'
const lead2 = '세금계산서 발행부터 홈택스·계좌·카드 조회, 문자·팩스 발송까지 바로빌 API로 완성하세요.'

const right = [
  { label: '국세청', icon: 'i-tabler-building-community', y: 70 },
  { label: '은행', icon: 'i-tabler-building-bank', y: 170 },
  { label: '카드사', icon: 'i-tabler-credit-card', y: 270 },
  { label: '통신사', icon: 'i-tabler-antenna-bars-5', y: 370 }
]
</script>

<template>
  <section aria-labelledby="hero-title">
    <!-- ================= Concept A: 가운데 정렬 면 + 흐르는 로고 띠 ================= -->
    <template v-if="concept === 'a'">
      <div class="relative isolate overflow-hidden bg-brand-surface pt-16 text-white">
        <!-- 배경: 면색 + 아주 옅은 연결선 격자 (정보 방해 없음) -->
        <div class="pointer-events-none absolute inset-0 -z-10 opacity-60 [background-image:radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(50,115,251,.28),transparent_70%)]" aria-hidden="true" />
        <svg class="pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-[.07]" aria-hidden="true"><defs><pattern id="hg" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M48 0H0V48" fill="none" stroke="#fff" /></pattern></defs><rect width="100%" height="100%" fill="url(#hg)" /></svg>
        <div class="bb-container flex min-h-[560px] flex-col items-center justify-center py-20 text-center lg:min-h-[640px]">
          <p class="text-eyebrow text-brand-300">{{ eyebrow }}</p>
          <h1 id="hero-title" class="mt-4 text-display text-white">기술의 연결,<br>더 큰 비즈니스 가치</h1>
          <p class="mt-6 max-w-[640px] text-body text-white/70 md:text-title md:font-normal">
            {{ lead1 }}<br class="max-sm:hidden"> {{ lead2 }}
          </p>
          <div class="mt-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <UButton to="/signup" size="xl" class="h-12 px-7 text-body sm:min-w-44">테스트 시작하기</UButton>
            <UButton to="/support/contact" size="xl" color="neutral" variant="outline" class="bg-transparent h-12 px-7 text-body text-white ring-white/40 hover:bg-white/10 sm:min-w-32">견적 문의</UButton>
          </div>
        </div>
      </div>
      <div class="relative h-[72px] overflow-hidden border-b border-default bg-default md:h-24" aria-label="바로빌을 이용하는 고객사">
        <div class="absolute inset-0 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
          <ul class="flex h-full w-max items-center gap-[88px] pr-[88px] [animation:bb-marquee_80s_linear_infinite]">
            <li v-for="(l, i) in [...logos, ...logos]" :key="i" class="whitespace-nowrap text-[18px] font-extrabold tracking-[-0.02em] text-dimmed md:text-[20px]" :aria-hidden="i >= logos.length">{{ l }}</li>
          </ul>
        </div>
        <span class="absolute right-2 top-2"><ConfirmTag label="고객사 로고·실명 게재 재동의 필요 (PM-D-12) · 공식 로고 파일 수급 필요" /></span>
      </div>
    </template>

    <!-- ================= Concept B: 6:6 + 연결 도식 + 정지 로고 2줄 ================= -->
    <template v-else>
      <div class="relative isolate overflow-hidden bg-brand-surface pt-16 text-white">
        <svg class="pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-[.06]" aria-hidden="true"><defs><pattern id="hg2" width="32" height="32" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="1" fill="#fff" /></pattern></defs><rect width="100%" height="100%" fill="url(#hg2)" /></svg>
        <div class="bb-container grid items-center gap-12 py-16 lg:min-h-[576px] lg:grid-cols-2 lg:gap-8 lg:py-20">
          <div>
            <p class="text-eyebrow text-brand-300">{{ eyebrow }}</p>
            <h1 id="hero-title" class="mt-4 text-display text-white">기술의 연결,<br>더 큰 비즈니스 가치</h1>
            <p class="mt-6 max-w-[520px] text-body text-white/70 md:text-title md:font-normal">{{ lead1 }} {{ lead2 }}</p>
            <div class="mt-10 flex flex-col gap-3 sm:flex-row">
              <UButton to="/signup" size="xl" class="h-12 px-7 text-body sm:min-w-44">테스트 시작하기</UButton>
              <UButton to="/support/contact" size="xl" color="neutral" variant="outline" class="bg-transparent h-12 px-7 text-body text-white ring-white/40 hover:bg-white/10 sm:min-w-32">견적 문의</UButton>
            </div>
          </div>

          <!-- 연결 개념 도식: 우리 시스템 ↔ 바로빌 API ↔ 국세청·은행·카드사·통신사 (선형, 3D·글래스 없음) -->
          <figure class="relative mx-auto aspect-[4/3] w-full max-w-[592px] lg:aspect-[592/440]" aria-label="연결 개념 도식: 우리 시스템(ERP·SaaS)이 바로빌 API를 통해 국세청·은행·카드사·통신사와 연결됩니다">
            <svg viewBox="0 0 592 440" class="absolute inset-0 h-full w-full" aria-hidden="true">
              <g fill="none" stroke="rgba(255,255,255,.18)" stroke-width="1.5">
                <path d="M170 220 H236" />
                <path v-for="n in right" :key="n.label" :d="`M356 220 C 400 220, 400 ${n.y}, 444 ${n.y}`" />
              </g>
              <g fill="none" stroke="var(--color-brand-400)" stroke-width="1.5" stroke-dasharray="4 8" class="[animation:bb-flow_1.2s_linear_infinite]">
                <path d="M170 220 H236" />
                <path v-for="n in right" :key="n.label" :d="`M356 220 C 400 220, 400 ${n.y}, 444 ${n.y}`" />
              </g>
            </svg>
            <!-- 왼쪽: 우리 시스템 -->
            <div class="absolute left-0 top-1/2 w-[29%] -translate-y-1/2 rounded-lg border border-white/15 bg-white/[.04] p-3 sm:p-4">
              <p class="text-caption font-semibold text-white/50">우리 시스템</p>
              <div class="mt-2 space-y-1.5">
                <div class="flex items-center gap-2 rounded-md bg-white/[.06] px-2 py-1.5 text-small font-semibold"><UIcon name="i-tabler-layout-dashboard" class="size-4 text-brand-300" />ERP</div>
                <div class="flex items-center gap-2 rounded-md bg-white/[.06] px-2 py-1.5 text-small font-semibold"><UIcon name="i-tabler-apps" class="size-4 text-brand-300" />SaaS</div>
              </div>
            </div>
            <!-- 가운데: 바로빌 API -->
            <div class="absolute left-[40%] top-1/2 grid w-[20%] -translate-y-1/2 place-items-center rounded-xl bg-primary px-2 py-5 text-center shadow-[0_0_0_6px_rgba(50,115,251,.15)]">
              <span class="text-[11px] font-bold tracking-[.06em] text-white/70">BAROBILL</span>
              <span class="text-small font-extrabold sm:text-body">바로빌 API</span>
            </div>
            <!-- 오른쪽: 연동처 -->
            <div v-for="n in right" :key="n.label" class="absolute right-0 flex w-[25%] -translate-y-1/2 items-center gap-2 rounded-lg border border-white/15 bg-brand-surface-raised px-2.5 py-2 sm:px-3" :style="{ top: `${(n.y / 440) * 100}%` }">
              <UIcon :name="n.icon" class="size-4 shrink-0 text-white/60" /><span class="text-small font-semibold">{{ n.label }}</span>
            </div>
          </figure>
        </div>
      </div>
      <div class="border-b border-default bg-default py-8" aria-label="바로빌을 이용하는 고객사">
        <ul class="bb-container grid grid-cols-3 gap-x-3 gap-y-4 sm:grid-cols-4 lg:grid-cols-6 lg:gap-x-10">
          <li v-for="l in logos.slice(0, 12)" :key="l" class="grid h-10 place-items-center whitespace-nowrap text-[15px] font-extrabold tracking-[-0.02em] text-dimmed sm:text-[17px]">{{ l }}</li>
        </ul>
        <p class="bb-container mt-2 text-right"><ConfirmTag label="고객사 로고·실명 게재 재동의 필요 (PM-D-12)" /></p>
      </div>
    </template>
  </section>
</template>
