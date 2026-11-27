<script setup lang="ts">
import type { Concept } from '~/composables/useReview'
defineProps<{ concept: Concept }>()

const groups = [
  { title: '업무 자동화', items: [
    { t: 'ERP에 계좌·카드·홈택스 내역 연동', d: '은행사, 카드사, 홈택스 개별 접속 없이 우리 시스템에 자동 수집', chips: ['계좌', '카드', '홈택스'], link: '회계·경비 데이터 수집', to: '/solutions/accounting-data', icon: 'i-tabler-database-import' },
    { t: '세금계산서·현금영수증 발행 연동', d: '주문·청구 시스템에서 바로 발행', chips: ['세금계산서', '현금영수증'], link: '매출증빙 발행', to: '/solutions/sales-evidence', icon: 'i-tabler-file-export' },
    { t: '입금 내역 확인·정산', d: '흩어진 계좌의 입금 내역을 한 번에 통합 조회', chips: ['계좌'], link: '입금 확인·정산', to: '/solutions/settlement', icon: 'i-tabler-coins' }
  ] },
  { title: '고객·거래처 서비스 제공', items: [
    { t: '우리 서비스에 탑재', d: 'SaaS·플랫폼 안에서 고객사가 발행·조회', chips: [], link: 'SaaS·플랫폼에 탑재', to: '/solutions/platform', icon: 'i-tabler-apps' },
    { t: 'API 재판매로 수익 확장', d: '판매가는 직접 정하고 매월 정산', chips: [], link: '재판매로 수익화(리셀)', to: '/solutions/resell', icon: 'i-tabler-chart-arrows-vertical' },
    { t: '고객사 시스템 구축', d: 'SI·외주로 납품하고 고객사에 이관', chips: [], link: 'SI·외주 구축', to: '/solutions/si', icon: 'i-tabler-tool' }
  ] }
]
</script>

<template>
  <section class="bb-section bg-default" aria-labelledby="m03-title">
    <div class="bb-container">
      <p class="text-eyebrow text-accent">상황별 솔루션</p>
      <h2 id="m03-title" class="mt-4 text-h2">우리 회사에 필요한 API,<br class="max-md:hidden"> 업무 목적에 맞게 선택하세요</h2>
      <div v-for="g in groups" :key="g.title" class="mt-12 md:mt-14">
        <h3 class="text-h3">{{ g.title }}</h3>
        <ul class="mt-5 grid gap-4 md:grid-cols-3 md:gap-6 lg:gap-8">
          <li v-for="it in g.items" :key="it.t">
            <NuxtLink :to="it.to" class="group flex h-full flex-col rounded-xl border border-default bg-default p-6 transition-[border-color,box-shadow] duration-200 hover:border-accent-line hover:shadow-[0_8px_24px_rgba(20,66,220,.08)] lg:p-8">
              <span v-if="concept === 'b'" class="mb-5 grid size-10 place-items-center rounded-md bg-accent-soft text-accent"><UIcon :name="it.icon" class="size-5" /></span>
              <span class="text-title text-highlighted">{{ it.t }}</span>
              <span class="mt-2 text-small text-toned md:text-body">{{ it.d }}</span>
              <span v-if="it.chips.length" class="mt-4 flex flex-wrap gap-1.5">
                <span v-for="c in it.chips" :key="c" class="rounded-xs bg-elevated px-2 py-0.5 text-caption font-semibold text-toned">{{ c }}</span>
              </span>
              <span class="mt-auto flex items-center gap-1 pt-6 text-small font-bold text-accent">
                <span class="underline-offset-4 group-hover:underline">{{ it.link }}</span>
                <UIcon name="i-tabler-arrow-right" class="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
