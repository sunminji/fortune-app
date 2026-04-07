// 서양 별자리
export const STAR_SIGNS = [
  { name: '염소자리', symbol: '♑', en: 'Capricorn', emoji: '🐐', element: '땅', start: [12, 22], end: [1, 19] },
  { name: '물병자리', symbol: '♒', en: 'Aquarius', emoji: '🏺', element: '바람', start: [1, 20], end: [2, 18] },
  { name: '물고기자리', symbol: '♓', en: 'Pisces', emoji: '🐟', element: '물', start: [2, 19], end: [3, 20] },
  { name: '양자리', symbol: '♈', en: 'Aries', emoji: '🐏', element: '불', start: [3, 21], end: [4, 19] },
  { name: '황소자리', symbol: '♉', en: 'Taurus', emoji: '🐂', element: '땅', start: [4, 20], end: [5, 20] },
  { name: '쌍둥이자리', symbol: '♊', en: 'Gemini', emoji: '👫', element: '바람', start: [5, 21], end: [6, 20] },
  { name: '게자리', symbol: '♋', en: 'Cancer', emoji: '🦀', element: '물', start: [6, 21], end: [7, 22] },
  { name: '사자자리', symbol: '♌', en: 'Leo', emoji: '🦁', element: '불', start: [7, 23], end: [8, 22] },
  { name: '처녀자리', symbol: '♍', en: 'Virgo', emoji: '👩', element: '땅', start: [8, 23], end: [9, 22] },
  { name: '천칭자리', symbol: '♎', en: 'Libra', emoji: '⚖️', element: '바람', start: [9, 23], end: [10, 22] },
  { name: '전갈자리', symbol: '♏', en: 'Scorpio', emoji: '🦂', element: '물', start: [10, 23], end: [11, 21] },
  { name: '사수자리', symbol: '♐', en: 'Sagittarius', emoji: '🏹', element: '불', start: [11, 22], end: [12, 21] },
]

// 한국 띠 (12지신)
const KOREAN_ZODIAC = [
  { name: '쥐', emoji: '🐭', trait: '영리하고 재치 있는' },
  { name: '소', emoji: '🐮', trait: '성실하고 믿음직한' },
  { name: '호랑이', emoji: '🐯', trait: '용감하고 카리스마 있는' },
  { name: '토끼', emoji: '🐰', trait: '온화하고 섬세한' },
  { name: '용', emoji: '🐲', trait: '열정적이고 강인한' },
  { name: '뱀', emoji: '🐍', trait: '지혜롭고 신중한' },
  { name: '말', emoji: '🐴', trait: '활발하고 자유로운' },
  { name: '양', emoji: '🐑', trait: '온순하고 예술적인' },
  { name: '원숭이', emoji: '🐵', trait: '총명하고 유머러스한' },
  { name: '닭', emoji: '🐔', trait: '근면하고 정직한' },
  { name: '개', emoji: '🐶', trait: '충직하고 용감한' },
  { name: '돼지', emoji: '🐷', trait: '너그럽고 복이 많은' },
]

export function getStarSign(month, day) {
  const md = month * 100 + day
  if (md >= 1222 || md <= 119) return STAR_SIGNS[0] // 염소자리
  if (md >= 120 && md <= 218) return STAR_SIGNS[1]  // 물병자리
  if (md >= 219 && md <= 320) return STAR_SIGNS[2]  // 물고기자리
  if (md >= 321 && md <= 419) return STAR_SIGNS[3]  // 양자리
  if (md >= 420 && md <= 520) return STAR_SIGNS[4]  // 황소자리
  if (md >= 521 && md <= 620) return STAR_SIGNS[5]  // 쌍둥이자리
  if (md >= 621 && md <= 722) return STAR_SIGNS[6]  // 게자리
  if (md >= 723 && md <= 822) return STAR_SIGNS[7]  // 사자자리
  if (md >= 823 && md <= 922) return STAR_SIGNS[8]  // 처녀자리
  if (md >= 923 && md <= 1022) return STAR_SIGNS[9] // 천칭자리
  if (md >= 1023 && md <= 1121) return STAR_SIGNS[10] // 전갈자리
  return STAR_SIGNS[11] // 사수자리
}

export function getKoreanZodiac(year) {
  const idx = (year - 1900) % 12
  return KOREAN_ZODIAC[(idx + 12) % 12]
}
