// 서양 별자리
export const STAR_SIGNS = [
  { name: '염소자리', symbol: '♑', en: 'Capricorn', emoji: '🐐', element: '땅', trait: '성실 · 현실', start: [12, 22], end: [1, 19] },
  { name: '물병자리', symbol: '♒', en: 'Aquarius', emoji: '🏺', element: '바람', trait: '자유 · 이상', start: [1, 20], end: [2, 18] },
  { name: '물고기자리', symbol: '♓', en: 'Pisces', emoji: '🐟', element: '물', trait: '감성 · 직관', start: [2, 19], end: [3, 20] },
  { name: '양자리', symbol: '♈', en: 'Aries', emoji: '🐏', element: '불', trait: '용기 · 도전', start: [3, 21], end: [4, 19] },
  { name: '황소자리', symbol: '♉', en: 'Taurus', emoji: '🐂', element: '땅', trait: '성실 · 신뢰', start: [4, 20], end: [5, 20] },
  { name: '쌍둥이자리', symbol: '♊', en: 'Gemini', emoji: '👫', element: '바람', trait: '재치 · 소통', start: [5, 21], end: [6, 20] },
  { name: '게자리', symbol: '♋', en: 'Cancer', emoji: '🦀', element: '물', trait: '공감 · 보호', start: [6, 21], end: [7, 22] },
  { name: '사자자리', symbol: '♌', en: 'Leo', emoji: '🦁', element: '불', trait: '자신감 · 열정', start: [7, 23], end: [8, 22] },
  { name: '처녀자리', symbol: '♍', en: 'Virgo', emoji: '👩', element: '땅', trait: '분석 · 완벽', start: [8, 23], end: [9, 22] },
  { name: '천칭자리', symbol: '♎', en: 'Libra', emoji: '⚖️', element: '바람', trait: '균형 · 우아', start: [9, 23], end: [10, 22] },
  { name: '전갈자리', symbol: '♏', en: 'Scorpio', emoji: '🦂', element: '물', trait: '신비 · 직관', start: [10, 23], end: [11, 21] },
  { name: '사수자리', symbol: '♐', en: 'Sagittarius', emoji: '🏹', element: '불', trait: '자유 · 모험', start: [11, 22], end: [12, 21] },
]

// 한국 띠 (12지신)
const KOREAN_ZODIAC = [
  { name: '쥐', emoji: '🐭', trait: '영리 · 재치' },
  { name: '소', emoji: '🐮', trait: '성실 · 신뢰' },
  { name: '호랑이', emoji: '🐯', trait: '용기 · 카리스마' },
  { name: '토끼', emoji: '🐰', trait: '온화 · 감성' },
  { name: '용', emoji: '🐲', trait: '열정 · 강인' },
  { name: '뱀', emoji: '🐍', trait: '지혜 · 신중' },
  { name: '말', emoji: '🐴', trait: '활발 · 자유' },
  { name: '양', emoji: '🐑', trait: '온순 · 예술' },
  { name: '원숭이', emoji: '🐵', trait: '총명 · 유머' },
  { name: '닭', emoji: '🐔', trait: '근면 · 정직' },
  { name: '개', emoji: '🐶', trait: '충직 · 의리' },
  { name: '돼지', emoji: '🐷', trait: '복 · 낙관' },
]

export function getStarSign(month, day) {
  const md = month * 100 + day
  if (md >= 1222 || md <= 119) return STAR_SIGNS[0]
  if (md >= 120 && md <= 218) return STAR_SIGNS[1]
  if (md >= 219 && md <= 320) return STAR_SIGNS[2]
  if (md >= 321 && md <= 419) return STAR_SIGNS[3]
  if (md >= 420 && md <= 520) return STAR_SIGNS[4]
  if (md >= 521 && md <= 620) return STAR_SIGNS[5]
  if (md >= 621 && md <= 722) return STAR_SIGNS[6]
  if (md >= 723 && md <= 822) return STAR_SIGNS[7]
  if (md >= 823 && md <= 922) return STAR_SIGNS[8]
  if (md >= 923 && md <= 1022) return STAR_SIGNS[9]
  if (md >= 1023 && md <= 1121) return STAR_SIGNS[10]
  return STAR_SIGNS[11]
}

export function getKoreanZodiac(year) {
  const idx = (year - 1900) % 12
  return KOREAN_ZODIAC[(idx + 12) % 12]
}
