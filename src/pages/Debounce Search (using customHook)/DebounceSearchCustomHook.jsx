import { useState, useEffect } from "react"
import { useCustomDebounce } from "./useCustomDebounce"


export const DebounceSearchCustomHook = () => {
  const items = ["Apple", "Banana", "Cherry", "Date", "Elderberry", "Fig", "Grape", "Honeydew"];
  const [searchInputVal, setSearchInputVal] = useState("")

  const debouncedVal = useCustomDebounce(searchInputVal, 1000) || "" //custom hook will return debounced succeed word (this func will run everytime searchInputVal changes and re-renders). Otherwise user don't type anything so just pass empty search ""
  
  const [filteredItems, setFilteredItems] = useState([]) //stores filtered items based on debouncedVal

  //useEffect will run whenever custom hook returns debouncedVal
  useEffect(() => {
      setFilteredItems(items.filter(item => item.toLowerCase().includes(debouncedVal.toLowerCase()))) 
  },[debouncedVal])

  return (
    <div>
      <h2>Debounce Search (using customHook)</h2>
      <input type="text" value={searchInputVal} onChange={(e) => setSearchInputVal(e.target.value)} />
      {filteredItems.map((item, index) => (
        <h3 key={index}>{item}</h3>
      ))}
    </div>
  )
}
