/**
 * 사이트 정보 구조(IA) — 화면설계서(docs/wireframe) 기준.
 * 메뉴 · 메가메뉴 · 푸터 · Design Studio 페이지 목록이 모두 이 데이터를 사용한다.
 */
export interface NavItem {
  label: string
  to: string
  desc?: string
  icon?: string
  ready?: boolean // Design Studio: 시안 제작 완료 여부
}
export interface NavGroup { label: string, items: NavItem[] }

export const productGroups: NavGroup[] = [
  {
    label: '문서 발행',
    items: [
      { label: '전자세금계산서 발행', to: '/api/tax-invoice', icon: 'i-tabler-file-invoice' },
      { label: '전자세금계산서 구축형', to: '/api/tax-invoice-onpremise', icon: 'i-tabler-server-2' },
      { label: '현금영수증 발행', to: '/api/cash-receipt', icon: 'i-tabler-receipt' },
      { label: '전자문서', to: '/api/e-document', icon: 'i-tabler-file-certificate' }
    ]
  },
  {
    label: '데이터 조회·수집',
    items: [
      { label: '계좌 통합 조회', to: '/api/bank-account', icon: 'i-tabler-building-bank' },
      { label: '카드 통합 조회', to: '/api/card', icon: 'i-tabler-credit-card' },
      { label: '홈택스 매입매출조회', to: '/api/hometax', icon: 'i-tabler-report-search' },
      { label: '사업자등록상태조회', to: '/api/business-status', icon: 'i-tabler-id-badge-2' },
      { label: '예금주 성명·실명 조회', to: '/api/account-holder', icon: 'i-tabler-user-check' },
      { label: '제3자세금계산서발급사실조회', to: '/api/third-party-issuance', icon: 'i-tabler-file-search' }
    ]
  },
  {
    label: '메시지·팩스 전송',
    items: [
      { label: '카카오 메시지 전송', to: '/api/kakao', icon: 'i-tabler-message-chatbot' },
      { label: '문자 전송', to: '/api/sms', icon: 'i-tabler-message-2' },
      { label: '팩스 전송', to: '/api/fax', icon: 'i-tabler-printer' }
    ]
  }
]

export const solutionGroups: NavGroup[] = [
  {
    label: '업무 자동화',
    items: [
      { label: '회계·경비 데이터 수집', to: '/solutions/accounting-data', desc: '은행사, 카드사, 홈택스 개별 접속 없이 우리 시스템에 자동 수집', icon: 'i-tabler-database-import' },
      { label: '매출증빙 발행', to: '/solutions/sales-evidence', desc: '주문·청구 시스템에서 바로 발행', icon: 'i-tabler-file-export' },
      { label: '입금 확인·정산', to: '/solutions/settlement', desc: '흩어진 계좌의 입금 내역을 한 번에 통합 조회', icon: 'i-tabler-coins' }
    ]
  },
  {
    label: '고객·거래처 서비스 제공',
    items: [
      { label: 'SaaS·플랫폼에 탑재', to: '/solutions/platform', desc: 'SaaS·플랫폼 안에서 고객사가 발행·조회', icon: 'i-tabler-apps' },
      { label: '재판매로 수익화', to: '/solutions/resell', desc: '판매가는 직접 정하고 매월 정산', icon: 'i-tabler-chart-arrows-vertical' },
      { label: 'SI·외주 구축', to: '/solutions/si', desc: 'SI·외주로 납품하고 고객사에 이관', icon: 'i-tabler-tool' }
    ]
  }
]

export const supportItems: NavItem[] = [
  { label: 'FAQ', to: '/support/faq' },
  { label: '고객사례', to: '/support/customers' },
  { label: '이용문의', to: '/support/contact' },
  { label: '제안서 다운로드', to: '/support/proposal' },
  { label: '공지사항', to: '/support/notices' },
  { label: 'AI 에이전트 연결', to: '/docs/guides/ai-tools' }
]

export const contact = { phone: '1544-9256' }

/** Design Studio 페이지 목록 — app/data/page-registry.json에서 생성 (수동 메뉴 관리 없음) */
import registry from '~/data/page-registry.json'
export type PageEntry = (typeof registry.pages)[number]
export const pageRegistry = registry.pages as PageEntry[]
const ready = (p: PageEntry) => p.status.dev !== '미착수'
export const studioPages: { label: string, items: (NavItem & { entry: PageEntry })[] }[] = [...new Set(pageRegistry.map(p => p.group))].map(g => ({
  label: g,
  items: pageRegistry.filter(p => p.group === g && p.route).map(p => ({ label: p.name, to: p.route as string, ready: ready(p), entry: p }))
}))
