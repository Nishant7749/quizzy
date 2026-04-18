import { useState, useEffect } from "react";

export function useTimer(isFinished) {
  const[timeLeft, setTimeLeft] = useState(60)

  useEffect(() => {
    if (isFinished) return

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft, isFinished])

  const resetTimer = ()=> {
    setTimeLeft(60)
  }

  return {timeLeft, resetTimer} 
}