<script setup lang="ts">
import { studioPages } from '~/utils/site'
const route = useRoute()
const item = computed(() => studioPages.flatMap(g => g.items).find(i => i.to === route.path))
useHead({ title: () => `${item.value?.label ?? '페이지'} · 바로빌 개발자센터` })
</script>

<template>
  <div class="bb-container bb-section">
    <UBreadcrumb :items="[{ label: '홈', to: '/' }, { label: item?.label ?? route.path }]" />
    <h1 class="mt-6 text-h1">{{ item?.label ?? '페이지를 찾을 수 없습니다' }}</h1>
    <p class="mt-4 text-body text-toned">
      {{ item ? '이 페이지는 Phase 4에서 공통 디자인 시스템을 바탕으로 제작됩니다.' : '주소를 다시 확인해 주세요.' }}
    </p>
    <UButton to="/" class="mt-8" variant="outline" color="neutral">메인으로</UButton>
  </div>
</template>
