<script setup lang="ts">
import { productGroups, solutionGroups, contact } from '~/utils/site'

const sitemap = [
  { label: '상황별 솔루션', items: solutionGroups.flatMap(g => g.items) },
  { label: '개발자 문서', items: ['REST API 가이드', 'REST API 레퍼런스', 'SOAP API 가이드', 'SOAP API 레퍼런스', '오류코드 조회', '샘플 다운로드'].map(l => ({ label: l, to: '/docs' })) },
  { label: '요금·고객지원', items: [
    { label: '요금 안내', to: '/pricing' }, { label: '이용문의', to: '/support/contact' }, { label: 'FAQ', to: '/support/faq' },
    { label: '고객사례', to: '/support/customers' }, { label: '공지사항', to: '/support/notices' }, { label: '소개자료 요청', to: '/support/proposal' }
  ] },
  { label: '약관·정책', items: [{ label: '이용약관', to: '#' }, { label: '파트너 이용약관', to: '#' }, { label: '개인정보처리방침', to: '#', strong: true }] }
] as { label: string, items: { label: string, to: string, strong?: boolean }[] }[]
const open = ref<Record<string, boolean>>({})
</script>

<template>
  <footer class="border-t border-default bg-muted text-toned">
    <div class="bb-container divide-y divide-default py-12 md:py-16 [&>*]:py-8 [&>*:first-child]:pt-0 [&>*:last-child]:pb-0 md:[&>*]:py-12">
      <!-- 1 라인업 -->
      <div>
        <p class="text-title text-highlighted">바로빌 API 라인업</p>
        <div class="mt-4 grid md:mt-6 md:grid-cols-3 md:gap-8 lg:grid-cols-4">
          <div v-for="g in productGroups" :key="g.label" class="max-md:border-b max-md:border-default">
            <button type="button" class="flex h-12 w-full items-center justify-between text-body font-semibold text-highlighted md:pointer-events-none md:h-auto md:text-small md:font-bold" :aria-expanded="!!open[g.label]" @click="open[g.label] = !open[g.label]">
              {{ g.label }}<UIcon name="i-tabler-chevron-down" class="size-4 md:hidden" :class="open[g.label] && 'rotate-180'" />
            </button>
            <ul class="pb-3 md:mt-2 md:block md:pb-0" :class="open[g.label] ? 'block' : 'hidden'">
              <li v-for="i in g.items" :key="i.to"><NuxtLink :to="i.to" class="flex h-8 items-center whitespace-nowrap text-small hover:text-accent">{{ i.label }}</NuxtLink></li>
            </ul>
          </div>
        </div>
      </div>
      <!-- 2 사이트맵 -->
      <div>
        <p class="text-title text-highlighted">사이트맵</p>
        <div class="mt-4 grid md:mt-6 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <div v-for="g in sitemap" :key="g.label" class="max-md:border-b max-md:border-default">
            <button type="button" class="flex h-12 w-full items-center justify-between text-body font-semibold text-highlighted md:pointer-events-none md:h-auto md:text-small md:font-bold" :aria-expanded="!!open[g.label]" @click="open[g.label] = !open[g.label]">
              {{ g.label }}<UIcon name="i-tabler-chevron-down" class="size-4 md:hidden" :class="open[g.label] && 'rotate-180'" />
            </button>
            <ul class="pb-3 md:mt-2 md:block md:pb-0" :class="open[g.label] ? 'block' : 'hidden'">
              <li v-for="i in g.items" :key="i.label"><NuxtLink :to="i.to" class="flex h-8 items-center whitespace-nowrap text-small hover:text-accent" :class="i.strong && 'font-bold text-highlighted'">{{ i.label }}</NuxtLink></li>
            </ul>
          </div>
        </div>
      </div>
      <!-- 3 회사 소개 + 고객센터 -->
      <div class="grid gap-8 lg:grid-cols-12">
        <div class="lg:col-span-7">
          <AppLogo />
          <p class="mt-4 max-w-[600px] text-body text-default">바로빌은 ERP·솔루션·쇼핑몰 등 사내 시스템에 전자세금계산서·현금영수증·홈택스 수집·계좌·카드 조회를 연결하는 비즈니스 데이터 API 서비스입니다.</p>
          <p class="mt-3 text-small text-muted">국세청 지정 시스템사업자(41000022) · 전자세금계산서 표준인증(v3.0) · 2009년부터 API 제공<ConfirmTag label="표준인증 v3.0 증빙 문서 위치 확인" /></p>
          <div class="mt-5 flex gap-2">
            <a href="#" target="_blank" rel="noopener" class="rounded-full border border-accented px-3 py-1 text-small font-semibold text-default hover:border-accented">바로빌 블로그</a>
            <a href="#" target="_blank" rel="noopener" class="rounded-full border border-accented px-3 py-1 text-small font-semibold text-default hover:border-accented">유튜브</a>
          </div>
        </div>
        <div class="rounded-xl bg-default p-6 ring-1 ring-default lg:col-span-5 lg:p-8">
          <p class="text-small font-bold text-muted">고객센터</p>
          <a :href="`tel:${contact.phone}`" class="mt-1 block text-h2 tabular-nums text-highlighted">{{ contact.phone }}</a>
          <dl class="mt-4 grid grid-cols-[64px_1fr] gap-y-1 text-small">
            <dt class="text-muted">이메일</dt><dd class="text-default">barobill@knetbiz.com</dd>
            <dt class="text-muted">운영시간</dt><dd class="text-default">평일 09:00~18:00(점심 12:00~13:00) /<br class="xl:hidden"> 주말·공휴일 제외</dd>
          </dl>
        </div>
      </div>
      <!-- 4 사업자 정보 -->
      <div class="text-small leading-[22px] text-muted">
        <p>(주)케이넷 · 대표 이천호 · 사업자등록번호 416-81-38772 · 통신판매업신고 제2010-75호<ConfirmTag label="사업자 정보 배포 전 법무·운영 확인" /></p>
        <p>광주광역시 북구 첨단과기로208번길 43-22, B1901~1903 (오룡동, 와이어스파크(지식산업센터))</p>
        <p class="mt-3 text-caption">© 2026 BAROBILL (KNET Co., Ltd.) All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>
