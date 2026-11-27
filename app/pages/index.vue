<script setup lang="ts">
definePageMeta({ headerTransparent: true })
useHead({ title: '바로빌 개발자센터 · 기업 업무·데이터 연동 API' })
const concept = useConcept()
</script>

<template>
  <div>
    <HomeHero :concept="concept" />
    <HomeWhy />
    <HomeStability :concept="concept" />
    <HomeIntegration :concept="concept" />
    <HomeCost :concept="concept" />
    <HomeStart />
    <HomeSolutions :concept="concept" />
    <HomeCases :concept="concept" />
    <HomeFaq />
    <HomeCta :concept="concept" />
  </div>
</template>
