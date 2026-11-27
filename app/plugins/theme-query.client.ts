// Design Studio 연동: ?theme=light|dark|system 으로 컬러 모드 지정 (선택값은 bb-color-mode에 저장되어 유지)
export default defineNuxtPlugin(() => {
  const route = useRoute()
  const colorMode = useColorMode()
  const apply = (t: unknown) => { if (t === 'light' || t === 'dark' || t === 'system') colorMode.preference = t }
  apply(route.query.theme)
  watch(() => route.query.theme, apply)
})
