import React, { useState } from 'react'
import { MoonIcon, SunIcon } from 'lucide-react'
import questions from '../data/questions'

const CzechLanguageTest = () => {
  const [currentLevel, setCurrentLevel] = useState<string | null>(null)
  const [testQuestions, setTestQuestions] = useState<any[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [incorrectAnswers, setIncorrectAnswers] = useState<any[]>([])

  const startTest = (level: string) => {
    setCurrentLevel(level)
    setTestQuestions(questions[level].sort(() => 0.5 - Math.random()).slice(0, 20))
    setCurrentQuestionIndex(0)
    setScore(0)
    setShowResults(false)
    setIncorrectAnswers([])
  }

  const handleAnswer = (selectedIndex: number) => {
    const currentQuestion = testQuestions[currentQuestionIndex]
    setSelectedAnswer(selectedIndex)

    if (selectedIndex === currentQuestion.correct) {
      setScore((prev) => prev + 1)
    } else {
      setIncorrectAnswers((prev) => [
        ...prev,
        {
          question: currentQuestion.question,
          selectedAnswer: currentQuestion.options[selectedIndex],
          correctAnswer: currentQuestion.options[currentQuestion.correct],
          explanation: currentQuestion.explanation
        }
      ])
    }

    setTimeout(() => {
      if (currentQuestionIndex < testQuestions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1)
        setSelectedAnswer(null)
      } else {
        setShowResults(true)
      }
    }, 500)
  }

  const getAnswerColor = (index: number) => {
    if (selectedAnswer === null) return ''
    return index === testQuestions[currentQuestionIndex].correct
      ? 'bg-green-500 text-white'
      : selectedAnswer === index
      ? 'bg-red-500 text-white'
      : ''
  }

  return (
    <div className={\`min-h-screen p-4 transition-colors \${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}\`}>
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Czech Language Proficiency Test</h1>
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full hover:bg-gray-200"
          >
            {darkMode ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>

        {!currentLevel && (
          <div className="grid grid-cols-2 gap-4">
            {['A', 'A1', 'A2', 'B1'].map((level) => (
              <button 
                key={level}
                onClick={() => startTest(level)}
                className="p-4 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Level {level}
              </button>
            ))}
          </div>
        )}

        {currentLevel && !showResults && testQuestions.length > 0 && (
          <div>
            <div className="mb-4">
              <div 
                className="h-2 bg-blue-500" 
                style={{width: \`\${((currentQuestionIndex + 1) / testQuestions.length) * 100}%\`}}
              />
              <p>Question {currentQuestionIndex + 1} of {testQuestions.length}</p>
            </div>

            <div className="bg-gray-100 p-6 rounded-lg">
              <h2 className="text-xl mb-4">{testQuestions[currentQuestionIndex].question}</h2>
              
              <div className="grid grid-cols-2 gap-4">
                {testQuestions[currentQuestionIndex].options.map((option: string, index: number) => (
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

        {showResults && (
          <div className="text-center">
            <h2 className="text-2xl mb-4">Test Results</h2>
            <p className="text-xl mb-4">
              Your Score: {((score / testQuestions.length) * 100).toFixed(1)}% ({score}/{testQuestions.length} correct)
            </p>

            {incorrectAnswers.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-bold mb-4">Incorrect Answers</h3>
                {incorrectAnswers.map((incorrect, index) => (
                  <div key={index} className="bg-red-100 p-4 rounded mb-2">
                    <p><strong>Question:</strong> {incorrect.question}</p>
                    <p><strong>Your Answer:</strong> {incorrect.selectedAnswer}</p>
                    <p><strong>Correct Answer:</strong> {incorrect.correctAnswer}</p>
                    <p><strong>Explanation:</strong> {incorrect.explanation}</p>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6 flex justify-center space-x-4">
              <button 
                onClick={() => startTest(currentLevel!)}
                className="p-3 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Retry Test
              </button>
              <button 
                onClick={() => setCurrentLevel(null)}
                className="p-3 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Choose Different Level
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CzechLanguageTest
