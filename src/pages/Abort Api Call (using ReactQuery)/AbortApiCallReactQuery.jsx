import { useQuery, useQueryClient } from '@tanstack/react-query'
import React from 'react'


export const AbortApiCallReactQuery = () => {
    const queryClient = useQueryClient(); //we need queryClient which was globally created in main.jsx because we need queryClient.cancelQueries() method to abort the api call.
    const { refetch } = useQuery({ queryKey: ['apicallkeyname'], queryFn: fetchData, enabled: false })

    async function fetchData({ signal }) { //***no need to manually create AbortController() signal cause. React Query already has its own signal when running this function with it.
        const res = await fetch("https://dummyjson.com/products?limit=50&skip=0", { signal }); //just append the React Query signal prop
        if (!res.ok) {
            throw new Error('Error fetching data!')
        }
        const data = await res.json();
        console.log(data);
        return data;
    }

    function handleAbort() {
        queryClient.cancelQueries(['apicallkeyname']); //***this will cancel React Query Process with key named 'apicallkeyname'
        console.error("API Aborted using Abort Button");
    }


    return (
        <div>
            <h2>Abort Api Call using ReactQuery</h2>
            <p>No need to create AbortController signal. React Query has its own signal which can be passed to the api function becing called and append it on fetch rule. </p>
            <p>Cancel using queryClient.cancelQueries(['apicallkeyname'])</p>
            <button onClick={refetch}>Fetch</button>
            <button onClick={handleAbort}>Abort</button>
        </div>
    )
}
