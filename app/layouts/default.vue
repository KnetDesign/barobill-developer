<script setup lang="ts">
const route = useRoute()
// 다크 히어로가 있는 페이지는 헤더를 투명으로 시작
const transparent = computed(() => route.meta.headerTransparent === true)
</script>

<template>
  <div class="flex min-h-dvh flex-col">
    <a href="#main" class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-default focus:px-4 focus:py-2 focus:shadow">본문 바로가기</a>
    <ReviewMockBadge />
    <AppHeader :transparent="transparent" />
    <main id="main" class="flex-1" :class="transparent && '-mt-16'">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
