<script setup lang="ts">
import type { Concept } from '~/composables/useReview'
defineProps<{ concept: Concept }>()

const pillars = [
  { label: 'AWS 서울 리전 운영', icon: 'i-tabler-cloud-lock', content: '외부에서 함부로 접근할 수 없도록, 서버를 분리된 내부망에 두고 접근을 통제합니다.', chip: 'AWS 서울 리전 · 내부망 분리' },
  { label: '트래픽 분산 처리', icon: 'i-tabler-arrows-split-2', content: '요청이 몰려도 로드밸런서가 API 요청을 여러 서버로 나눠 안정적으로 처리합니다.', chip: '로드밸런서 · 다중 서버' },
  { label: '실시간 모니터링', icon: 'i-tabler-activity-heartbeat', content: '이상 징후가 생기면 APM 모니터링으로 감지하고, 담당 채널에 실시간으로 알려 즉시 대응합니다.', chip: '' },
  { label: '자동 백업', icon: 'i-tabler-database-export', content: '서비스에 영향이 없도록, 트래픽이 적은 시간대에 데이터를 자동으로 백업합니다.', chip: '정기 자동 백업' }
]
const accItems = pillars.map((p, i) => ({ label: p.label, content: p.content, value: String(i) }))
const darkAcc = {
  root: 'border-t border-white/15',
  item: 'border-b border-white/15',
  trigger: 'py-5 text-[18px]/[28px] font-bold text-white/60 data-[state=open]:text-white hover:text-white',
  trailingIcon: 'size-5 text-white/60',
  body: 'pb-5 text-[14px]/[20px] text-white/70 md:text-[16px]/[24px]'
}
const title = ['연동 후, 운영은', '바로빌이 함께 합니다']
const lead = '매달 약 700만 건을 처리하는 안정적인 엔진을 그대로 연동하세요. 서버·장애 대응·백업과 국세청·은행·카드사 정책 변화 대응까지 바로빌이 맡습니다.'
</script>

<template>
  <section id="m02-1" class="bb-section scroll-mt-16 bg-brand-surface text-white" aria-labelledby="m02-1-title">
    <div class="bb-container">
      <!-- ===== A: 시각 패널 + 아코디언 (7:5) ===== -->
      <div v-if="concept === 'a'" class="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-8">
        <div class="order-2 lg:order-1 lg:col-span-7">
          <div class="relative rounded-xl bg-brand-surface-raised p-6 ring-1 ring-white/10 sm:p-10 lg:aspect-[696/712] lg:p-12" aria-label="운영 구성 도식">
            <div class="flex h-full flex-col items-center justify-center">
              <div class="flex w-full max-w-[360px] items-center gap-4 rounded-lg bg-default px-5 py-6 text-highlighted shadow-[0_8px_24px_rgba(0,0,0,.25)]">
                <span class="grid size-11 place-items-center rounded-md bg-accent-soft text-accent"><UIcon :name="pillars[0]!.icon" class="size-6" /></span>
                <b class="text-title">{{ pillars[0]!.label }}</b>
              </div>
              <svg viewBox="0 0 640 72" class="hidden h-[72px] w-full max-w-[640px] xl:block" aria-hidden="true"><path d="M320 0 V36 M106 72 V36 H534 V72 M320 36 V72" fill="none" stroke="rgba(255,255,255,.25)" /></svg>
              <div class="mt-4 grid w-full grid-cols-3 gap-3 sm:gap-6 xl:mt-0">
                <div v-for="p in pillars.slice(1)" :key="p.label" class="flex flex-col items-center gap-3 rounded-lg bg-default px-2 py-5 text-center text-highlighted sm:px-4 lg:py-7">
                  <span class="grid size-10 place-items-center rounded-md bg-accent-soft text-accent"><UIcon :name="p.icon" class="size-5" /></span>
                  <b class="text-small sm:text-body">{{ p.label }}</b>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="order-1 lg:order-2 lg:col-span-5">
          <SectionHead id="m02-1-title" eyebrow="01 운영 안정성" :title="title" :lead="lead" dark />
          <UAccordion class="mt-8" :items="accItems" default-value="0" :ui="darkAcc" />
        </div>
      </div>

      <!-- ===== B: 머리말 + 숫자 칸 + 근거 4칸 ===== -->
      <template v-else>
        <SectionHead id="m02-1-title" eyebrow="01 운영 안정성" :title="title" :lead="lead" layout="split" dark />
        <div class="mt-12 grid gap-8 border-y border-white/15 py-10 md:mt-16 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <p class="text-[40px] font-extrabold leading-[48px] tracking-[-0.02em] md:text-[48px] md:leading-[56px]">25만<ConfirmTag label="누적 고객사 수 공식 수치 확인" /></p>
            <p class="mt-2 text-body text-white/80">누적 고객사 수</p>
            <p class="mt-3 text-caption text-white/45">2026년 11월 11일 기준, 누적 고객사</p>
          </div>
          <div class="md:border-l md:border-white/15 md:pl-8">
            <p class="text-[40px] font-extrabold leading-[48px] tracking-[-0.02em] md:text-[48px] md:leading-[56px]">약 700만 건</p>
            <p class="mt-2 text-body text-white/80">월평균 API 호출</p>
            <p class="mt-3 text-caption text-white/45">2026년 상반기 월평균, 테스트 호출 제외</p>
          </div>
        </div>
        <ul class="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <li v-for="p in pillars" :key="p.label" class="border-t border-white/20 pt-6">
            <UIcon :name="p.icon" class="size-6 text-brand-300" />
            <p class="mt-4 text-title">{{ p.label }}</p>
            <p class="mt-2 text-small text-white/65 md:text-body">{{ p.content }}</p>
            <span v-if="p.chip" class="mt-4 inline-flex h-6 items-center rounded-xs border border-white/20 px-2 text-caption font-bold text-white/70">{{ p.chip }}</span>
          </li>
        </ul>
      </template>
    </div>
  </section>
</template>
