import React, { useState } from 'react'
import CzechLanguageGame from './components/CzechLanguageGame'
import CzechLanguageTest from './components/CzechLanguageTest'

function App() {
  const [mode, setMode] = useState<'game' | 'test'>('game')

  return (
    <div>
      <header style={{ padding: '1rem', textAlign: 'center' }}>
        <button onClick={() => setMode('game')} style={{ marginRight: '1rem' }}>
          Гра
        </button>
        <button onClick={() => setMode('test')}>
          Тест
        </button>
      </header>
      {mode === 'game' ? <CzechLanguageGame /> : <CzechLanguageTest />}
    </div>
  )
}

export default App
