import { useEffect, useState } from "react";

//This custom hook is nothing but Reusable Debouce Logic that returns the debouncedVal after delay is over
export function useCustomDebounce(inputvalue, delay){
    const [debouncedVal, setDebouncedVal] = useState();

     //useEffect runs on every inputvalue or delay changes is detected
    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedVal(inputvalue)
        }, delay)

        return () => clearInterval(timerId) //Cleanup previous timeout Id
    },[inputvalue, delay])


    return debouncedVal; //Return the set debouncedVal after timeout is over
}