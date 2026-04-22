
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