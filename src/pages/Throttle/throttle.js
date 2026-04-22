
export function throttle(fn, delay) { //Takes fn=expensive function and delay as arguments and returns a resuable Modified-throttle-checking function
    let lastCall = 0 //declared outside reusable returned function so that lastCall can be tracked on every returned function calls in main page. (meaning same returned func will be used on every button click in main page and lastCall will be updated on every button click in main page.)
    
    return function(...args){         //...args means whatever arguments passed in this resusable modified version returned function. eg. returnedModifiedThrottleFunc("Sample Text")  ...args will be "Sample Text"
        const now = Date.now();       //get current time in milliseconds
        if(now - lastCall >= delay){ //Check if already passed delay time. If yes then call the expensive function along with ...args passed to the resusable modified version returned function
            fn(...args);             //call expensive func with the arguments passed to the resusable modified version returned function. like returnedModifiedThrottleFunc("Sample Text") in this case. So it will run fn(...args) which is expensiveFunction("Sample Text") 
            lastCall = now;         //also update lastCall
        }
    }
    //Otherwise it will just ignore to call the expensive fn(...args) if delay is not yet passed.
}

//THROTTLE VS DEBOUNCE
//THROTTLE: It limits the number of times a function can be called in a given time period. So it takes decision based on lastCall time and current time. If the difference is greater than or equal to the specified delay, it allows the function to be executed and updates the lastCall time. If the difference is less than the delay, it ignores the function call. This means that the function will be executed at most once every specified delay period, regardless of how many times it is triggered.
//DEBOUNCE: It delays the execution of a function until a certain amount of time has passed. So it cleans up previous timeout immediately when new call comes in and sets a new timeout. If the function is called again before the timeout has completed, the previous timeout is cleared and a new one is set. This means that the function will only be executed after a certain amount of time has passed since the last time it was called, effectively "debouncing" rapid calls to the function.