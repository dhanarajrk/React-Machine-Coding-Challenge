import { useState } from 'react'

export const Autocomplete = () => {
  const items = ["Apple", "Ape", "Application", "Appetite", "Apricot", "April", "Banana", "Band", "Bandana", "Bank", "Banner", "Car", "Card", "Carbon", "Carpet", "Cart", "Dog", "Door", "Doughnut", "Down", "Dragon", "Star", "Start", "Starfish", "Starbucks", "Stark"];
  const [input, setInput] = useState("");
  const [opendropdown, setOpendropdown] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1); 

  const filteredItems = items.filter(item => item.toLowerCase().startsWith(input.toLowerCase()));

  return (
    <div>
      <h2>Autocomplete</h2>
      <input type="text" value={input} 
                         onChange={(e) => setInput(e.target.value)} 
                         onFocus={() => setOpendropdown(true)}    //onFocus means when input element is in focus, show dropdown and onBlur means when input element is out of focus, hide dropdown
                         onBlur={() => setTimeout(() => setOpendropdown(false), 200)} //Added a timeout to allow onClick trigger to finish first otherwise onBlur will execute before onClick and dropdown will close before we can click on any item 
                         onKeyDown={(e) => {
                                            if(e.key==="ArrowDown"){
                                              setHighlightedIndex(prev => prev<filteredItems.length-1 ? prev+1 : 0) //can move down until last item, otherwise bring up highlight to 1st item when ArrowDown is pressed from last item
                                            }
                                            if(e.key==="ArrowUp"){
                                              setHighlightedIndex(prev => prev>0 ? prev-1 : filteredItems.length-1)
                                            }
                                            if(e.key==="Enter"){
                                              setInput(filteredItems[highlightedIndex])
                                              setHighlightedIndex(-1)
                                            }
                                            }}
      />   
            
      {input && opendropdown && ( // Show dropdown only when input is not empty and dropdown is open
        filteredItems.map((item, index) => (
          <div key={index} > 
            <button onClick={() => {setInput(item); setOpendropdown(false);}} style={{ backgroundColor: index===highlightedIndex ? "black" : ""}}>
              {item}
            </button> 
          </div>
        ))
      )}
    </div>
  )
}
