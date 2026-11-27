// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-11-01',
  devtools: { enabled: false },
  modules: ['@nuxt/ui'],
  css: ['~/assets/css/main.css'],
  components: [{ path: '~/components', pathPrefix: false }],
  ui: {
    // 외부 폰트 CDN 대신 로컬 Pretendard 패키지를 사용
    fonts: false,
    theme: { colors: ['primary', 'secondary', 'neutral', 'success', 'info', 'warning', 'error'] }
  },
  icon: {
    mode: 'svg',
    // 아이콘은 설치된 @iconify-json 패키지에서 번들 (외부 API 호출 없음)
    serverBundle: 'local',
    clientBundle: { scan: true }
  },
  app: {
    head: {
      htmlAttrs: { lang: 'ko' },
      title: '바로빌 개발자센터',
      meta: [{ name: 'description', content: '바로빌 API로 전자세금계산서 발행부터 홈택스·계좌·카드 조회, 메시지·팩스 발송까지 연동하세요.' }]
    }
  },
  colorMode: { preference: 'system', fallback: 'light', storageKey: 'bb-color-mode' },
  typescript: { strict: true }
})
