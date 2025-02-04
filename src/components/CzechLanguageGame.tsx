import React, { useState } from 'react'
import { MoonIcon, SunIcon, HeartIcon } from 'lucide-react'
import questions from '../data/questions'

const CzechLanguageGame = () => {
  const [level, setLevel] = useState<string | null>(null)
  const [questionsList, setQuestionsList] = useState<any[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)
  const [gameOver, setGameOver] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [incorrectAnswers, setIncorrectAnswers] = useState<any[]>([])

  const startGame = (selectedLevel: string) => {
    const levelQuestions = questions[selectedLevel]
      .sort(() => 0.5 - Math.random())
      .slice(0, 20)
    setLevel(selectedLevel)
    setQuestionsList(levelQuestions)
    setCurrentQuestionIndex(0)
    setScore(0)
    setLives(3)
    setGameOver(false)
    setIncorrectAnswers([])
  }

  const handleAnswer = (selectedIndex: number) => {
    const currentQuestion = questionsList[currentQuestionIndex]
    setSelectedAnswer(selectedIndex)

    if (selectedIndex === currentQuestion.correct) {
      setScore((prev) => prev + 1)
    } else {
      setLives((prev) => prev - 1)
      setIncorrectAnswers((prev) => [
        ...prev,
        {
          question: currentQuestion.question,
          selectedAnswer: currentQuestion.options[selectedIndex],
          correctAnswer: currentQuestion.options[currentQuestion.correct],
          explanation: currentQuestion.explanation
        }
      ])
      if (lives <= 1) {
        setGameOver(true)
      }
    }

    setTimeout(() => {
      if (currentQuestionIndex < questionsList.length - 1 && lives > 1) {
        setCurrentQuestionIndex((prev) => prev + 1)
        setSelectedAnswer(null)
      } else {
        setGameOver(true)
      }
    }, 500)
  }

  const getAnswerColor = (index: number) => {
    if (selectedAnswer === null) return ''
    return index === questionsList[currentQuestionIndex].correct
      ? 'bg-green-500 text-white'
      : selectedAnswer === index
      ? 'bg-red-500 text-white'
      : ''
  }

  const restartGame = () => {
    setLevel(null)
    setGameOver(false)
  }

  return (
    <div className={\`min-h-screen p-4 transition-colors \${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}\`}>
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Гра «Вивчаємо чеську»</h1>
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full hover:bg-gray-200"
          >
            {darkMode ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>

        {!level && (
          <div className="grid grid-cols-2 gap-4">
            {['A', 'A1', 'A2', 'B1'].map((levelOption) => (
              <button 
                key={levelOption}
                onClick={() => startGame(levelOption)}
                className="p-4 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Рівень {levelOption}
              </button>
            ))}
          </div>
        )}

        {level && !gameOver && questionsList.length > 0 && (
          <div>
            <div className="flex justify-between mb-4">
              <div className="flex items-center">
                {[...Array(lives)].map((_, i) => (
                  <HeartIcon key={i} className="text-red-500" fill="currentColor" />
                ))}
              </div>
              <p>Питання {currentQuestionIndex + 1} з {questionsList.length}</p>
            </div>

            <div className="bg-gray-100 p-6 rounded-lg">
              <h2 className="text-xl mb-4">{questionsList[currentQuestionIndex].question}</h2>
              
              <div className="grid grid-cols-2 gap-4">
                {questionsList[currentQuestionIndex].options.map((option: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    disabled={selectedAnswer !== null}
                    className={\`p-3 rounded \${getAnswerColor(index)} \${selectedAnswer === null ? 'bg-gray-200 hover:bg-gray-300' : ''}\`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {gameOver && (
          <div className="text-center">
            <h2 className="text-2xl mb-4">Результати гри</h2>
            <p className="text-xl mb-4">
              Ваш результат: {((score / questionsList.length) * 100).toFixed(1)}% ({score}/{questionsList.length} правильно)
            </p>

            {incorrectAnswers.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-bold mb-4">Неправильні відповіді</h3>
                {incorrectAnswers.map((incorrect, index) => (
                  <div key={index} className="bg-red-100 p-4 rounded mb-2">
                    <p><strong>Питання:</strong> {incorrect.question}</p>
                    <p><strong>Ваша відповідь:</strong> {incorrect.selectedAnswer}</p>
                    <p><strong>Правильна відповідь:</strong> {incorrect.correctAnswer}</p>
                    <p><strong>Пояснення:</strong> {incorrect.explanation}</p>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6 flex justify-center space-x-4">
              <button 
                onClick={() => startGame(level)}
                className="p-3 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Грати знову
              </button>
              <button 
                onClick={restartGame}
                className="p-3 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Вибрати інший рівень
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CzechLanguageGame
