<script setup lang="ts">
import type { Concept } from '~/composables/useReview'
defineProps<{ concept: Concept }>()

// [재동의 필요] 고객사 실명·로고·인용 — 게재 동의(PM-D-12) 및 도입 연도 확인 전
const feature = { quote: '“…당사가 사용하고있는 사이트와 연동되어 사이트에서 바로 세금계산서 발행되어 수 천 건에 해당하는 세금계산서를 편리하게 발행하고 있습니다.”', company: '㈜더블유컨셉코리아', industry: '이커머스(패션 플랫폼)', since: '2012년', mark: 'W CONCEPT' }
const smalls = [
  { quote: '“API연동 경험이 없더라도 바로빌 개발자센터를 통한다면 어렵지 않게, 문제없이 구현이 가능할 것 입니다.”', company: '㈜비락', industry: '식음료 제조(유제품·음료)', since: '2022년' },
  { quote: '“…월 마감 후 계산서 맞추는 작업 시간을 대폭 감소시켜 업무 효율을 향상 시켰습니다.”', company: '학교법인 인제학원', industry: '교육·의료(인제대·백병원)', since: '2020년' }
]
const tabs = [
  { name: '㈜더블유컨셉코리아', short: 'W컨셉', quote: feature.quote, industry: feature.industry, since: feature.since, interview: true },
  { name: '㈜카카오', short: '카카오', quote: '', industry: '', since: '', interview: false },
  { name: '㈜아성다이소', short: '다이소', quote: '', industry: '', since: '', interview: false },
  { name: '국가철도공단', short: '국가철도공단', quote: '', industry: '', since: '', interview: false }
]
const active = ref(0)
</script>

<template>
  <section class="bb-section bg-default" aria-labelledby="m04-title">
    <div class="bb-container">
      <div class="text-center">
        <p class="text-eyebrow text-accent">고객 사례</p>
        <h2 id="m04-title" class="mt-4 text-h2">고객이 직접 경험한 효과를<br>도입 사례로 확인하세요<ConfirmTag label="H2 문구 확인: 2026-11-20 이력의 사용자 문장과 그림이 다름 · 고객사 게재 동의·도입 연도 확인" /></h2>
      </div>

      <!-- ===== A: 피처 카드 + 인터뷰 카드 2 ===== -->
      <div v-if="concept === 'a'" class="mt-12 grid gap-6 md:mt-16 lg:grid-cols-12 lg:gap-8">
        <NuxtLink to="/support/customers" class="group relative flex flex-col overflow-hidden rounded-xl bg-ink-900 lg:col-span-7 lg:min-h-[448px]">
          <div class="relative aspect-[16/9] overflow-hidden sm:absolute sm:inset-0 sm:aspect-auto" aria-hidden="true">
            <div class="absolute inset-0 bg-[linear-gradient(135deg,#1b2333,#0b1424)] transition-transform duration-500 ease-out-soft group-hover:scale-[1.03]" />
            <span class="absolute left-1/2 top-[30%] -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-[28px] font-black tracking-[.2em] text-white/80 sm:text-[40px]">{{ feature.mark }}</span>
            <span class="absolute left-3 top-3 rounded-xs bg-white/10 px-2 py-0.5 text-[10px] font-semibold text-white/60">고객 이미지 자리 · 실제 사진 수급 필요</span>
          </div>
          <div class="relative mt-auto bg-brand-surface p-6 sm:bg-transparent sm:bg-[linear-gradient(to_top,rgba(11,20,36,.95)_40%,transparent)] sm:p-10 sm:pt-24">
            <p class="text-title text-white md:text-h3 md:font-bold">{{ feature.quote }}</p>
            <p class="mt-4 text-small text-white/80"><b class="font-bold text-white">{{ feature.company }}</b> · {{ feature.industry }}</p>
            <p class="mt-3 flex flex-wrap items-center gap-2 text-caption text-white/60">
              <span class="rounded-xs border border-white/25 px-2 py-0.5 font-semibold">전자세금계산서</span><span class="rounded-xs border border-white/25 px-2 py-0.5 font-semibold">휴폐업조회</span><span>도입 시기 {{ feature.since }}</span>
            </p>
          </div>
        </NuxtLink>
        <div class="grid gap-6 lg:col-span-5 lg:gap-8">
          <NuxtLink v-for="c in smalls" :key="c.company" to="/support/customers" class="flex flex-col rounded-xl border border-default p-6 transition-[border-color,box-shadow] duration-200 hover:border-accented hover:shadow-[0_4px_16px_rgba(10,15,24,.06)] lg:p-8">
            <p class="text-body font-semibold text-highlighted">{{ c.quote }}</p>
            <p class="mt-auto pt-6 text-small"><b class="text-highlighted">{{ c.company }}</b> <span class="text-muted">· {{ c.industry }}</span></p>
            <p class="mt-1 text-caption text-muted">도입 시기 {{ c.since }}<ConfirmTag label="도입 연도 미확정 · 게재 동의 확인" /></p>
          </NuxtLink>
        </div>
      </div>

      <!-- ===== B: 큰 인용 + 로고 탭 ===== -->
      <div v-else class="mt-12 md:mt-16">
        <div class="mx-auto grid min-h-[260px] max-w-[800px] content-center text-center" role="tabpanel" :aria-label="tabs[active]!.name">
          <span class="mx-auto grid size-12 place-items-center rounded-full bg-elevated text-caption font-black text-default">{{ tabs[active]!.short.slice(0, 2) }}</span>
          <template v-if="tabs[active]!.quote">
            <p class="mt-6 text-title md:text-h3 md:font-bold">{{ tabs[active]!.quote }}</p>
            <p class="mt-6 text-small"><b>{{ tabs[active]!.name }}</b> <span class="text-muted">· {{ tabs[active]!.industry }}</span></p>
            <p class="mt-1 text-caption text-muted">도입 시기 {{ tabs[active]!.since }}</p>
          </template>
          <p v-else class="mt-6 text-body text-muted">인터뷰 내용 준비 중<ConfirmTag label="카카오·다이소·국가철도공단 인터뷰 인용 없음 · 탭 내용과 로고 사용 동의 확인" /></p>
          <div class="mt-6 h-6">
            <ULink v-if="tabs[active]!.interview" to="/support/customers" class="group inline-flex items-center gap-1 text-small font-bold text-accent">인터뷰 전체 보기 <UIcon name="i-tabler-arrow-right" class="size-4 transition-transform group-hover:translate-x-1" /></ULink>
          </div>
        </div>
        <div class="mt-10 grid grid-cols-2 border-t border-default md:grid-cols-4" role="tablist" aria-label="고객사 선택">
          <button v-for="(t, i) in tabs" :key="t.name" type="button" role="tab" :aria-selected="active === i" class="-mt-px grid h-20 place-items-center border-t-2 text-[17px] font-extrabold transition-colors md:h-24" :class="active === i ? 'border-inverted text-highlighted' : 'border-transparent text-dimmed hover:text-muted'" @click="active = i">{{ t.short }}</button>
        </div>
      </div>

      <div class="mt-10 text-center">
        <ULink to="/support/customers" class="group inline-flex items-center gap-1 text-body font-bold text-default hover:text-accent">고객사 레퍼런스 더보기 <UIcon name="i-tabler-arrow-right" class="size-4 transition-transform group-hover:translate-x-1" /></ULink>
      </div>
    </div>
  </section>
</template>
