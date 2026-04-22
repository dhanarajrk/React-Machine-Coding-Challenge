
import { throttle } from './throttle'

//Resuable modified Throttle function created Once and will use many times.
const returnedModifiedThrottleFunc = throttle(expensiveFunction, 2000)//throttle(fn, delay) takes expensive function and delay as arguments and returns a resuable Modified-throttle-checking function
//returnedModifiedThrottleFunc is a reusable modified function with throttle functionality. It will only allow expensiveFunction to be called at most once every 2 seconds, even if returnedModifiedThrottleFunc is called multiple times within that period.

function expensiveFunction(text) {
    console.log(`Expensive function called with argument: ${text} at ${new Date().toLocaleTimeString()}`);
}

export const ThrottlePage = () => {
    return (
        <div>
            <h2>Throttle</h2>
            <button onClick={() => returnedModifiedThrottleFunc("Sample Text")}>Click Here Repeatedly</button>
            <p>Open the console to see the output. No matter how many times you click the button, the expensive function will only be called at most once every 2 seconds.</p>
        </div>
    )
}
