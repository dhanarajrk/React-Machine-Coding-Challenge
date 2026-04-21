import React from 'react'

export const Pagenumbers = ({ totalItems, itemsPerPage, setCurrentPage }) => {
    let pagenumbers = []
    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) { //Calculate number of pages needed and Math.ceil to round up page number if there any partial itemns remain after totalItems/itemsPerPage
        pagenumbers.push(i)
    }

    return (
        <div>
            {pagenumbers.map((pagenum, index) => (
                    <button key={index} onClick={()=> setCurrentPage(pagenum)}>
                        {pagenum}
                    </button>
            ))}
        </div>
    )
}
