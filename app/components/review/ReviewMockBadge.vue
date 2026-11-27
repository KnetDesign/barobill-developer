<script setup lang="ts">
// 검토용 표시: 실제 API·가입·결제와 연결되지 않은 Mock 상태임을 알림. 운영 빌드에서는 제거.
const route = useRoute()
const show = computed(() => route.query.studio !== '1' && route.query.clean !== '1')
</script>

<template>
  <div v-if="show" class="fixed bottom-3 left-3 z-[70] flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-caption font-semibold text-amber-800 shadow-sm">
    <UIcon name="i-tabler-flask" class="size-3.5" /> 시안 · Mock (실제 가입·API·결제 미연결)
    <NuxtLink to="/studio" class="ml-1 underline underline-offset-2">Studio</NuxtLink>
  </div>
</template>
