import { useEffect, useState } from "react"

export const Timer = () => {
    const INITIAL_TIME = 5 * 60 // 5 minutes in seconds
    const [timeLeft, setTimeLeft] = useState(INITIAL_TIME)
    const [isRunning, setIsRunning] = useState(false)

    useEffect(() => {
        if (!isRunning) return;

        const timerId = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timerId);
                    setIsRunning(false);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timerId);
    }, [isRunning]);

    
    const mins = Math.floor(timeLeft / 60)
    const secs = timeLeft % 60
    const formattedTime = `${mins}:${secs.toString().padStart(2, '0')}`

    function handleStart() {
        if (timeLeft > 0) {
            setIsRunning(true);
        }
    }

    function handleStop() {
        setIsRunning(false);
    }

    function handleReset() {
        setIsRunning(false);
        setTimeLeft(INITIAL_TIME);
    }

    return (
        <div>
            <h1>{formattedTime}</h1>
            <button onClick={handleStart}>Start</button>
            <button onClick={handleStop}>Stop</button>
            <button onClick={handleReset}>Reset</button>
        </div>
    )
}
