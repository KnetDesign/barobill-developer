<script setup lang="ts">
import type { Concept } from '~/composables/useReview'
defineProps<{ concept: Concept }>()

const accItems = [
  { label: '월 기본료 0원', content: '사용하지 않아도 내야하는 월 기본료는 없습니다.', value: '0' },
  { label: '연동비 · 도입비 · 유지보수비 · 기술지원비 0원', content: '연동부터 기술 지원까지, API 사용료 외에 추가로 드는 비용은 없습니다.', value: '1' },
  { label: '필요한 만큼만 내는 종량제', content: '업무량이 늘거나 줄어도, 처리한 건수와 등록한 계좌·카드 수에 맞춰 비용이 정해집니다.', value: '2' }
]
const acc = {
  root: 'border-t border-default',
  item: 'border-b border-default',
  trigger: 'py-5 text-[18px]/[28px] font-bold text-muted data-[state=open]:text-highlighted hover:text-highlighted',
  trailingIcon: 'size-5',
  body: 'pb-5 text-[14px]/[20px] text-toned md:text-[16px]/[24px]'
}
const title = ['도입 비용은 ZERO', '운영은 경제적으로']
const lead = '합리적인 이용 단가는 물론, 별도의 도입비·유지보수비·기술지원비도 없습니다. 비용의 차이를 경험하세요.'
// 설문 결과: 숫자 없이 길이만 (비율 6:3:1)
const reasons = [{ r: 1, t: '단가', w: 100 }, { r: 2, t: '개발 환경', w: 50 }, { r: 3, t: '서비스 범위', w: 17 }]
</script>

<template>
  <section id="m02-3" class="bb-section scroll-mt-16 bg-default" aria-labelledby="m02-3-title">
    <div class="bb-container">
      <div v-if="concept === 'a'" class="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-8">
        <div class="order-2 lg:order-1 lg:col-span-7">
          <div class="relative grid place-items-center overflow-hidden rounded-xl bg-accent-soft p-6 sm:p-12 lg:aspect-[696/712]">
            <!-- 0원 비용 구조 그래픽 (이미지 미정 → 의미 기반 그래픽) -->
            <div class="w-full max-w-[440px] rounded-xl bg-default p-6 shadow-[0_12px_32px_rgba(20,66,220,.10)] ring-1 ring-accent-line sm:p-8">
              <p class="text-title text-highlighted">바로빌을 선택한 이유</p>
              <ol class="mt-6 space-y-4">
                <li v-for="x in reasons" :key="x.r" class="grid grid-cols-[96px_1fr] items-center gap-3">
                  <span class="text-small" :class="x.r === 1 ? 'font-extrabold text-highlighted' : 'text-toned'"><b class="mr-1.5 tabular-nums">{{ x.r }}</b>{{ x.t }}</span>
                  <span class="h-3 rounded-full bg-elevated"><span class="block h-full rounded-full" :class="x.r === 1 ? 'bg-primary' : 'bg-ink-300'" :style="{ width: `${x.w}%` }" /></span>
                </li>
              </ol>
              <p class="mt-6 text-caption text-muted">2026년 10월 연동 경험 설문</p>
            </div>
          </div>
        </div>
        <div class="order-1 lg:order-2 lg:col-span-5">
          <SectionHead eyebrow="03 비용 경쟁력" :title="title" :lead="lead" />
          <UAccordion class="mt-8" :items="accItems" default-value="0" :ui="acc" />
          <p class="mt-6 flex items-center gap-2 text-small text-toned"><UIcon name="i-tabler-info-circle" class="size-4 text-dimmed" />파트너 등록 후 콘솔에서 단가를 확인할 수 있습니다.<ConfirmTag label="0원 네 항목 전 상품 적용 여부 운영팀 확인" /></p>
          <ULink to="/pricing" class="group mt-6 inline-flex items-center gap-1 text-body font-bold text-accent">요금 안내 보기 <UIcon name="i-tabler-arrow-right" class="size-4 transition-transform group-hover:translate-x-1" /></ULink>
        </div>
      </div>

      <template v-else>
        <SectionHead eyebrow="03 비용 경쟁력" :title="title" :lead="lead" layout="split" />
        <div class="mt-12 grid gap-6 md:mt-16 lg:grid-cols-2 lg:gap-8">
          <div class="rounded-xl border border-default p-6 sm:p-8">
            <p class="text-[56px] font-extrabold leading-[64px] tracking-[-0.03em] text-accent">0원</p>
            <ul class="mt-6 flex flex-wrap gap-2">
              <li v-for="t in ['월 기본료','연동비','도입비','유지보수비','기술지원비']" :key="t" class="rounded-md bg-accent-soft px-3 py-1.5 text-small font-semibold text-accent">{{ t }}</li>
            </ul>
            <p class="mt-6 text-body text-toned">연동부터 기술 지원까지, API 사용료 외에 추가로 드는 비용은 없습니다.</p>
          </div>
          <div class="rounded-xl border border-default p-6 sm:p-8">
            <p class="text-title">바로빌을 선택한 이유</p>
            <ol class="mt-6 space-y-4">
              <li v-for="x in reasons" :key="x.r" class="grid grid-cols-[96px_1fr] items-center gap-3">
                <span class="text-small" :class="x.r === 1 ? 'font-extrabold text-highlighted' : 'text-toned'"><b class="mr-1.5">{{ x.r }}</b>{{ x.t }}</span>
                <span class="h-3 rounded-full bg-elevated"><span class="block h-full rounded-full" :class="x.r === 1 ? 'bg-primary' : 'bg-ink-300'" :style="{ width: `${x.w}%` }" /></span>
              </li>
            </ol>
            <p class="mt-6 text-caption text-muted">2026년 10월 연동 경험 설문</p>
          </div>
        </div>
        <div class="mt-8 flex flex-col gap-4 border-t border-default pt-6 md:flex-row md:items-center md:justify-between">
          <p class="text-small text-toned">파트너 등록 후 콘솔에서 단가를 확인할 수 있습니다.</p>
          <ULink to="/pricing" class="group inline-flex items-center gap-1 text-body font-bold text-accent">요금 안내 보기 <UIcon name="i-tabler-arrow-right" class="size-4 transition-transform group-hover:translate-x-1" /></ULink>
        </div>
      </template>
    </div>
  </section>
</template>
