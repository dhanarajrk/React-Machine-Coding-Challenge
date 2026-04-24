import { useMutation } from '@tanstack/react-query';
import React from 'react'

async function createItem(newObj) {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(newObj),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    });

    if (!res.ok) {
        throw new Error('Failed to create item');
    }

    return res.json();
}


export const ReactQuery_useMutation = () => {
    const { data, isLoading, error, mutate } = useMutation({ mutationFn: createItem }); //useMutation returns a mutate function that can be used to trigger the mutation function (create, edit, delete) when needed. Unlike useQuery, useMutation does not automatically run on component mount or key changes, which is useful for handling side effects like creating, updating, or deleting resources. Also, useMutation does not require a queryKey since it's not about fetching and caching data.

    return (
        <div>ReactQuery_useMutation
            <h2>React Query useMutation() is used when we can to CREATE, EDIT, DELETE (for POST, PUT, DELETE)</h2>
            <h5>Unlike useQuery, it doesn't automatically fetch data on component mount or key changes. Which is useful for handling side effects like creating, updating, or deleting resources.</h5>
            <h5>Instead of queryFn property, it uses mutationFn property doesn't require key since its not about fetching and caching data</h5>
            <h5>It returns a function called mutate which can be manually run to trigger the mutation(create,edit,delete function)</h5>
            <button onClick={() => mutate({title: 'foo',body: 'bar', userId: 1,})}>
                Create an Item (POST)
            </button>
            <div>
                {isLoading && <p>Loading...</p>}
                {error && <p>Error: {error.message}</p>}
                {data && (
                    <div>
                        <h2>New Item Successfully Created!</h2>
                        <p>{data.title}</p>
                        <p>{data.body}</p>
                        <p>{data.userId}</p>
                    </div>
                )}
            </div>
        </div>
    )
}
