export interface TeamMember {
  name: string
  /** 인스타그램 아이디 (이름을 누르면 이동) */
  handle: string
  /** public/assets/team/{photo}.png */
  photo: string
}

export interface TeamGroup {
  name: string
  members: TeamMember[]
}

export const EXHIBITION = {
  title: 'ARC EXHIBITION VOL. 2',
  date: '27.01.28 - 02.02',
  venue: 'Maru Art Center 2F Gallery 5 · 3F Grand Hall',
  address: '35-6, Insadong-gil, Jongno-gu, Seoul',
  instagram: 'arc__project',
} as const

export const TEAM: TeamGroup[] = [
  {
    name: 'OPERATIONS',
    members: [
      { name: '이나경', handle: 'two_nagang', photo: 'op-1' },
      { name: '김민지', handle: '00_mingdi', photo: 'op-2' },
      { name: '박세환', handle: 'flaimhuman', photo: 'op-3' },
      { name: '박지민', handle: 'wlmin.y', photo: 'op-4' },
      { name: '이혜진', handle: 'dl_gpwks', photo: 'op-5' },
    ],
  },
  {
    name: 'DESIGN',
    members: [
      { name: '곽현서', handle: 'owaxnveonseo', photo: 'design-1' },
      { name: '부규빈', handle: 'byna__aa', photo: 'design-2' },
      { name: '이혜진', handle: 'dl_gpwks', photo: 'design-3' },
    ],
  },
  {
    name: 'CONT. PLANNING',
    members: [
      { name: '김현경', handle: 'xxhk29_', photo: 'planning-1' },
      { name: '이시은', handle: 's0__vr23', photo: 'planning-2' },
    ],
  },
  {
    name: 'SPACE',
    members: [
      { name: '김민지', handle: '00_mingdi', photo: 'space-1' },
      { name: '이나경', handle: 'two_nagang', photo: 'space-2' },
      { name: '윤세현', handle: 'lu_hyun_minous', photo: 'space-3' },
    ],
  },
  {
    name: 'OFFICE',
    members: [
      { name: '김시연', handle: 'i_sarang_u_', photo: 'office-1' },
      { name: '안예은', handle: 'notyeun', photo: 'office-2' },
    ],
  },
  {
    name: 'WEB DESIGN',
    members: [
      { name: '박지민', handle: 'wlmin.y', photo: 'webdesign-1' },
      { name: '유다연', handle: 'ekdusu.u', photo: 'webdesign-2' },
    ],
  },
  {
    name: 'WEB',
    members: [
      { name: '박세환', handle: 'flaimhuman', photo: 'web-1' },
      { name: '최도현', handle: 'oohveon', photo: 'web-2' },
    ],
  },
]
