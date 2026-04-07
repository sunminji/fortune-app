import { useState, useMemo, useEffect } from 'react'
import { getShuffledDeck, POSITIONS } from '../utils/tarot'
import styles from './TarotReading.module.css'

export default function TarotReading({ birthdate, initialSelected, onSelectionChange, isShared }) {
  const [phase, setPhase] = useState(initialSelected ? 'result' : 'intro')
  const [selected, setSelected] = useState(initialSelected ?? [])
  const [revealed, setRevealed] = useState(initialSelected ? [0, 1, 2] : [])

  const deck = useMemo(() => getShuffledDeck(birthdate), [birthdate])
  const spread = useMemo(() => deck.slice(0, 7), [deck])

  // initialSelected로 시작한 경우 바로 결과 표시
  useEffect(() => {
    if (initialSelected?.length === 3) {
      setPhase('result')
      setSelected(initialSelected)
      setRevealed([0, 1, 2])
    }
  }, [])

  function handlePickCard(idx) {
    if (selected.includes(idx) || selected.length >= 3) return
    const next = [...selected, idx]
    setSelected(next)
    if (next.length === 3) {
      onSelectionChange?.(next)
      setTimeout(() => {
        setPhase('result')
        revealSequentially()
      }, 300)
    }
  }

  function revealSequentially() {
    setRevealed([])
    setTimeout(() => setRevealed([0]), 400)
    setTimeout(() => setRevealed([0, 1]), 1100)
    setTimeout(() => setRevealed([0, 1, 2]), 1800)
  }

  function handleReset() {
    setPhase('intro')
    setSelected([])
    setRevealed([])
    onSelectionChange?.(null)
  }

  if (phase === 'intro') {
    return (
      <div className={styles.intro}>
        <div className={styles.introIcon}>🃏</div>
        <h3 className={styles.introTitle}>타로 카드 리딩</h3>
        <p className={styles.introDesc}>
          과거·현재·미래의 흐름을<br />
          타로 카드로 읽어드립니다
        </p>
        <button className={styles.startBtn} onClick={() => setPhase('picking')}>
          카드 뽑기 시작
        </button>
      </div>
    )
  }

  if (phase === 'picking') {
    return (
      <div className={styles.picking}>
        <p className={styles.pickGuide}>
          {selected.length < 3
            ? `마음이 이끄는 카드를 고르세요 (${selected.length}/3)`
            : '카드를 확인하는 중...'}
        </p>
        <div className={styles.spreadRow}>
          {spread.map((card, idx) => {
            const isPicked = selected.includes(idx)
            const pickOrder = selected.indexOf(idx)
            return (
              <div
                key={card.id}
                className={`${styles.spreadCard} ${isPicked ? styles.spreadCardPicked : ''} ${selected.length >= 3 && !isPicked ? styles.spreadCardDim : ''}`}
                onClick={() => handlePickCard(idx)}
                style={{ '--card-color': card.color }}
              >
                <div className={styles.spreadCardBack}>
                  <div className={styles.spreadCardPattern}>✦</div>
                  {isPicked && (
                    <div className={styles.pickBadge}>{pickOrder + 1}</div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
        {selected.length > 0 && selected.length < 3 && (
          <p className={styles.pickHint}>카드를 {3 - selected.length}장 더 선택하세요</p>
        )}
      </div>
    )
  }

  const pickedCards = selected.map(idx => spread[idx])

  return (
    <div className={styles.result}>
      <p className={styles.resultTitle}>✦ 타로가 전하는 메시지 ✦</p>

      <div className={styles.resultRow}>
        {pickedCards.map((card, i) => (
          <div key={i} className={styles.resultCardWrap}>
            <div className={`${styles.resultCard} ${revealed.includes(i) ? styles.resultCardFlipped : ''}`}>
              <div className={styles.resultCardBack}>
                <div className={styles.resultCardBackPattern}>✦</div>
              </div>
              <div
                className={`${styles.resultCardFront} ${card.isReversed ? styles.reversed : ''}`}
                style={{ '--card-color': card.color }}
              >
                <div className={styles.resultCardEmoji}>{card.emoji}</div>
                <div className={styles.resultCardName}>{card.name}</div>
                {card.isReversed && <div className={styles.reversedBadge}>역방향</div>}
              </div>
            </div>
            <div className={styles.positionLabel}>{POSITIONS[i]}</div>
          </div>
        ))}
      </div>

      <div className={styles.messageList}>
        {pickedCards.map((card, i) => revealed.includes(i) && (
          <div key={i} className={styles.messageItem}>
            <span className={styles.messagePosition}>{POSITIONS[i]}</span>
            <p className={styles.cardMessage}>
              {card.isReversed ? card.reversed : card.upright}
            </p>
          </div>
        ))}
      </div>

      {!isShared && (
        <button className={styles.resetBtn} onClick={handleReset}>
          🔄 다시 뽑기
        </button>
      )}
    </div>
  )
}
