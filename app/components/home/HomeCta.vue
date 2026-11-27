<script setup lang="ts">
import type { Concept } from '~/composables/useReview'
defineProps<{ concept: Concept }>()
</script>

<template>
  <section class="relative isolate overflow-hidden bg-brand-surface py-20 text-center text-white md:py-28" aria-labelledby="m06-title">
    <svg v-if="concept === 'b'" class="pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-[.08]" aria-hidden="true" preserveAspectRatio="none" viewBox="0 0 1440 400">
      <g fill="none" stroke="#fff"><path d="M0 320 C 360 320, 400 120, 720 120 S 1080 320, 1440 320" /><path d="M0 360 C 360 360, 420 180, 720 180 S 1080 360, 1440 360" /><path d="M0 80 C 360 80, 420 260, 720 260 S 1080 80, 1440 80" /></g>
    </svg>
    <div class="bb-container">
      <h2 id="m06-title" class="text-h1 text-white">바로빌 API<br>지금 무료로 시작하세요</h2>
      <div class="mx-auto mt-10 flex max-w-[680px] flex-col gap-3 md:flex-row md:justify-center">
        <UButton to="/signup" size="xl" class="h-12 justify-center px-6 text-body md:w-52">바로 시작하기</UButton>
        <UButton to="/support/contact" size="xl" color="neutral" variant="outline" class="bg-transparent h-12 justify-center px-6 text-body text-white ring-white/40 hover:bg-white/10 md:w-52">문의하기</UButton>
        <UButton to="/support/proposal" size="xl" color="neutral" variant="outline" class="bg-transparent h-12 justify-center px-6 text-body text-white ring-white/40 hover:bg-white/10 md:w-52">소개자료 요청하기</UButton>
      </div>
      <p class="mt-8 text-small text-white/60">문서부터 보고 싶다면 <NuxtLink to="/docs" class="font-semibold text-white underline underline-offset-4 hover:text-brand-200">API 개발 문서</NuxtLink></p>
    </div>
  </section>
</template>
