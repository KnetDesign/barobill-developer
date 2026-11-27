<script setup lang="ts">
const R = 52
const C = 2 * Math.PI * R
const nodes = [
  { t: 'API 문서', x: 70, y: 18 },
  { t: 'REST API', x: 74, y: 44 },
  { t: 'SOAP API', x: 74, y: 70 },
  { t: '예제 코드', x: 62, y: 92 }
]
</script>

<template>
  <section id="m02" class="bb-section bg-default" aria-labelledby="m02-title">
    <div class="bb-container">
      <div class="grid gap-4 xl:grid-cols-12 xl:items-end xl:gap-8">
        <div class="xl:col-span-6">
          <p class="text-eyebrow text-accent">WHY BAROBILL</p>
          <h2 id="m02-title" class="mt-4 text-h2 md:text-[40px] md:leading-[52px]">기업이 원하는 API,<br>바로빌을 선택하는 이유 3가지</h2>
        </div>
        <p class="text-body text-toned md:text-title md:font-normal xl:col-span-5 xl:col-start-8">바로빌은 2009년부터 쌓아 온 운영 노하우, 빠르고 간편한 연동, 합리적인 단가로 선택받습니다.</p>
      </div>

      <div class="mt-12 grid gap-10 md:mt-16 md:grid-cols-3 md:gap-6 lg:gap-8">
        <!-- 1 운영 안정성 -->
        <a href="#m02-1" class="group flex flex-col items-center text-center focus-visible:outline-offset-4">
          <span class="flex items-center gap-2 text-[18px] font-bold leading-[26px] text-highlighted lg:text-h3"><UIcon name="i-tabler-shield-check" class="size-6 text-primary" />운영 안정성</span>
          <span class="mt-4 flex aspect-[2/1] max-h-[220px] w-full flex-col items-center justify-center rounded-xl border border-default bg-muted p-6 transition-colors group-hover:border-accent-line md:mt-6 md:aspect-[6/5] md:max-h-none">
            <span class="relative grid size-28 place-items-center lg:size-36" aria-hidden="true">
              <svg viewBox="0 0 120 120" class="absolute inset-0 -rotate-90"><circle cx="60" cy="60" :r="R" fill="none" stroke="var(--color-ink-200)" stroke-width="10" /><circle cx="60" cy="60" :r="R" fill="none" stroke="var(--color-brand-600)" stroke-width="10" stroke-linecap="round" :stroke-dasharray="`${C * 0.933} ${C}`" /></svg>
              <b class="text-[26px] font-extrabold tracking-[-0.02em] text-highlighted lg:text-[32px]">93.3%</b>
            </span>
            <span class="mt-4 text-small font-semibold text-default">2009년 연동 고객 유지율<ConfirmTag label="표현 통일 필요(02-1 '지금도 이용'과) · 법무 확인" /></span>
            <span class="mt-1 text-caption text-muted">2026년 11월 조사 기준</span>
          </span>
          <span class="mt-4 text-small text-toned md:mt-6 lg:text-body">오랜 운영 경험과 안정적인 처리 환경을 바탕으로 기업의 지속적인 서비스 운영을 지원합니다.</span>
        </a>

        <!-- 2 연동 편의성 -->
        <a href="#m02-2" class="group flex flex-col items-center text-center focus-visible:outline-offset-4">
          <span class="flex items-center gap-2 text-[18px] font-bold leading-[26px] text-highlighted lg:text-h3"><UIcon name="i-tabler-plug-connected" class="size-6 text-primary" />연동 편의성</span>
          <span class="relative mt-4 block aspect-[2/1] max-h-[220px] w-full overflow-hidden rounded-xl border border-default bg-muted transition-colors group-hover:border-accent-line md:mt-6 md:aspect-[6/5] md:max-h-none" aria-hidden="true">
            <!-- 코드 스니펫 + 문서 노드 (AI가 API를 호출하는 장면 아님) -->
            <span class="absolute left-[7%] top-1/2 w-[50%] -translate-y-1/2 rounded-lg bg-ink-900 p-3 text-left font-mono text-[10px] leading-[16px] text-dimmed shadow-lg lg:text-[11px]">
              <span class="mb-2 flex gap-1"><i class="size-1.5 rounded-full bg-ink-600" /><i class="size-1.5 rounded-full bg-ink-600" /><i class="size-1.5 rounded-full bg-ink-600" /></span>
              <span class="block"><span class="text-brand-300">POST</span> /…/tax-invoice</span>
              <span class="block text-muted">{</span>
              <span class="block pl-2"><i class="inline-block h-1.5 w-16 rounded bg-ink-600 align-middle" /></span>
              <span class="block pl-2"><i class="inline-block h-1.5 w-10 rounded bg-ink-600 align-middle" /></span>
              <span class="block text-muted">}</span>
            </span>
            <svg class="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none"><path v-for="n in nodes" :key="n.t" :d="`M57 50 C 62 50, 62 ${n.y}, ${n.x - 2} ${n.y}`" fill="none" stroke="var(--color-ink-300)" stroke-width=".4" vector-effect="non-scaling-stroke" /></svg>
            <span v-for="n in nodes" :key="n.t" class="absolute -translate-y-1/2 whitespace-nowrap rounded-md border border-default bg-default px-2 py-1 text-[11px] font-semibold text-default shadow-sm lg:text-caption" :style="{ left: `${n.x}%`, top: `${n.y}%` }">{{ n.t }}</span>
          </span>
          <span class="mt-4 text-small text-toned md:mt-6 lg:text-body">인증키 즉시 발급부터 무료 테스트, AI 친화적인 개발 문서까지. 개발 부담을 줄이고 효율적인 연동을 지원합니다.</span>
        </a>

        <!-- 3 비용 경쟁력 -->
        <a href="#m02-3" class="group flex flex-col items-center text-center focus-visible:outline-offset-4">
          <span class="flex items-center gap-2 text-[18px] font-bold leading-[26px] text-highlighted lg:text-h3"><UIcon name="i-tabler-coin" class="size-6 text-primary" />비용 경쟁력</span>
          <span class="mt-4 flex aspect-[2/1] max-h-[220px] w-full flex-col justify-center rounded-xl border border-default bg-muted p-6 transition-colors group-hover:border-accent-line md:mt-6 md:aspect-[6/5] md:max-h-none lg:p-8">
            <span class="text-left text-small font-semibold text-default">월 이용 비용 비교<ConfirmTag label="비교 막대 법무 확인 · 실제 요금 비율 아님(연출)" /></span>
            <span class="mt-4 grid grid-cols-[48px_1fr] items-center gap-x-2 gap-y-3 text-left text-small">
              <b class="font-bold text-accent">바로빌</b><span class="h-5 w-[28.7%] rounded-r bg-primary" />
              <span class="col-start-2 -mt-1 flex flex-wrap gap-1"><i v-for="z in ['도입비 0원','기본료 0원','유지보수비 0원']" :key="z" class="rounded-xs border border-accent-line bg-default px-1.5 text-[11px] font-bold not-italic leading-5 text-accent">{{ z }}</i></span>
              <span class="text-muted">A사</span><span class="h-5 w-[57%] rounded-r bg-ink-300" />
              <span class="text-muted">B사</span><span class="h-5 w-full rounded-r bg-ink-300" />
            </span>
          </span>
          <span class="mt-4 text-small text-toned md:mt-6 lg:text-body">합리적인 이용 단가로 초기 도입부터 지속적인 서비스 운영까지 기업의 비용 부담을 줄입니다.</span>
        </a>
      </div>
    </div>
  </section>
</template>
