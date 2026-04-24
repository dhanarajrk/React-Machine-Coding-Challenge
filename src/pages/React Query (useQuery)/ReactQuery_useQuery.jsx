import { useQuery } from '@tanstack/react-query';
import { useState } from 'react'

async function fetchData() {
    const res = await fetch("https://dummyjson.com/products?limit=50&skip=0");
    if(!res.ok){
        throw new Error('Error fetching!')
    }

    return res.json();
}


export const ReactQuery_useQuery = () => {
    const [autofetch, setAutofetch] = useState(false); //this useState is just for toggling the enabled property of useQuery to demonstrate manual fetching. It is not required for useQuery to work.
    //useQuery() returns an object with properties like data, isLoading, error, etc. We can destructure these properties to use in our component. (This eliminates the need for useState to store data, and useEffect to fetch data on component mount, as useQuery handles these internally.)
    // const { refetch } is a returned function from useQuery that can be used to manually trigger the queryFn to run and fetch data. This is useful when we set enabled: false to prevent automatic fetching on component mount, and want to fetch data on a button click instead.
    const { data, isLoading, error, refetch } = useQuery({
                                                 queryKey: ['anykeyname'], //queryKey property is the name of cached data. We can also append userId to the name like ['anykeyname', userId] to have different cache for different userId. When queryKey changes, it will re-run the queryF to fetch new data.
                                                 queryFn: fetchData, //queryFn property indicates the function to fetch data from API.  
                                                 enabled: autofetch, //enabled property will prevent the queryFn to run automatically on re-render. We can toggle this to true using a button to run useQuery manually. By default, enabled is true, so queryFn will run on component mount and whenever queryKey changes.
                                                 staleTime: 10000 * 60 * 5, //staleTime property is the time in milliseconds for which the cached data is considered fresh. During this time, useQuery will not re-fetch data from API even if the component re-renders. After this time, the cached data becomes stale and useQuery will re-fetch data on component re-render. This is a basic caching mechanism in React Query. You can check in Network tab of browser dev tools to see when API calls are made.
                                                });

    return (
        <div>
            <h2>React Query (useQuery) is used when fetching data from an API (for GET)</h2>
            <h5>It eliminates the need for useState, useEffect, and can control when to call the API</h5>
            <h5>It will not automatically refetch data until the queryKey changes (This is a basic caching in React Query). You can check in Network tab of browser dev tools to see when API calls are made.</h5>
            <h5>However you can use useQuery's refetch function to manually trigger a refetch regardless of the key changes or staleTime</h5>
            <button onClick={() => setAutofetch(!autofetch)}>Toggle Auto Fetch (useQuery enabled property): {autofetch ? 'On' : 'Off'}</button> --will not automatically refetch data until the queryKey changes.<br/>
            <button onClick={refetch}>Manual Re-Fetch Data (useQuery returned refetch function)</button>
            <div>
                <h3>API CALL RESULT:</h3>
                {isLoading && <p>Loading...</p>}
                {error && <p>Error: {error.message}</p>}
                {data && (
                    <ul>
                        {data.products.map((product) => (
                            <li key={product.id}>{product.title}</li>
                        ))}
                    </ul>
                )}

            </div>
        </div>
    )
}

