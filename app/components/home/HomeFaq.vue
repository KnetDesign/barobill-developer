<script setup lang="ts">
const items = [
  { label: '요금은 어떻게 정해지나요?', content: '상품마다 다릅니다. 세금계산서·문자처럼 처리한 건수만큼 내는 상품이 있고, 계좌·카드·홈택스 조회처럼 등록한 계좌·카드·사업자 수만큼 매월 내는 상품이 있습니다. 상품별 단가는 파트너 등록 후 콘솔에서 확인할 수 있습니다.' },
  { label: '월 기본료나 초기 연동비가 있나요?', content: '월 기본료와 초기 연동비는 없습니다. 언제든 해지할 수 있습니다.' },
  { label: '어디까지 테스트할 수 있나요?', content: '운영과 같은 테스트 환경에서 연동을 미리 확인할 수 있습니다. 세금계산서·현금영수증은 국세청으로 실제 전송하는 단계만 빠집니다. 파트너 등록하면 테스트 포인트 1만 점이 지급됩니다.' },
  { label: '가입부터 운영 전환까지 얼마나 걸리나요?', content: '파트너로 등록하면 승인을 기다리지 않고 바로 테스트를 시작할 수 있습니다. 운영 적용까지 걸리는 기간은 연동 개발과 테스트 진행에 따라 다릅니다. 테스트를 마치면 운영용 인증키로 바꾸고, 필요한 서비스를 신청해 이용하시면 됩니다.' },
  { label: '사용자 수나 계정 수에 제한이 있나요? 늘리면 비용이 드나요?', content: '계정 수에 제한이 없고, 계정을 늘려도 추가 요금은 없습니다. 요금은 이용한 서비스만큼만 포인트에서 차감됩니다.' }
].map((x, i) => ({ ...x, value: String(i) }))
</script>

<template>
  <section class="bb-section bg-default pt-0" aria-labelledby="m05-title">
    <div class="bb-container">
      <div class="grid gap-8 lg:grid-cols-12 lg:gap-8">
        <div class="lg:col-span-4">
          <p class="text-eyebrow text-accent">자주 묻는 질문</p>
          <h2 id="m05-title" class="mt-4 text-h2">시작하기 전에<br class="max-lg:hidden"> 많이 묻는 것</h2>
          <ULink to="/support/faq" class="group mt-6 inline-flex items-center gap-1 text-body font-bold text-default hover:text-accent">질문 전체 보기 <UIcon name="i-tabler-arrow-right" class="size-4 transition-transform group-hover:translate-x-1" /></ULink>
        </div>
        <UAccordion
          class="lg:col-span-8"
          :items="items"
          default-value="0"
          :ui="{ root: 'border-t border-inverted', item: 'border-b border-default', trigger: 'py-5 text-left text-[16px]/[24px] font-semibold text-highlighted md:text-[18px]/[28px]', trailingIcon: 'size-5', body: 'pb-6 pr-8 text-[14px]/[22px] text-toned md:text-[16px]/[26px]' }"
        />
      </div>
    </div>
  </section>
</template>
