<script setup lang="ts">
// [가안] 공식 로고 파일 수급 전 임시 워드마크. 공식 SVG로 교체 예정.
defineProps<{ inverse?: boolean }>()
</script>

<template>
  <span class="inline-flex items-center gap-2 select-none" :class="inverse ? 'text-white' : 'text-highlighted'">
    <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
      <rect x="1" y="1" width="20" height="20" rx="5" class="fill-primary" />
      <path d="M7 6.5h5.2c2 0 3.3 1 3.3 2.6 0 1-.6 1.8-1.5 2.1 1.2.3 2 1.2 2 2.4 0 1.8-1.4 2.9-3.6 2.9H7z M9.4 8.4v2.3h2.5c.9 0 1.3-.4 1.3-1.1s-.5-1.2-1.3-1.2z M9.4 12.4v2.6h2.8c1 0 1.5-.5 1.5-1.3s-.6-1.3-1.5-1.3z" fill="#fff" fill-rule="evenodd" />
    </svg>
    <span class="text-[17px] font-extrabold tracking-[-0.01em]">BAROBILL</span>
    <span class="text-[13px] font-semibold" :class="inverse ? 'text-white/60' : 'text-muted'">Developers</span>
  </span>
</template>
