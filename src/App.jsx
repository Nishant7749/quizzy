import { useState, useEffect } from 'react'
import {questions} from './components/Questions'
import {useTimer} from './components/Timer'
import { useLogic } from './components/Logic'

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [showAns, setShowAns] = useState(false)
  const [selectedAns, setSelectedAns] = useState(null)
  const [isFinished, setIsFinished] = useState(false)

  const {timeLeft, resetTimer} = useTimer(isFinished)
  const{handleNext, handleAnsClick} = useLogic({currentIndex, setCurrentIndex, setScore, setShowAns, setSelectedAns, setIsFinished, questions, resetTimer})

  const currentQues = questions[currentIndex]


   useEffect(()=> {                      //move to next
      if(timeLeft === 0) handleNext()
    }, [timeLeft])


  return (
    <>
      <div>

        <p className='text-sm text-gray-500'> {currentIndex + 1} / {questions.length} </p>
        <p className='text-sm text-gray-500'>Time Left: {timeLeft}s</p>
        <h2 className='m-2 text-lg'>{currentIndex + 1}. {currentQues.question}</h2>

        {currentQues.options.map((option, index) => (

          <button key={index} onClick={() => handleAnsClick(index, currentQues, showAns)} style={{ color: showAns ? index === currentQues.correct ? "green" : index === selectedAns ? 'red' : 'gray' : 'black' }} className='m-2 border p-1 cursor-pointer'> {option} </button>

        ))}


        {isFinished ? (
          <>
            <h2 className='text-center text-xl mt-8 bg-gray-200'> SCORE: {score} / {questions.length} </h2>

            <button className='border p-1 bg-gray-200 cursor-pointer' onClick={() => { setCurrentIndex(0); setIsFinished(false); setScore(0); resetTimer() }}>Restart</button>
          </>
        ) : (
          <h2></h2>
        )}


      </div>

    </>
  )
}