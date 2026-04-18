
export function useLogic({currentIndex, setCurrentIndex, setScore, setShowAns, setSelectedAns, setIsFinished, questions, resetTimer}) {
 
    const handleNext = () => {
    setShowAns(false)
    setSelectedAns(null)

    if (currentIndex < questions.length - 1) { 
      setCurrentIndex(prev => prev + 1)
      resetTimer()

    }
    else {
      setIsFinished(true)
    }

  }

  const handleAnsClick = (selectedOption, currentQues, showAns) => {
    if (showAns) return
    setSelectedAns(selectedOption)
    setShowAns(true)

    if (selectedOption === currentQues.correct) {
      setScore(prev => prev + 1)
    }
    setTimeout(() => {
      handleNext()
    }, 1000);
  }

  return{handleNext, handleAnsClick}
}