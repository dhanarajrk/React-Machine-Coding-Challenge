import { useEffect, useState } from "react"
import { Cards } from "./components/Cards";
import { Pagenumbers } from "./components/Pagenumbers";

export const Pagination = () => {
    const [items, setItems] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const [searchInput, setSearchInput] = useState("");

    const [sortOption, setSortOption] = useState("default");

    //1. Fetch items from API on component mount and store in items state.  
    useEffect(() => {
        fetch("https://dummyjson.com/products?limit=100&skip=0")
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setItems(data.products);
            });
    }, [])

    //2. Filter items based on search input. This runs every on every render even if there is empty "" search input, since "" is included in every string, it will return all items when search input is empty.
    const filteredSearchItems = items.filter(item => item.title.toLowerCase().includes(searchInput.toLowerCase())); 

    //3. Apply Sorting option to filteredSearchItems before slicing
    const sortedItems = filteredSearchItems.sort((a, b) => {
        if (sortOption === "price-asc") return a.price - b.price;
        if (sortOption === "price-desc") return b.price - a.price;
        return 0; // default, no sort will return filteredSearchItems as it is without any changes. 
    })

    //4. Slice sortedItems to extract 10 items for current page. (currentPage state is handled by Pagenumbers component, which updates currentPage state when a page number button is clicked. When currentPage state changes, the component re-renders and calculates new startIndex and endIndex to slice the sortedItems for the new current page.)
    const endIndex = itemsPerPage * currentPage;
    const startIndex = endIndex - itemsPerPage;
    const currentPageItems = sortedItems.slice(startIndex, endIndex); //since 0 indexing. We are extracting only the items that is going to be displayed on the current page.

    function handleSearch(e) {
        setSearchInput(e.target.value);
        setCurrentPage(1); // reset to first page when search is performed, so that user can see results from the beginning of the filtered list
    }

    function handleSort(e) {
        setSortOption(e.target.value);
        setCurrentPage(1); // reset to first page when sort is changed
    }

    //NOTE: THE ORDER is  1.Fetch Items -> 2.Filter Search Items -> 3.Sort Filtered Items -> 4.Slice Sorted Items for Pagination. 
    //This order is important to ensure that the pagination reflects the current search and sort criteria correctly. If we were to slice before filtering or sorting, we might end up with a page that doesn't accurately represent the user's search and sort preferences.

    return (
        <div>
            <h2>Pagination</h2>
            <input type="text" placeholder="Search..." value={searchInput} onChange={(e) => handleSearch(e)} />
            <select value={sortOption} onChange={(e) => { handleSort(e) }}>
                <option value="default">Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
            </select>
            <Cards items={currentPageItems} /> {/* Pass the sliced items for the current page to the Cards component to display only those 10 items on the current page. */}
            <Pagenumbers totalItems={sortedItems.length} itemsPerPage={itemsPerPage} setCurrentPage={setCurrentPage} /> {/* Pass totalItems (same as sortedItems) to calculate the total number of pages needed*/}  
        </div>
    )
}
