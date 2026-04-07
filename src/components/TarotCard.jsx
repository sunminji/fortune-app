import styles from './TarotCard.module.css'

const CATEGORY_LABELS = {
  love: '애정운',
  money: '금전운',
  health: '건강운',
  career: '직업운',
}

const CATEGORY_COLORS = {
  love: '#ff6b9d',
  money: '#f0d060',
  health: '#6bffb3',
  career: '#6bb5ff',
}

function Stars({ score }) {
  return (
    <div className={styles.stars}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < score ? styles.starOn : styles.starOff}>★</span>
      ))}
    </div>
  )
}

// 메인 전체운 카드
export function MainFortuneCard({ fortune, delay = 0 }) {
  return (
    <div
      className={`${styles.cardWrapper} ${styles.mainWrapper}`}
      style={{ '--delay': `${delay}s` }}
    >
      <div className={`${styles.cardFace} ${styles.cardFront} ${styles.mainFront}`}>
        <div className={styles.mainIcon}>{fortune.icon}</div>
        <div className={styles.mainScoreLabel}>전체운</div>
        <Stars score={fortune.score} />
        <div className={styles.mainFortuneTitle}>{fortune.title}</div>
        <p className={styles.mainDesc}>{fortune.desc}</p>
        <div className={styles.adviceBox}>
          <span className={styles.adviceLabel}>오늘의 조언</span>
          <p className={styles.adviceText}>{fortune.advice}</p>
        </div>
      </div>
    </div>
  )
}

// 카테고리별 미니 카드
export function CategoryCard({ category, fortune, delay = 0 }) {
  const color = CATEGORY_COLORS[category]
  const label = CATEGORY_LABELS[category]

  return (
    <div
      className={styles.cardWrapper}
      style={{ '--delay': `${delay}s`, '--accent': color }}
    >
      <div className={`${styles.cardFace} ${styles.cardFront}`}>
        <div className={styles.categoryIcon}>{fortune.icon}</div>
        <div className={styles.categoryLabel} style={{ color }}>{label}</div>
        <Stars score={fortune.score} />
        <div className={styles.categoryTitle}>{fortune.title}</div>
        <p className={styles.categoryDesc}>{fortune.desc}</p>
      </div>
    </div>
  )
}
