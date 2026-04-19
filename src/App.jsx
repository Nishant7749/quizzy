import './App.css'
import { useState, useEffect } from 'react'
import { questions } from './components/Questions'
import { useTimer } from './components/Timer'
import { useLogic } from './components/Logic'

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [showAns, setShowAns] = useState(false)
  const [selectedAns, setSelectedAns] = useState(null)
  const [isFinished, setIsFinished] = useState(false)

  const { timeLeft, resetTimer } = useTimer(isFinished)
  const { handleNext, handleAnsClick } = useLogic({ currentIndex, setCurrentIndex, setScore, setShowAns, setSelectedAns, setIsFinished, questions, resetTimer })

  const currentQues = questions[currentIndex]


  useEffect(() => {                      //move to next
    if (timeLeft === 0) handleNext()
  }, [timeLeft])


  return (
    <>
      <div className='text-white'>
        <div className='flex flex-col items-center justify-center h-screen w-screen'>

          <div className='text-5xl font-mono text-blue-200 m-8'>Quizzy</div>

          <div className='w-120 h-150 border rounded-lg flex flex-col items-center justify-center m-4'>
            <div className='flex justify-between gap-70 m-4'>
              <p className='text-sm text-gray-900'> {currentIndex + 1} / {questions.length} </p>
              <p className='text-sm text-gray-500 border rounded-xl p-1 hover:text-gray-600'>Time Left: {timeLeft}s</p>
            </div>
            <div className='m-8'>
              <span className='text-gray-800 text-6xl font-mono font-bold'>0{currentIndex + 1}</span>
              <h2 className='text-xl mb-6'> {currentQues.question}</h2>
              <div className='flex flex-col '>
                {currentQues.options.map((option, index) => (

                  <button key={index} onClick={() => handleAnsClick(index, currentQues, showAns)} style={{ color: showAns ? index === currentQues.correct ? "green" : index === selectedAns ? 'red' : 'gray' : 'darkgray' }} className='m-2 border p-1 cursor-pointer rounded-md hover:bg-gray-950'> {option} </button>

                ))}
              </div>
            </div>
          </div>

          <div className='border rounded-xl p-4 w-100 h-40'>
            {isFinished ? (
              <>
                <h2 className='text-center text-xl mt-4'> SCORE: <span className='text-2xl font-bold '> {score} / {questions.length} </span> </h2>
                <div className='flex items-center justify-center mt-8'>
                  <button className='border p-2 cursor-pointer rounded-xl hover:bg-white hover:text-black' onClick={() => { setCurrentIndex(0); setIsFinished(false); setScore(0); resetTimer() }}>Restart</button>
                </div>
              </>
            ) : (
              <h2 className='text-gray-500 italic text-sm text-center mt-10'>Score will be displayed after the Last question.</h2>
            )}
          </div>
        </div>
      </div>

    </>
  )
}