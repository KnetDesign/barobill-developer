<script setup lang="ts">
/** 검토 표시: 근거·동의·법무 확인이 필요한 문구 옆에 붙인다. clean 모드(?clean=1)에서는 숨김. */
defineProps<{ label?: string }>()
const route = useRoute()
const show = computed(() => route.query.clean !== '1')
</script>

<template>
  <UTooltip v-if="show" :text="label ?? '확인 필요'">
    <span class="ml-1 inline-flex translate-y-[-1px] cursor-help items-center rounded-xs border border-dashed border-amber-500 bg-amber-50 px-1 align-middle text-[10px] font-bold leading-4 text-amber-700">확인</span>
  </UTooltip>
</template>
