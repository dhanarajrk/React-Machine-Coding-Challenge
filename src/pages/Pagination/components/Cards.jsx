import { Card } from "./Card"

export const Cards = ({ items }) => {
  return (
    <div style={{display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gridTemplateRows: "repeat(2, auto)", gap: "4px"}}>
        {items.map((item, index) => (
            <Card key={index}
                  title={item.title}
                  price={item.price}
                  thumbnail={item.thumbnail}/>
        ))}
    </div>
  )
}
