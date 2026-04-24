import React, { useRef } from "react";

export const AbortApiCall = () => {
    const controllerRef = useRef();

    async function fetchData() {
        controllerRef.current?.abort(); //abort previous API call if it exists before making a new API call
        controllerRef.current = new AbortController(); //create an AbortController() to control current API call and store in controllerRef so that it can be accessed anywhere without lossing it

        try {
            const res = await fetch("https://dummyjson.com/products?limit=200&skip=0", {signal: controllerRef.current.signal}); //pass the signal from created controller to the fetch so that it can listen to abort event and cancel the API call when abort is called
            console.log(await res.json());
        } catch (err) {
            if (err.name === "AbortError") console.error("API Aborted using Abort Button");
        }
    }
    
    //function to abort the current api call stored in controllerRef.current
    function handleAbort() {
        controllerRef.current?.abort(); //remember we passed signal to the fetch so .abort() will be listened by it.
    }

    return (
        <div>
            <h2>Abort API Call</h2>
            <p>Press Fetch then Click Abort quickly and see console log and network tab</p>
            <button onClick={fetchData}>Fetch</button>
            <button onClick={handleAbort}>Abort Fetch</button>
        </div>
    )
}
