import { useEffect, useState } from "react"
import { Cards } from "./components/Cards";
import { Pagenumbers } from "./components/Pagenumbers";

export const Pagination = () => {
    const [items, setItems] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        fetch("https://dummyjson.com/products?limit=100&skip=0")
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setItems(data.products);
            });
    }, [])

    //Extract 10 items for respective page
    const endIndex = itemsPerPage * currentPage; 
    const startIndex = endIndex - itemsPerPage;
    const currentPageItems = items.slice(startIndex, endIndex); //since items is 0 indexing 

    return (
        <div>
            <h2>Pagination</h2>
            <Cards items={currentPageItems} />
            <Pagenumbers totalItems={items.length} itemsPerPage={itemsPerPage} setCurrentPage={setCurrentPage}/>
        </div>
    )
}
