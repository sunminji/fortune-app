import { useMemo } from 'react'
import { getStarSign, getKoreanZodiac } from '../utils/zodiac'
import { getTodayFortune } from '../utils/fortune'
import { MainFortuneCard, CategoryCard } from './TarotCard'
import TarotReading from './TarotReading'
import styles from './FortuneResult.module.css'

const TODAY = new Date()
const TODAY_STR = `${TODAY.getFullYear()}년 ${TODAY.getMonth() + 1}월 ${TODAY.getDate()}일`

const ELEMENT_COLORS = {
  불: '#ff7048',
  땅: '#a0892e',
  바람: '#80d0ff',
  물: '#5098ff',
}

export default function FortuneResult({ birthdate, onReset }) {
  const { starSign, koreanZodiac, fortune } = useMemo(() => {
    const d = new Date(birthdate)
    const year = d.getFullYear()
    const month = d.getMonth() + 1
    const day = d.getDate()
    return {
      starSign: getStarSign(month, day),
      koreanZodiac: getKoreanZodiac(year),
      fortune: getTodayFortune(birthdate),
    }
  }, [birthdate])

  return (
    <div className={styles.container}>
      {/* 날짜 헤더 */}
      <div className={styles.dateHeader}>
        <span className={styles.dateText}>{TODAY_STR}</span>
        <span className={styles.dateSub}>오늘의 운세</span>
      </div>

      {/* 별자리 & 띠 뱃지 */}
      <div className={styles.badgeRow}>
        <div className={styles.badge}>
          <span className={styles.badgeEmoji}>{starSign.emoji}</span>
          <div className={styles.badgeInfo}>
            <span className={styles.badgeName}>{starSign.name}</span>
            <span
              className={styles.badgeSub}
              style={{ color: ELEMENT_COLORS[starSign.element] }}
            >
              {starSign.element} · {starSign.symbol}
            </span>
          </div>
        </div>
        <div className={styles.badgeDivider}>✦</div>
        <div className={styles.badge}>
          <span className={styles.badgeEmoji}>{koreanZodiac.emoji}</span>
          <div className={styles.badgeInfo}>
            <span className={styles.badgeName}>{koreanZodiac.name}띠</span>
            <span className={styles.badgeSub}>{koreanZodiac.trait}</span>
          </div>
        </div>
      </div>

      {/* 전체운 메인 카드 */}
      <div className={styles.mainCardSection}>
        <MainFortuneCard fortune={fortune.overall} delay={0.1} />
      </div>

      {/* 카테고리 카드 4개 */}
      <div className={styles.sectionTitle}>
        <span>카테고리별 운세</span>
        <span className={styles.sectionHint}>카드를 탭하여 확인하세요</span>
      </div>
      <div className={styles.categoryGrid}>
        {[
          { key: 'love', delay: 0.1 },
          { key: 'money', delay: 0.2 },
          { key: 'health', delay: 0.3 },
          { key: 'career', delay: 0.4 },
        ].map(({ key, delay }) => (
          <div key={key} className={styles.categoryCardWrapper}>
            <CategoryCard
              category={key}
              fortune={fortune[key]}
              delay={delay}
            />
          </div>
        ))}
      </div>

      {/* 오늘의 행운 아이템 */}
      <div className={styles.luckySection}>
        <h3 className={styles.luckyTitle}>✦ 오늘의 행운 ✦</h3>
        <div className={styles.luckyGrid}>
          <LuckyItem icon="🎨" label="행운의 색" value={fortune.lucky.color} />
          <LuckyItem icon="🔢" label="행운의 숫자" value={fortune.lucky.number} />
          <LuckyItem icon="🧿" label="행운의 물건" value={fortune.lucky.item} />
          <LuckyItem icon="⏰" label="행운의 시간" value={fortune.lucky.time} />
          <LuckyItem icon="🧭" label="행운의 방향" value={fortune.lucky.direction} />
        </div>
      </div>

      {/* 타로 카드 리딩 */}
      <div className={styles.tarotSection}>
        <div className={styles.sectionTitle}>
          <span>타로 카드 리딩</span>
          <span className={styles.sectionHint}>카드 3장을 뽑아 운명의 메시지를 확인하세요</span>
        </div>
        <TarotReading birthdate={birthdate} />
      </div>

      {/* 다시 보기 버튼 */}
      <button className={styles.resetButton} onClick={onReset}>
        🔄 다른 날짜로 보기
      </button>
    </div>
  )
}

function LuckyItem({ icon, label, value }) {
  return (
    <div className={styles.luckyItem}>
      <span className={styles.luckyIcon}>{icon}</span>
      <span className={styles.luckyLabel}>{label}</span>
      <span className={styles.luckyValue}>{value}</span>
    </div>
  )
}
