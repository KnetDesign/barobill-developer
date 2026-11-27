<script setup lang="ts">
/** 섹션 머리말 — 눈썹 · H2(줄바꿈 배열) · 리드. split=좌우 분할(≥1280), center=가운데 */
withDefaults(defineProps<{
  eyebrow?: string
  title: string[]
  lead?: string
  layout?: 'split' | 'stack' | 'center'
  dark?: boolean
  size?: 'h1' | 'h2'
  as?: 'h1' | 'h2'
}>(), { layout: 'stack', size: 'h2', as: 'h2' })
</script>

<template>
  <div
    :class="[
      layout === 'split' && 'grid gap-4 xl:grid-cols-12 xl:items-end xl:gap-8',
      layout === 'center' && 'mx-auto max-w-3xl text-center'
    ]"
  >
    <div :class="layout === 'split' && 'xl:col-span-6'">
      <p v-if="eyebrow" class="text-eyebrow" :class="dark ? 'text-brand-300' : 'text-accent'">{{ eyebrow }}</p>
      <component :is="as" class="mt-3 md:mt-4" :class="[size === 'h1' ? 'text-h1' : 'text-h2', dark ? 'text-white' : 'text-highlighted']">
        <template v-for="(line, i) in title" :key="i"><span class="block md:inline">{{ line }}</span><br v-if="i < title.length - 1" class="max-md:hidden"></template>
      </component>
    </div>
    <div v-if="lead || $slots.aside" :class="layout === 'split' ? 'xl:col-span-5 xl:col-start-8' : 'mt-4'">
      <p v-if="lead" class="text-body md:text-title md:font-normal" :class="dark ? 'text-white/70' : 'text-toned'">{{ lead }}</p>
      <slot name="aside" />
    </div>
  </div>
</template>
