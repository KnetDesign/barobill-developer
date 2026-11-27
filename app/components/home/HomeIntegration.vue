<script setup lang="ts">
import type { Concept } from '~/composables/useReview'
defineProps<{ concept: Concept }>()

// MCP 토글 off = 1차 기본 → 아코디언 3항목
const accItems = [
  { label: 'AI로 더 빠르게 개발', content: 'AI 도구가 마크다운 원문 · llms.txt · OpenAPI 3.0으로 바로빌 문서를 추측 없이 읽어, 개발 시간을 줄일 수 있습니다.', value: '0' },
  { label: '구현용이성을 높이는 명료한 문서', content: '연동이 처음이어도, 친절한 가이드와 바로 호출해 볼 수 있는 Playground로 API를 쉽게 이해합니다.', value: '1' },
  { label: '풍부한 SDK와 18개 언어 예제코드', content: '어떤 언어를 쓰든, 18개 언어 예제 코드를 그대로 가져다 바로 시작합니다.', value: '2' }
]
const acc = {
  root: 'border-t border-default',
  item: 'border-b border-default',
  trigger: 'py-5 text-[18px]/[28px] font-bold text-muted data-[state=open]:text-highlighted hover:text-highlighted',
  trailingIcon: 'size-5',
  body: 'pb-5 text-[14px]/[20px] text-toned md:text-[16px]/[24px]'
}
const title = ['AI로 더 빠르게,', '기술지원은 확실하게']
const lead = 'AI 도구를 쓰든, 직접 개발하든 바로빌 문서 하나로 막힘없이 연동할 수 있습니다.'
const langs = ['Java', 'Node.js', 'Python', '.NET', 'PHP', 'ASP', 'Delphi', 'PowerBuilder', 'Visual Basic']
</script>

<template>
  <section id="m02-2" class="bb-section scroll-mt-16 bg-default" aria-labelledby="m02-2-title">
    <div class="bb-container">
      <!-- ===== A: 이미지(문서 화면 + 터미널) + 아코디언 ===== -->
      <div v-if="concept === 'a'" class="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-8">
        <div class="order-2 lg:col-span-7">
          <figure class="relative overflow-hidden rounded-xl bg-elevated lg:aspect-[696/712]" aria-label="바로빌 개발자 문서 화면과 AI 코딩 도구 터미널 예시">
            <!-- 뒤: 개발자 문서 화면 -->
            <div class="relative m-6 mb-28 overflow-hidden rounded-lg bg-default shadow-sm ring-1 ring-default sm:m-10 sm:mb-32 lg:absolute lg:inset-x-10 lg:top-10 lg:m-0 lg:h-[62%]" aria-hidden="true">
              <div class="flex h-10 items-center justify-between border-b border-default px-4">
                <span class="flex items-center gap-2 text-caption font-bold text-default"><AppLogo class="scale-75 origin-left" /></span>
                <span class="flex items-center gap-1 rounded-md bg-ink-900 px-2 py-1 text-[11px] font-semibold text-white"><UIcon name="i-tabler-sparkles" class="size-3" />AI로 열기</span>
              </div>
              <div class="grid grid-cols-[30%_1fr] gap-4 p-4">
                <div class="space-y-2"><i v-for="n in 7" :key="n" class="block h-2 rounded bg-elevated" :class="n === 3 && 'bg-accent-soft'" :style="{ width: `${60 + (n * 13) % 35}%` }" /></div>
                <div class="space-y-2.5">
                  <p class="text-small font-bold text-highlighted">현금영수증 발행</p>
                  <i class="block h-2 w-11/12 rounded bg-elevated" /><i class="block h-2 w-4/5 rounded bg-elevated" />
                  <div class="rounded-md bg-ink-900 p-3"><i class="block h-1.5 w-3/4 rounded bg-ink-600" /><i class="mt-2 block h-1.5 w-1/2 rounded bg-ink-600" /><i class="mt-2 block h-1.5 w-2/3 rounded bg-ink-600" /></div>
                </div>
              </div>
            </div>
            <!-- 앞: 터미널 -->
            <div class="absolute bottom-6 right-4 w-[78%] max-w-[420px] overflow-hidden rounded-lg bg-ink-950 font-mono text-[11px] leading-[18px] text-dimmed shadow-[0_16px_40px_rgba(10,15,24,.35)] sm:bottom-10 sm:right-8 sm:text-[12px] sm:leading-5 lg:bottom-auto lg:top-[44%]">
              <div class="flex h-8 items-center gap-1.5 border-b border-white/10 px-3"><i class="size-2 rounded-full bg-ink-700" /><i class="size-2 rounded-full bg-ink-700" /><i class="size-2 rounded-full bg-ink-700" /><span class="ml-2 text-[10px] text-muted">terminal</span></div>
              <div class="space-y-1 p-4">
                <p><span class="text-brand-300">&gt;</span> <span class="text-white">바로빌 현금영수증 발행 연동 코드 작성해 줘</span></p>
                <p class="text-muted">· llms.txt에서 관련 문서를 찾았습니다</p>
                <p class="text-muted">· 현금영수증 문서(.md)를 읽었습니다</p>
                <p><span class="text-emerald-400">✓</span> 코드 작성 완료</p>
                <p class="text-muted">참조: 현금영수증 발행 API 문서</p>
              </div>
            </div>
            <!-- 고객 인용 노드 -->
            <figcaption class="absolute bottom-6 left-4 hidden max-w-[300px] rounded-lg bg-default p-4 shadow-[0_8px_24px_rgba(10,15,24,.12)] ring-1 ring-default md:block lg:bottom-10 lg:left-10">
              <p class="text-body font-semibold text-highlighted">“빠르게 도입하고 운영 전환할 수 있는 서비스”</p>
              <p class="mt-3 flex items-center gap-2 text-caption"><span class="grid size-6 place-items-center rounded-full bg-elevated text-[10px] font-bold text-toned">지</span><span><b class="block text-default">주식회사 지구하다 김** 차장</b><span class="text-muted">2026년 10월 연동 경험 설문</span></span></p>
            </figcaption>
          </figure>
          <figure class="mt-4 rounded-lg border border-default p-4 md:hidden">
            <p class="text-body font-semibold">“빠르게 도입하고 운영 전환할 수 있는 서비스”</p>
            <p class="mt-2 text-caption"><b class="text-default">주식회사 지구하다 김** 차장</b> · <span class="text-muted">2026년 10월 연동 경험 설문</span></p>
          </figure>
        </div>
        <div class="order-1 lg:col-span-5">
          <SectionHead eyebrow="02 연동 편의성" :title="title" :lead="lead" />
          <UAccordion class="mt-8" :items="accItems" default-value="0" :ui="acc" />
          <p class="mt-6 flex items-center gap-2 text-small text-toned"><UIcon name="i-tabler-headset" class="size-4 text-primary" />연동 개발 중 막히면 전담 엔지니어가 1:1로 도와드립니다.<ConfirmTag label="'전담 엔지니어' 운영 체계 확인 · '18개 언어'(제안서 9종) · OpenAPI 3.0 · Playground 출시 범위 확인" /></p>
          <ULink to="/docs" class="group mt-6 inline-flex items-center gap-1 text-body font-bold text-accent">API 개발 문서 보기 <UIcon name="i-tabler-arrow-right" class="size-4 transition-transform group-hover:translate-x-1" /></ULink>
        </div>
      </div>

      <!-- ===== B: 머리말 + 그래픽 칸 셋 + 지원 한 줄 ===== -->
      <template v-else>
        <SectionHead eyebrow="02 연동 편의성" :title="title" :lead="lead" layout="split" />
        <div class="mt-12 grid gap-6 md:mt-16 lg:grid-cols-3 lg:gap-8">
          <div class="rounded-xl border border-default p-6 lg:p-8">
            <div class="flex h-40 items-center justify-center gap-2 rounded-lg bg-muted" aria-hidden="true">
              <span v-for="(f, i) in ['.md', 'llms.txt', 'OpenAPI']" :key="f" class="grid h-20 w-[72px] place-items-center rounded-md border border-default bg-default font-mono text-caption font-bold text-default shadow-sm" :class="i === 1 && '-translate-y-2 border-accent-line text-accent'">{{ f }}</span>
            </div>
            <p class="mt-6 text-title">AI가 읽기 쉬운 문서</p>
            <p class="mt-2 text-small text-toned md:text-body">{{ accItems[0]!.content }}</p>
          </div>
          <div class="rounded-xl border border-default p-6 lg:p-8">
            <div class="h-40 rounded-lg bg-muted p-4" aria-hidden="true">
              <div class="flex gap-1.5"><span class="rounded bg-emerald-100 px-1.5 text-[10px] font-bold leading-5 text-emerald-700">POST</span><i class="my-auto block h-2 w-28 rounded bg-accented" /></div>
              <div class="mt-3 grid grid-cols-2 gap-2 text-[10px] font-semibold text-muted"><div class="rounded-md bg-default p-2 ring-1 ring-default">요청 예시<i class="mt-1.5 block h-1.5 w-4/5 rounded bg-elevated" /><i class="mt-1 block h-1.5 w-3/5 rounded bg-elevated" /></div><div class="rounded-md bg-default p-2 ring-1 ring-default">응답 예시<i class="mt-1.5 block h-1.5 w-3/4 rounded bg-elevated" /><i class="mt-1 block h-1.5 w-1/2 rounded bg-elevated" /></div></div>
              <div class="mt-2 rounded-md bg-default p-2 text-[10px] font-semibold text-muted ring-1 ring-default">오류 코드 · 원인 · 조치</div>
            </div>
            <p class="mt-6 text-title">사람이 읽기에도 명확한 문서</p>
            <p class="mt-2 text-small text-toned md:text-body">API마다 요청·응답 예시를 두고, 오류 코드마다 원인과 조치를 적습니다.</p>
          </div>
          <div class="rounded-xl border border-default p-6 lg:p-8">
            <div class="flex h-40 flex-wrap content-center justify-center gap-1.5 rounded-lg bg-muted p-4" aria-hidden="true">
              <span v-for="l in langs" :key="l" class="rounded-md border border-default bg-default px-2 py-1 text-caption font-semibold text-default">{{ l }}</span>
              <span class="rounded-md border border-dashed border-accented px-2 py-1 text-caption text-dimmed">+ 9</span>
            </div>
            <p class="mt-6 text-title">18개 언어 예제 코드<ConfirmTag label="18종 목록 확인 필요 (제안서에는 9종) · 확인 전 '9개 언어' 대안" /></p>
            <p class="mt-2 text-small text-toned md:text-body">Java·Node.js부터 Delphi·PowerBuilder까지, 쓰는 언어의 예제 코드로 시작합니다.</p>
          </div>
        </div>
        <div class="mt-8 flex flex-col gap-4 border-t border-default pt-6 md:flex-row md:items-center md:justify-between">
          <p class="flex items-center gap-2 text-small text-toned"><UIcon name="i-tabler-headset" class="size-4 text-primary" />연동 개발 중 막히면 전담 엔지니어가 1:1로 도와드립니다.</p>
          <ULink to="/docs" class="group inline-flex items-center gap-1 text-body font-bold text-accent">API 개발 문서 보기 <UIcon name="i-tabler-arrow-right" class="size-4 transition-transform group-hover:translate-x-1" /></ULink>
        </div>
      </template>
    </div>
  </section>
</template>
