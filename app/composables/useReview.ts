/**
 * 검토(Design Studio)용 상태 — 운영 코드와 분리.
 * concept : 디자인 컨셉 A/B  (?concept=a|b, 쿠키 유지)
 * auth    : 로그인 상태 Mock (?auth=1)  — 실제 인증과 연결되지 않음
 */
export type Concept = 'a' | 'b'

export function useConcept() {
  const route = useRoute()
  const cookie = useCookie<Concept>('bb-concept', { default: () => 'a', sameSite: 'lax' })
  const q = route.query.concept
  if (q === 'a' || q === 'b') cookie.value = q
  return computed<Concept>(() => {
    const v = route.query.concept
    return v === 'a' || v === 'b' ? v : cookie.value
  })
}

export function useMockAuth() {
  const route = useRoute()
  const cookie = useCookie<'0' | '1'>('bb-auth', { default: () => '0', sameSite: 'lax' })
  if (route.query.auth === '1' || route.query.auth === '0') cookie.value = route.query.auth
  return computed(() => (route.query.auth ?? cookie.value) === '1')
}
