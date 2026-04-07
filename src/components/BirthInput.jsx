import { useState } from 'react'
import styles from './BirthInput.module.css'

export default function BirthInput({ onSubmit }) {
  const [text, setText] = useState('')
  const [error, setError] = useState('')
  function handleTextChange(e) {
    const digits = e.target.value.replace(/\D/g, '').slice(0, 8)
    let formatted = digits
    if (digits.length > 4) formatted = digits.slice(0, 4) + '-' + digits.slice(4)
    if (digits.length > 6) formatted = digits.slice(0, 4) + '-' + digits.slice(4, 6) + '-' + digits.slice(6)
    setText(formatted)
    setError('')
  }

  function handleDatePick(e) {
    setText(e.target.value)
    setError('')
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!text) {
      setError('생년월일을 입력해 주세요.')
      return
    }
    const d = new Date(text)
    if (isNaN(d.getTime())) {
      setError('올바른 날짜를 입력해 주세요. (예: 1995-03-21)')
      return
    }
    const year = d.getFullYear()
    if (year < 1900 || year > new Date().getFullYear()) {
      setError('올바른 생년월일을 입력해 주세요.')
      return
    }
    onSubmit(text)
  }

  return (
    <div className={styles.container}>
      <div className={styles.crystal}>🔮</div>
      <h2 className={styles.title}>생년월일을 알려주세요</h2>
      <p className={styles.subtitle}>
        별자리와 띠, 그리고 오늘의 운세를<br />
        신비로운 타로카드로 알려드립니다
      </p>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputWrapper}>
          <input
            type="text"
            value={text}
            onChange={handleTextChange}
            className={styles.input}
            placeholder="YYYY-MM-DD"
          />
          <div className={styles.calendarBtn}>
            📅
            <input
              type="date"
              ref={datePickerRef}
              value={text}
              onChange={handleDatePick}
              max={new Date().toISOString().split('T')[0]}
              className={styles.hiddenDateInput}
            />
          </div>
        </div>
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit" className={styles.button}>
          <span className={styles.buttonText}>✨ 운세 보기</span>
        </button>
      </form>
    </div>
  )
}
