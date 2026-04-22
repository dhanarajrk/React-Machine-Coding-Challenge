import { useEffect, useState } from 'react'

export const InfiniteScroll = () => {
    const [counts, setCounts] = useState(50) //Initially we suppose that there are 50 items to show.  

    let items = []  //this will be recreated when re-renders happends due to counts useState getting incremented with +50 items when scroll is reached near end. (but Window Event listener won't recreate)
    for(let i=1; i<=counts; i++){  
        items.push(<h3>{i}</h3>)
    }

    //useEffect will run only once during 1st render and create a  Window Scroll EventListener and after that Window Scroll EventListener will keep trigerring onScroll function even when page re-renders Because Window Scroll EventListener lives in browser(doesn't depend on React)
    useEffect(() => {
        function onScroll() {
            if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 50 ){ // viewport+scroll = total document height   (-50 means buffer to reduce total document height so that counts+50 will trigger earlier)
                setCounts(counts => counts+50) //If scroll is about to reach end of document height, put +50 more counts items and Page Rerenders with +50 more items.
            }
        }

        window.addEventListener("scroll", onScroll) //Add scroll event listener once to Browser Window and trigger when scroll is detected (the same scroll event listener is alive for every re-renders)
        return() => window.removeEventListener("scroll", onScroll) //cleanup scroll event listener when component unmounts
    },[])

  return (
    <div>
        <h2>Infinite Scroll</h2>
        {items}
    </div>
  )
}
