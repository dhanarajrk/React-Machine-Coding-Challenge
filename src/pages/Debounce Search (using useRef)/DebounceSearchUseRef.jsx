import { useRef, useState } from "react";


export const DebounceSearchUseRef = () => {
  const items = ["Apple", "Banana", "Cherry", "Date", "Elderberry", "Fig", "Grape", "Honeydew"];
  const [searchInput, setSearchInput] = useState("")
  const [debouncedItems, setDebouncedItems] = useState([]) //it will store filtered items after 1sec delay when user types in search input
  const timerRef = useRef() //with useRef we can accesss same timeout Id on every renders (So we can easily clear previous timer)


  //this function will trigger only after 1sec delay when user types in search input and it will filter items based on latest input value and update debouncedItems state with filtered items
  function prepareDebouncedItems(latestvalue){
    const filteredItems = items.filter(item => item.toLowerCase().includes(latestvalue.toLowerCase()))
    setDebouncedItems(filteredItems)
  }


  function handleOnChange(e){
    const latestvalue = e.target.value
    setSearchInput(latestvalue);

    clearTimeout(timerRef.current) //clear previous timeout ID as soon as new value is typed in search input
  
    timerRef.current = setTimeout(() => {   //Reassign timerRef.current with new timeout for latest input value 
      prepareDebouncedItems(latestvalue) //it will execute filter func after 1sec delay when new input is typed
    },1000)
  }

  return (
    <div>
      <input type="text" value={searchInput} onChange={handleOnChange}/>
      {debouncedItems.map((item, index) => (
        <h3 key={index}>{item}</h3>
      ))}
    </div>
  )
}
