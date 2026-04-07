import { useState } from 'react'
import StarField from './components/StarField'
import BirthInput from './components/BirthInput'
import FortuneResult from './components/FortuneResult'
import styles from './App.module.css'

export default function App() {
  const [birthdate, setBirthdate] = useState(null)

  return (
    <div className={styles.app}>
      <StarField />
      <div className={styles.content}>
        <header className={styles.header}>
          <div className={styles.headerGlow} />
          <h1 className={styles.title}>오늘의 운세</h1>
          <p className={styles.subtitle}>썬이 전하는 오늘의 이야기</p>
        </header>

        <main className={styles.main}>
          {!birthdate ? (
            <BirthInput onSubmit={setBirthdate} />
          ) : (
            <FortuneResult birthdate={birthdate} onReset={() => setBirthdate(null)} />
          )}
        </main>
      </div>
    </div>
  )
}
