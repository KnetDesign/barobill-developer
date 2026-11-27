<script setup lang="ts">
const steps = [
  { t: '파트너 등록 즉시 인증키 발급', d: '테스트·운영 인증키가 함께 발급됩니다. 등록만으로 과금되거나 운영 연동이 시작되지 않습니다.', icon: 'i-tabler-key' },
  { t: '운영과 같은 테스트 환경', d: '테스트 포인트 1만 점이 자동 지급됩니다. 실제 데이터·과금 없이 안전하게 연동을 테스트할 수 있습니다.', icon: 'i-tabler-flask' },
  { t: '인증키만 바꿔서 운영 전환', d: '별도 승인 없이 전환합니다.', icon: 'i-tabler-switch-horizontal' }
]
</script>

<template>
  <section id="m02-4" class="bb-section scroll-mt-16 bg-muted" aria-labelledby="m02-4-title">
    <div class="bb-container">
      <div class="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-8">
        <div class="lg:col-span-6">
          <p class="text-eyebrow text-accent">시작도 간단하게</p>
          <h2 id="m02-4-title" class="mt-4 text-h2">테스트부터 운영까지,<br>간편하게 바로 시작하세요</h2>
        </div>
        <div class="lg:col-span-5 lg:col-start-8">
          <p class="text-body text-toned md:text-title md:font-normal">파트너 등록하면 테스트·운영 인증키가 바로 발급됩니다. 연동 상담이 필요하시면 운영팀이 신속하게 도와드립니다.</p>
        </div>
      </div>

      <!-- 정적 Stepper: 진행 상태 없음, 세 단계 같은 무게 -->
      <ol class="relative mt-12 grid gap-8 md:mt-20 md:grid-cols-3 md:gap-6">
        <li v-for="(s, i) in steps" :key="s.t" class="relative grid grid-cols-[40px_1fr] gap-x-4 md:block md:text-center">
          <span v-if="i < steps.length - 1" class="absolute left-5 top-10 h-[calc(100%+32px-40px)] w-0.5 -translate-x-1/2 bg-accented md:left-[calc(50%+36px)] md:top-7 md:h-0.5 md:w-[calc(100%-72px+24px)] md:translate-x-0" aria-hidden="true" />
          <span class="relative z-10 grid size-10 place-items-center rounded-full border-2 border-primary bg-default text-accent md:mx-auto md:size-14">
            <UIcon :name="s.icon" class="size-5 md:size-6" />
          </span>
          <div class="md:mt-5">
            <p class="text-caption font-bold text-accent">STEP {{ i + 1 }}</p>
            <p class="mt-1 text-title text-highlighted">{{ s.t }}</p>
            <p class="mt-2 text-small text-toned md:mx-auto md:max-w-[320px] md:text-body">{{ s.d }}</p>
          </div>
        </li>
      </ol>

      <div class="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center md:mt-16">
        <UButton to="/signup" size="xl" class="h-12 w-full px-8 text-body sm:w-auto">테스트 시작하기</UButton>
        <ULink to="/support/contact" class="group inline-flex items-center gap-1 text-body font-bold text-default hover:text-accent">연동 상담 <UIcon name="i-tabler-arrow-right" class="size-4 transition-transform group-hover:translate-x-1" /></ULink>
      </div>
    </div>
  </section>
</template>
